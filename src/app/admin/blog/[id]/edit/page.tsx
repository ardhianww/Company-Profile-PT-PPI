"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    slug: '',
  });
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  // const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchBlog = async () => {
      const { id } = await params; // Ambil id dari Promise
      const response = await fetch(`/api/blogs/${id}`);
      const data = await response.json();
      setFormData({
        title: data.title,
        content: data.content,
        author: data.author,
        slug: data.slug,
      });
      setCurrentImage(data.image);
    };
    fetchBlog();
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setLoading(true);

    try {
      const { id } = await params; // Ambil id dari Promise
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('content', formData.content);
      submitData.append('author', formData.author);
      submitData.append('slug', formData.slug);
      if (newImage) {
        submitData.append('image', newImage);
      }

      const response = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        body: submitData,
      });

      if (!response.ok) throw new Error('Failed to update blog');

      router.push('/admin/blog');
      router.refresh();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      // setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Image
        </label>
        {currentImage && !newImage && (
          <div className="mt-2">
            <Image
              src={currentImage}
              alt="Current blog image"
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full"
        />
      </div>
      {/* ... rest of the form fields ... */}
    </form>
  );
}
