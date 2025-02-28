"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";

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

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessages(messages.filter(message => message.id !== id));
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
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
              <button
                onClick={() => handleDelete(selectedMessage.id)}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                Delete
              </button>
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