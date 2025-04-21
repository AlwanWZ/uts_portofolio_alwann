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
            ...data,
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

      if (name.trim() === '') {
        alert('Please enter your name');
        return;
      }

      setIsSubmitting(true);

      try {
        const ratingData = {
          productName,
          name,
          rating,
          review,
          createdAt: serverTimestamp(),
        };

        const ratingsRef = collection(db, 'ratings');
        await addDoc(ratingsRef, ratingData);

        setName('');
        setReview('');
        setRating(0);
        setShowThankYou(true);

        fetchRecentReviews();

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
      <div className="max-w-4xl mx-auto">
        <div
          className={`rounded-xl shadow-lg overflow-hidden border ${
            isDarkMode ? 'bg-[#121828] border-gray-800' : 'bg-white border-gray-200'
          }`}
        >
          <div className="md:flex">
            {/* Rating Form Section */}
            <div className="md:w-1/2 p-4 md:p-6">
              <div
                className={`rounded-lg shadow-md p-4 md:p-6 border ${
                  isDarkMode ? 'bg-[#1a2233] border-gray-700' : 'bg-gray-100 border-gray-300'
                }`}
              >
                <h3
                  className={`text-lg md:text-xl font-bold mb-4 text-center ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}
                >
                  Rate {productName}
                </h3>

                {showThankYou ? (
                  <div
                    className={`rounded-lg p-4 text-center mb-4 ${
                      isDarkMode ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-100 border-blue-300'
                    }`}
                  >
                    <p className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} font-medium`}>
                      Thank you for your review!
                    </p>
                  </div>
                ) : null}

                {/* Render Stars */}
                <div className="flex justify-center mb-4">{renderStars(rating, true)}</div>

                <div className={`text-center mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {rating > 0 ? `Your rating: ${rating} stars` : 'Select your rating'}
                </div>

                {/* Input for Name */}
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className={`w-full p-3 rounded-md mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    isDarkMode
                      ? 'bg-[#131d2e] border-gray-700 text-gray-200'
                      : 'bg-gray-100 border-gray-300 text-gray-700'
                  }`}
                />

                {/* Textarea for Review */}
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Write your review here..."
                  className={`w-full p-3 rounded-md mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    isDarkMode
                      ? 'bg-[#131d2e] border-gray-700 text-gray-200'
                      : 'bg-gray-100 border-gray-300 text-gray-700'
                  }`}
                  rows={4}
                />

                <button
                  onClick={handleRatingSubmit}
                  className={`w-full py-3 px-4 rounded-md transition duration-200 font-medium ${
                    isDarkMode
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  } ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </div>

            {/* Results Section */}
            <div className="md:w-1/2 p-4 md:p-6">
              {/* Average Rating */}
              <div
                className={`rounded-lg p-4 mb-6 border ${
                  isDarkMode ? 'bg-[#131d2e] border-gray-700' : 'bg-gray-100 border-gray-300'
                }`}
              >
                <div className="text-center">
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Average Rating</p>
                  <div className="flex justify-center mb-2">{renderStars(averageRating)}</div>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    {averageRating.toFixed(1)} / 5
                  </p>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                    Based on {recentReviews.length} reviews
                  </p>
                </div>
              </div>

              {/* Recent Reviews */}
              <div className="flex flex-col flex-grow">
                <h4 className={`font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Recent Reviews
                </h4>
                <div className="overflow-y-auto max-h-64 pr-2">
                  {recentReviews.length > 0 ? (
                    <div className="space-y-4">
                      {recentReviews.map((review) => (
                        <div
                          key={review.id}
                          className={`border-b pb-3 ${
                            isDarkMode ? 'border-gray-700' : 'border-gray-300'
                          }`}
                        >
                          <div className="flex items-center mb-2">
                            <div className="flex mr-2">{renderStars(review.rating)}</div>
                            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                              {review.name}
                            </span>
                          </div>
                          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {review.review}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-center py-4`}>
                      No reviews yet
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default StarRating;
