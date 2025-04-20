'use client';

import { useState, useEffect, useRef } from 'react';
import React from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface GeminiComponentProps {
  isOpen: boolean;
  toggleGemini: () => void;
}

export default function GeminiComponent({ isOpen, toggleGemini }: GeminiComponentProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Halo! Saya Gemini AI. Ada yang bisa saya bantu hari ini?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;
  
    const userMessage = inputMessage.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInputMessage('');
  
    setIsTyping(true);
    setError(null);
  
    try {
      console.log('Mengirim pesan ke API:', userMessage);
  
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userMessage }),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        console.error('Error dari API:', errorData);
        throw new Error(errorData.error || 'Terjadi kesalahan saat menghubungi Gemini API.');
      }
  
      const data = await res.json();
      console.log('Respons dari API:', data);
  
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (err: any) {
      console.error('Error mengirim pesan:', err);
      setError(err.message || 'Gagal menghubungi server.');
  
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Maaf, terjadi kesalahan: ${err.message || 'Gagal menghubungi server.'}` 
      }]);
    } finally {
      setIsTyping(false);
    }
  };
  
  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-10 backdrop-blur-sm transition-all duration-300">
      <div className="bg-gray-900 rounded-xl shadow-2xl border border-blue-500/30 w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-blue-500/30 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h2 className="text-xl font-bold text-white">Gemini AI Assistant</h2>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={toggleGemini}
              className="p-2 hover:bg-blue-600 rounded-full transition-all"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Messages area */}
        <div className="p-4 flex-grow overflow-y-auto bg-gray-900">
          <div className="max-w-3xl mx-auto">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`rounded-lg px-4 py-2 max-w-xs md:max-w-md lg:max-w-lg ${
                    message.role === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-800 border border-blue-500/30 shadow-md text-gray-100'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex items-center mb-1 text-blue-400 font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Gemini
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-wrap font-medium">{message.content}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-800 border border-blue-500/30 rounded-lg px-4 py-2 shadow-md">
                  <div className="flex items-center text-blue-400 font-medium mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Gemini
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="flex justify-start mb-4">
                <div className="bg-red-900/50 border border-red-500/50 rounded-lg px-4 py-2 text-red-300 text-sm">
                  <div className="flex items-center mb-1 font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Error
                  </div>
                  {error}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Input area */}
        <div className="border-t border-blue-500/30 p-4 bg-gray-800">
          <div className="flex items-end gap-2 max-w-3xl mx-auto">
            <div className="flex-grow relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Tulis pesan Anda di sini..."
                className="w-full bg-gray-700 border border-blue-500/30 rounded-lg py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-100 placeholder-gray-400"
                rows={1}
                style={{ minHeight: '50px', maxHeight: '150px' }}
              ></textarea>
              <button 
                className="absolute right-3 bottom-3 text-gray-400 hover:text-blue-400"
                aria-label="Upload file"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={inputMessage.trim() === '' || isTyping}
              className={`p-3 rounded-full ${
                inputMessage.trim() === '' || isTyping
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              } transition-colors flex items-center justify-center`}
              aria-label="Send message"
            >
              {isTyping ? (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center font-medium">Tekan Enter untuk mengirim pesan</p>
        </div>
      </div>
    </div>
  );
}

// Komponen untuk tombol Gemini yang terpisah dengan desain yang lebih sesuai
export function GeminiButton({ toggleGemini, isOpen }: { toggleGemini: () => void, isOpen: boolean }) {
  return (
    <button 
      onClick={toggleGemini}
      className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-5 rounded-full shadow-lg flex items-center transition-all duration-300 z-20 transform hover:scale-105 group"
      aria-label="Ask Gemini AI"
    >
      <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-25 group-hover:opacity-40"></div>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      <span className="text-white font-medium">{isOpen ? 'Close Gemini AI' : 'Ask Gemini AI'}</span>
    </button>
  );
}