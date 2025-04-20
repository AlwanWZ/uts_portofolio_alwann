import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase'; // Impor Firestore

interface RatingProps {
  productName?: string;
}

interface ReviewData {
  id: string;
  productName: string;
  rating: number;
  review: string;
  createdAt: any;
}

const StarRating: React.FC<RatingProps> = ({ productName = 'this product' }) => {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [recentReviews, setRecentReviews] = useState<ReviewData[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [showThankYou, setShowThankYou] = useState<boolean>(false);

  useEffect(() => {
    fetchRecentReviews();
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
          ...data
        });
        totalRating += data.rating || 0;
      });
      
      setRecentReviews(reviews);
      setAverageRating(reviews.length > 0 ? totalRating / reviews.length : 0);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleRatingSubmit = async () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    setIsSubmitting(true);

    try {
      // Data rating yang akan disimpan
      const ratingData = {
        productName,
        rating,
        review,
        createdAt: serverTimestamp(),
      };

      // Simpan data ke koleksi "ratings" di Firestore
      const ratingsRef = collection(db, 'ratings');
      await addDoc(ratingsRef, ratingData);

      // Reset form and show thank you message
      setReview('');
      setRating(0);
      setShowThankYou(true);
      
      // Refresh reviews
      fetchRecentReviews();
      
      // Hide thank you message after 3 seconds
      setTimeout(() => {
        setShowThankYou(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to render stars for a given rating
  const renderStars = (value: number, interactive = false) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <svg 
        key={star}
        className={`w-6 h-6 ${interactive ? 'cursor-pointer' : ''} ${
          star <= value ? 'text-blue-400 fill-blue-400' : 'text-gray-600 fill-gray-600'
        }`}
        onClick={interactive ? () => setRating(star) : undefined}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ));
  };

  // Format date from Firestore timestamp
  const formatDate = (timestamp: any) => {
    if (!timestamp || !timestamp.toDate) return 'N/A';
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (

    
    <div className="max-w-4xl mx-auto">
      <div className="bg-[#121828] rounded-xl shadow-lg overflow-hidden border border-gray-800">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold text-center text-white"></h2>
        </div>

        <div className="md:flex">
          {/* Rating Form Section - Fixed height */}
          <div className="md:w-1/2 p-4 md:p-6">
            <div className="bg-[#1a2233] rounded-lg shadow-md p-4 md:p-6 border border-gray-700">
              <h3 className="text-lg md:text-xl font-bold mb-4 text-blue-400">Rate {productName}</h3>
              
              {showThankYou ? (
                <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 text-center mb-4">
                  <p className="text-blue-400 font-medium">Thank you for your review!</p>
                </div>
              ) : null}
              
              <div className="flex justify-center mb-4">
                {renderStars(rating, true)}
              </div>
              
              <div className="text-center mb-4 text-gray-300">
                {rating > 0 ? `Your rating: ${rating} stars` : 'Select your rating'}
              </div>
              
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write your review here..."
                className="w-full p-3 bg-[#131d2e] border border-gray-700 rounded-md mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
                rows={4}
              />
              
              <button
                onClick={handleRatingSubmit}
                className={`w-full py-3 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 font-medium ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </div>
          
          {/* Results Section with fixed height and scrollable reviews */}
          <div className="md:w-1/2 p-4 md:p-6 h-full">
            <div className="bg-[#1a2233] rounded-lg shadow-md p-4 md:p-6 border border-gray-700 h-full flex flex-col">
              <h3 className="text-lg md:text-xl font-bold mb-4 text-blue-400">Review Results</h3>
              
              {/* Average Rating - Fixed section */}
              <div className="bg-[#131d2e] rounded-lg p-4 mb-6 border border-gray-700">
                <div className="text-center">
                  <p className="text-gray-300 mb-1">Average Rating</p>
                  <div className="flex justify-center mb-2">
                    {renderStars(averageRating)}
                  </div>
                  <p className="text-2xl font-bold text-blue-400">
                    {averageRating.toFixed(1)} / 5
                  </p>
                  <p className="text-sm text-gray-400">
                    Based on {recentReviews.length} reviews
                  </p>
                </div>
              </div>
              
              {/* Recent Reviews - Scrollable section */}
              <div className="flex flex-col flex-grow">
                <h4 className="font-medium text-gray-300 mb-3">Recent Reviews</h4>
                
                <div className="overflow-y-auto max-h-64 pr-2">
                  {recentReviews.length > 0 ? (
                    <div className="space-y-4">
                      {recentReviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-700 pb-3">
                          <div className="flex items-center mb-2">
                            <div className="flex mr-2">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-sm text-gray-400">
                              {formatDate(review.createdAt)}
                            </span>
                          </div>
                          <p className="text-gray-300">{review.review}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center py-4">No reviews yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarRating;