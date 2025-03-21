"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import Toast from "@/components/Toast";

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' as 'success' | 'error' });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/contact');
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  // const handleDeleteClick = (id: string) => {
  //   setMessageToDelete(id);
  //   setShowDeleteModal(true);
  // };

  const handleDeleteConfirm = async () => {
    if (!messageToDelete) return;

    try {
      const response = await fetch(`/api/contact?id=${messageToDelete}`, { 
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete message');
      }

      setMessages(messages.filter(message => message.id !== messageToDelete));
      setSelectedMessage(null);
      setToast({
        show: true,
        message: 'Pesan berhasil dihapus',
        type: 'success'
      });
    } catch (error) {
      console.error('Error deleting message:', error);
      setToast({
        show: true,
        message: error instanceof Error ? error.message : 'Gagal menghapus pesan',
        type: 'error'
      });
    } finally {
      setShowDeleteModal(false);
      setMessageToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Konfirmasi Hapus</h3>
            <p className="text-gray-600 mb-6">Apakah Anda yakin ingin menghapus pesan ini? Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setMessageToDelete(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-2xl text-black font-bold mb-6">Pesan Contact</h1>
      <p className="text-gray-600 mb-6">Berikut adalah pesan yang telah dikirim oleh user melalui contact form.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedMessage?.id === message.id
                    ? 'bg-blue-50'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800">{message.name}</h3>
                  <span className="text-sm text-gray-500">
                    {format(new Date(message.createdAt), 'dd MMM yyyy HH:mm')}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{message.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Message Detail */}
        {selectedMessage && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Message Detail</h2>
              {/* <button
                onClick={() => handleDeleteClick(selectedMessage.id)}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                Delete
              </button> */}
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Name</label>
                <p className="mt-1 text-gray-800">{selectedMessage.name}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">Email</label>
                <p className="mt-1 text-gray-800">{selectedMessage.email}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">Phone</label>
                <p className="mt-1 text-gray-800">{selectedMessage.phone || '-'}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">Message</label>
                <p className="mt-1 text-gray-800 whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">Received on</label>
                <p className="mt-1 text-gray-800">
                  {format(new Date(selectedMessage.createdAt), 'dd MMMM yyyy HH:mm:ss')}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}