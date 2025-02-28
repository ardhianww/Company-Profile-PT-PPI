"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";

interface Product {
  id: string;
  name: string;
  description: string;
  specs: string[];
  price: number;
  image?: string;
}

interface FormData {
  name: string;
  description: string;
  specs: string[];
  price: string;
  image: string | File;
}

export default function ProductManagement() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' as 'success' | 'error' });
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    specs: [""],
    price: "",
    image: ""
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addProduct = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      if (typeof formData.image === 'object' && formData.image !== null) {
        formDataToSend.append('image', formData.image);
      }
      formData.specs.forEach((spec) => {
        formDataToSend.append('specs[]', spec);
      });

      const response = await fetch('/api/products', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) throw new Error('Failed to add product');
      
      router.refresh();
      await fetchProducts();
      closeForm();
      setToast({
        show: true,
        message: 'Produk berhasil disimpan',
        type: 'success'
      });
    } catch (error) {
      console.error('Error adding product:', error);
      setToast({
        show: true,
        message: 'Gagal menambahkan produk',
        type: 'error'
      });
    }
  };

  const updateProduct = async () => {
    if (!selectedProduct) return;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      
      // Hanya append image jika ada file baru
      if (formData.image instanceof File) {
        formDataToSend.append('image', formData.image);
      }
      
      // Handle specs array
      if (Array.isArray(formData.specs)) {
        formData.specs.forEach((spec) => {
          if (spec) formDataToSend.append('specs[]', spec);
        });
      }

      const response = await fetch(`/api/products/${selectedProduct.id}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update product');
      }

      const updatedProduct = await response.json();
      
      router.refresh();
      await fetchProducts();
      closeForm();
      setToast({
        show: true,
        message: 'Produk berhasil diupdate',
        type: 'success'
      });
    } catch (error) {
      console.error('Error updating product:', error);
      setToast({
        show: true,
        message: error instanceof Error ? error.message : 'Gagal mengupdate produk',
        type: 'error'
      });
    }
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setProductToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    try {
      const response = await fetch(`/api/products/${productToDelete}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete product');

      router.refresh();
      await fetchProducts();
      setToast({
        show: true,
        message: 'Produk berhasil dihapus',
        type: 'success'
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      setToast({
        show: true,
        message: 'Gagal menghapus produk',
        type: 'error'
      });
    } finally {
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };
  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (e.target instanceof HTMLInputElement && e.target.type === 'file') {
      const file = e.target.files?.[0];
      if (file) {
        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
        setFormData(prev => ({
          ...prev,
          image: file
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const closeForm = () => {
    setShowModal(false);
    setEditMode(false);
    setSelectedProduct(null);
    setFormData({
      name: "",
      description: "",
      specs: [""],
      price: "",
      image: ""
    });
  };
  return (
    <div className="p-6">
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
      <div>
        <h1 className="text-2xl font-bold mb-4 text-black">Manajemen Produk</h1>
        <button onClick={() => setShowModal(true)} className="bg-blue-500 text-white px-4 py-2 mb-4">
          + Tambah Produk
        </button>
        {/* 🏷️ TABEL PRODUK */}
        <table className="w-full bg-white shadow-md">
            <thead>
            <tr className="bg-blue-600">
              <th className="p-2">Nama Produk</th>
              <th className="p-2">Harga</th>
              <th className="p-2">Aksi</th>
            </tr>
            </thead>
            <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
              <td className="p-2 text-black">{product.name}</td>
              <td className="p-2 text-black">Rp {product.price}</td>
              <td className="p-2 flex space-x-2">
                <button
                onClick={() => {
                  setEditMode(true);
                  setSelectedProduct(product);
                  setFormData({
                  name: product.name,
                  description: product.description,
                  specs: product.specs,
                  price: product.price.toString(),
                  image: product.image || ""
                  });
                  setImagePreview(product.image || null);
                  setShowModal(true);
                }}
                className="bg-yellow-500 text-white px-2 py-1"
                >
                Edit
                </button>
                <button
                onClick={() => handleDeleteClick(product.id)}
                className="bg-red-500 text-white px-2 py-1"
                >
                Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* 🏷️ MODAL FORM (TAMBAH/EDIT PRODUK) */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold text-black mb-4">{editMode ? "Edit Produk" : "Tambah Produk"}</h2>
              <input
                type="text"
                placeholder="Nama Produk"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="border text-black p-2 mb-2 w-full"
              />
              <input
                type="text"
                placeholder="Deskripsi"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="border text-black p-2 mb-2 w-full"
              />
              <input
                type="number"
                placeholder="Harga"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="border text-black p-2 mb-2 w-full"
              />
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gambar Produk
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleInputChange}
                  name="image"
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                {imagePreview && (
                  <div className="mt-2 flex items-center space-x-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData(prev => ({ ...prev, image: "" }));
                      }}
                      className="p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={closeForm}
                  className="bg-gray-500 text-white px-4 py-2 mr-2"
                >
                  Batal
                </button>
                {editMode ? (
                  <button
                    onClick={updateProduct}
                    className="bg-green-500 text-white px-4 py-2"
                  >
                    Simpan Edit
                  </button>
                ) : (
                  <button
                    onClick={addProduct}
                    className="bg-blue-500 text-white px-4 py-2"
                  >
                    Tambah Produk
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300">
            <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 scale-100">
              <h3 className="text-lg font-semibold mb-4">Konfirmasi Penghapusan</h3>
              <p className="text-gray-600 mb-6">Anda yakin ingin menghapus?</p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Tidak
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Ya
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
