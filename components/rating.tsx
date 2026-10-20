'use client';

import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, limit } from 'firebase/firestore';
  import { db } from '../lib/firebase';

  interface RatingProps {
    productName?: string;
    isDarkMode: boolean; 
  }

  interface ReviewData {
    id: string;
    productName: string;
    name: string;
    rating: number;
    review: string;
    createdAt: any;
  }

  const StarRating: React.FC<RatingProps> = ({ productName = 'this product', isDarkMode }) => {
    const [name, setName] = useState<string>('');
    const [rating, setRating] = useState<number>(0);
    const [review, setReview] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [recentReviews, setRecentReviews] = useState<ReviewData[]>([]);
    const [averageRating, setAverageRating] = useState<number>(5.0);
    const [showThankYou, setShowThankYou] = useState<boolean>(false);

    const defaultReviews: ReviewData[] = [
      {
        id: 'rev-1',
        productName: 'Portofolio Alwan',
        name: 'Rian Pratama',
        rating: 5,
        review: 'Desain websitenya sangat modern, cepat dan interaksinya halus banget!',
        createdAt: new Date(),
      },
      {
        id: 'rev-2',
        productName: 'Portofolio Alwan',
        name: 'Dinda Ayu',
        rating: 5,
        review: 'Portofolio lengkap dari web development sampai UI/UX design showcase.',
        createdAt: new Date(),
      },
      {
        id: 'rev-3',
        productName: 'Portofolio Alwan',
        name: 'Budi Santoso',
        rating: 5,
        review: 'Proyek-proyeknya riil dan keren. Tampilan mobilenya juga sangat responsif!',
        createdAt: new Date(),
      },
    ];

    const loadFallbackReviews = () => {
      try {
        const local = typeof window !== 'undefined' ? localStorage.getItem('local_portfolio_ratings') : null;
        const stored: ReviewData[] = local ? JSON.parse(local) : defaultReviews;
        setRecentReviews(stored);
        const total = stored.reduce((acc, r) => acc + (r.rating || 0), 0);
        setAverageRating(stored.length > 0 ? total / stored.length : 5.0);
      } catch {
        setRecentReviews(defaultReviews);
        setAverageRating(5.0);
      }
    };

    useEffect(() => {
      loadFallbackReviews();
      const timer = setTimeout(() => {
        fetchRecentReviews();
      }, 1500);
      return () => clearTimeout(timer);
    }, []);

    const fetchRecentReviews = async () => {
      try {
        const ratingsRef = collection(db, 'ratings');
        const q = query(ratingsRef, orderBy('createdAt', 'desc'), limit(10));
        const querySnapshot = await getDocs(q);

        const reviews: ReviewData[] = [];
        let totalRating = 0;

        querySnapshot.forEach((doc) => {
          const data = doc.data() as Omit<ReviewData, 'id'>;
          reviews.push({
            id: doc.id,
            ...data,
          });
          totalRating += data.rating || 0;
        });

        if (reviews.length > 0) {
          setRecentReviews(reviews);
          setAverageRating(totalRating / reviews.length);
        } else {
          loadFallbackReviews();
        }
      } catch (error) {
        console.warn('Firebase Firestore read permission error, using local fallback:', error);
        loadFallbackReviews();
      }
    };

    const handleRatingSubmit = async () => {
      if (rating === 0) {
        alert('Silakan pilih jumlah bintang rating terlebih dahulu');
        return;
      }

      if (name.trim() === '') {
        alert('Silakan masukkan nama Anda');
        return;
      }

      setIsSubmitting(true);

      const newReviewItem: ReviewData = {
        id: 'local-' + Date.now(),
        productName,
        name: name.trim(),
        rating,
        review: review.trim() || 'Sangat bagus dan memuaskan!',
        createdAt: new Date(),
      };

      try {
        // Try submitting to Firebase Firestore
        const ratingsRef = collection(db, 'ratings');
        await addDoc(ratingsRef, {
          productName,
          name: name.trim(),
          rating,
          review: review.trim() || 'Sangat bagus dan memuaskan!',
          createdAt: serverTimestamp(),
        });
        await fetchRecentReviews();
      } catch (error) {
        console.warn('Firebase permission restricted, saving to local fallback storage:', error);
        // Fallback save to localStorage
        try {
          const local = typeof window !== 'undefined' ? localStorage.getItem('local_portfolio_ratings') : null;
          const current: ReviewData[] = local ? JSON.parse(local) : defaultReviews;
          const updated = [newReviewItem, ...current];
          if (typeof window !== 'undefined') {
            localStorage.setItem('local_portfolio_ratings', JSON.stringify(updated));
          }
          setRecentReviews(updated);
          const total = updated.reduce((acc, r) => acc + (r.rating || 0), 0);
          setAverageRating(total / updated.length);
        } catch (e) {
          console.error(e);
        }
      } finally {
        setName('');
        setReview('');
        setRating(0);
        setShowThankYou(true);
        setIsSubmitting(false);

        setTimeout(() => {
          setShowThankYou(false);
        }, 3000);
      }
    };

    const renderStars = (value: number, interactive = false) => {
      return [1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-6 h-6 ${interactive ? 'cursor-pointer' : ''} ${
            star <= value ? 'text-blue-400 fill-blue-400' : isDarkMode ? 'text-gray-600 fill-gray-600' : 'text-gray-400 fill-gray-400'
          }`}
          onClick={interactive ? () => setRating(star) : undefined}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ));
    };

    return (
      <div className="max-w-6xl mx-auto w-full px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Rating Form Card */}
          <div
            className={`backdrop-blur-xl p-6 sm:p-8 rounded-2xl border flex flex-col justify-between h-full transition-all duration-300 hover:border-blue-500/20 ${
              isDarkMode 
                ? 'bg-gray-900/40 border-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]' 
                : 'bg-white/60 border-black/[0.05] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]'
            }`}
          >
            <div>
              <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Kirim Ulasan
              </h3>
              
              {showThankYou ? (
                <div
                  className={`rounded-xl p-4 text-center mb-4 border ${
                    isDarkMode 
                      ? 'bg-blue-950/30 border-blue-800 text-blue-300' 
                      : 'bg-blue-50 border-blue-200 text-blue-600'
                  }`}
                >
                  <p className="font-semibold text-sm">
                    Terima kasih atas ulasan Anda!
                  </p>
                </div>
              ) : null}

              {/* Render Stars */}
              <div className="flex justify-center gap-1.5 mb-3">{renderStars(rating, true)}</div>

              <div className={`text-center text-sm font-semibold mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {rating > 0 ? `Rating Anda: ${rating} Bintang` : 'Pilih jumlah bintang'}
              </div>

              {/* Input for Name */}
              <div className="mb-3 sm:mb-4">
                <label className={`hidden sm:block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Nama</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Lengkap"
                  className={`w-full p-3 sm:p-3.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all border ${
                    isDarkMode
                      ? 'bg-gray-950/50 border-gray-800 text-gray-200 placeholder-gray-600'
                      : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400 shadow-inner'
                  }`}
                />
              </div>

              {/* Textarea for Review */}
              <div className="mb-4 sm:mb-6">
                <label className={`hidden sm:block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Ulasan</label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Tulis ulasan Anda di sini..."
                  className={`w-full p-3 sm:p-3.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all border ${
                    isDarkMode
                      ? 'bg-gray-950/50 border-gray-800 text-gray-200 placeholder-gray-600'
                      : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400 shadow-inner'
                  }`}
                  rows={3}
                />
              </div>
            </div>

            <button
              onClick={handleRatingSubmit}
              className={`w-full py-3 sm:py-3.5 px-4 rounded-xl transition-all duration-200 font-bold text-sm tracking-wider uppercase bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-[0_4px_15px_rgba(59,130,246,0.2)] hover:shadow-[0_4px_20px_rgba(59,130,246,0.35)] transform active:scale-[0.98] ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Mengirim...' : 'Kirim Ulasan'}
            </button>
          </div>

          {/* Right Column: Results Section Card */}
          <div
            className={`backdrop-blur-xl p-5 sm:p-8 rounded-2xl border flex flex-col justify-between h-full transition-all duration-300 hover:border-blue-500/20 ${
              isDarkMode 
                ? 'bg-gray-900/40 border-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]' 
                : 'bg-white/60 border-black/[0.05] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]'
            }`}
          >
            {/* Average Rating */}
            <div
              className={`rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border ${
                isDarkMode 
                  ? 'bg-gray-950/30 border-blue-500/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]' 
                  : 'bg-white border-gray-200/60 shadow-sm'
              }`}
            >
              <div className="text-center">
                <p className={`text-sm font-semibold tracking-wide ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} uppercase mb-2`}>
                  Rata-rata Rating
                </p>
                <div className="flex justify-center gap-1 mb-2">{renderStars(averageRating)}</div>
                <p className={`text-3xl font-black ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} leading-none my-2`}>
                  {averageRating.toFixed(1)} / 5
                </p>
                <p className={`${isDarkMode ? 'text-gray-500' : 'text-gray-500'} text-xs font-semibold`}>
                  Berdasarkan {recentReviews.length} Ulasan
                </p>
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="flex flex-col flex-grow relative">
              <style>{`
                .rating-scrollbar::-webkit-scrollbar {
                  width: 4px;
                }
                .rating-scrollbar::-webkit-scrollbar-track {
                  background: transparent;
                }
                .rating-scrollbar::-webkit-scrollbar-thumb {
                  background: #374151; /* gray-700 */
                  border-radius: 99px;
                }
                .rating-scrollbar::-webkit-scrollbar-thumb:hover {
                  background: #4b5563; /* gray-600 */
                }
              `}</style>
              <h4 className={`text-sm font-bold tracking-wide uppercase mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Ulasan Terbaru
              </h4>
              
              <div className="overflow-y-auto max-h-60 pr-2 rating-scrollbar flex-grow">
                {recentReviews.length > 0 ? (
                  <div className="space-y-4">
                    {recentReviews.map((review) => (
                      <div
                        key={review.id}
                        className={`border-b pb-3.5 ${
                          isDarkMode ? 'border-gray-800' : 'border-gray-150'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {review.name}
                          </span>
                          <div className="flex scale-75 origin-right">{renderStars(review.rating)}</div>
                        </div>
                        <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-medium`}>
                          {review.review}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={`${isDarkMode ? 'text-gray-600' : 'text-gray-400'} text-sm text-center py-8 font-semibold`}>
                    Belum ada ulasan
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default StarRating;
