'use client';

import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  
      // Siapkan slot pesan assistant kosong yang akan diisi sedikit demi sedikit
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
      setIsTyping(false); // Matikan loading spinner karena streaming sudah dimulai
      
      const reader = res.body?.getReader();
      if (!reader) throw new Error('ReadableStream not supported');
      
      const decoder = new TextDecoder();
      let assistantMessage = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        
        // Simpan sisa line yang belum lengkap ke dalam buffer
        buffer = lines.pop() || ''; 
        
        for (const line of lines) {
          const cleanLine = line.trim();
          if (cleanLine.startsWith('data: ')) {
            const dataStr = cleanLine.slice(6).trim();
            if (dataStr === '[DONE]') continue;
            
            try {
              const data = JSON.parse(dataStr);
              const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
              if (text) {
                assistantMessage += text;
                setMessages(prev => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1].content = assistantMessage;
                  return newMessages;
                });
              }
            } catch (e) {
              console.error('Error parsing SSE line:', e, dataStr);
            }
          }
        }
      }
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 z-50 flex items-center justify-center sm:block"
          initial={{ opacity: 0, scale: 0.93, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 16 }}
          transition={{ type: 'spring', damping: 25, stiffness: 320 }}
        >
          <div className="bg-gray-900/95 sm:rounded-2xl shadow-[0_0_50px_rgba(59,130,246,0.15)] sm:border border-blue-500/20 w-full h-[100dvh] sm:w-[400px] md:w-[450px] sm:h-[600px] sm:max-h-[90vh] max-h-[100dvh] overflow-hidden flex flex-col backdrop-blur-md">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-blue-500/10 bg-gray-950/40 text-white relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600"></div>
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl mr-3 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white leading-tight">Gemini AI</h2>
                  <p className="text-xs text-gray-400 font-medium">Asisten Portofolio Alwan</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={toggleGemini}
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Messages area */}
            <div className="p-4 flex-grow overflow-y-auto bg-gray-950/50 backdrop-blur-sm gemini-scrollbar">
              <style>{`
                .gemini-scrollbar::-webkit-scrollbar {
                  width: 5px;
                }
                .gemini-scrollbar::-webkit-scrollbar-track {
                  background: transparent;
                }
                .gemini-scrollbar::-webkit-scrollbar-thumb {
                  background: #374151; /* gray-700 */
                  border-radius: 99px;
                }
                .gemini-scrollbar::-webkit-scrollbar-thumb:hover {
                  background: #4b5563; /* gray-600 */
                }
              `}</style>
              <div className="w-full flex flex-col gap-4">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex-shrink-0 mr-2 mt-1">
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-1.5 rounded-full shadow-md">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                      </div>
                    )}
                    <div 
                      className={`rounded-2xl px-4 py-3 max-w-[85%] shadow-[0_2px_8px_rgba(0,0,0,0.15)] ${
                        message.role === 'user' 
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-sm shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
                          : 'bg-gray-800/60 text-gray-100 rounded-tl-sm border border-blue-500/10 backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap font-medium leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex-shrink-0 mr-2 mt-1">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-1.5 rounded-full shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="bg-gray-800 border border-gray-700/50 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm flex items-center h-[44px]">
                      <div className="flex space-x-1.5">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                {error && (
                  <div className="flex justify-center mt-2">
                    <div className="bg-red-900/30 border border-red-500/30 rounded-xl px-4 py-2 text-red-300 text-xs text-center max-w-[90%]">
                      {error}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Input area */}
            <div className="border-t border-gray-800 p-3 bg-gray-900">
              <div className="flex items-end gap-2 bg-gray-800 rounded-2xl border border-gray-700 p-1 focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/50 transition-colors">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Tanya Gemini AI..."
                  className="w-full bg-transparent border-none py-2.5 px-4 focus:outline-none resize-none text-gray-100 placeholder-gray-500 text-sm font-medium"
                  rows={1}
                  style={{ minHeight: '44px', maxHeight: '120px' }}
                ></textarea>
                <button
                  onClick={handleSendMessage}
                  disabled={inputMessage.trim() === '' || isTyping}
                  className={`m-1 p-2 rounded-xl flex-shrink-0 ${
                    inputMessage.trim() === '' || isTyping
                      ? 'bg-transparent text-gray-500 cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-500 shadow-md transform hover:scale-105 active:scale-95 cursor-pointer'
                  } transition-all duration-200 flex items-center justify-center`}
                  aria-label="Send message"
                >
                  {isTyping ? (
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Komponen untuk tombol Gemini yang terpisah dengan desain yang lebih sesuai
export function GeminiButton({ toggleGemini, isOpen }: { toggleGemini: () => void, isOpen: boolean }) {
  return (
    <motion.button 
      onClick={toggleGemini}
      className="fixed bottom-6 right-6 bg-gray-950/60 backdrop-blur-md text-white border border-blue-500/30 py-3.5 px-6 rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.15)] flex items-center transition-colors duration-200 z-20 group hover:border-blue-400/60 hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      aria-label="Ask Gemini AI"
    >
      {/* Pulse background glow */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 opacity-20 blur-sm group-hover:opacity-40 transition-opacity duration-300"></div>
      
      {/* Icon with gradient and rotation hover */}
      <span className="relative mr-2 text-blue-400 group-hover:text-blue-300 transition-colors duration-300 group-hover:rotate-12 transform">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </span>
      
      {/* Text with glowing theme */}
      <span className="relative text-sm font-semibold tracking-wider bg-gradient-to-r from-blue-200 to-indigo-100 bg-clip-text text-transparent group-hover:from-white group-hover:to-blue-200 transition-colors duration-300 uppercase">
        {isOpen ? 'Tutup AI' : 'Tanya AI'}
      </span>
    </motion.button>
  );
}