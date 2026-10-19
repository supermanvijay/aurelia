import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/restaurantData';
import { ReviewItem } from '../types/restaurant';
import { Star, MessageSquarePlus, CheckCircle2, ChevronLeft, ChevronRight, X } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>(TESTIMONIALS);
  const [activeSlide, setActiveSlide] = useState(0);
  const [filterSource, setFilterSource] = useState<string>('all');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // New review form state
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [highlightedDish, setHighlightedDish] = useState('');

  const filteredReviews = filterSource === 'all'
    ? reviews
    : reviews.filter((r) => r.source === filterSource);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      author,
      role: role || 'Verified Diner',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
      rating,
      date: 'Just now',
      source: 'Google Reviews',
      comment,
      highlightedDish: highlightedDish || undefined,
    };

    setReviews([newRev, ...reviews]);
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setIsReviewModalOpen(false);
      setAuthor('');
      setRole('');
      setComment('');
      setHighlightedDish('');
    }, 1800);
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % filteredReviews.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + filteredReviews.length) % filteredReviews.length);
  };

  return (
    <section id="reviews" className="py-24 bg-[#0F1016] light:bg-[#F4F1EA] text-[#F3F4F6] light:text-[#191817]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 text-xs tracking-[0.3em] uppercase text-[#C5A059] font-medium mb-3">
            <span className="w-6 h-[1px] bg-[#C5A059]" />
            <span>Praise & Critical Acclaim</span>
            <span className="w-6 h-[1px] bg-[#C5A059]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight">
            Guest Reflections
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-slate-400 light:text-slate-600 font-light leading-relaxed">
            Rated 4.9 / 5.0 across over 740 verified dining experiences and international guide evaluations.
          </p>

          {/* Action Row */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0B0C10] bg-[#C5A059] hover:bg-[#D4AF37] light:bg-[#9B7836] light:text-white flex items-center gap-2 transition-colors shadow-sm"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Share Your Dining Experience</span>
            </button>
          </div>
        </div>

        {/* Featured Editorial Review Highlight Slider */}
        {filteredReviews.length > 0 && (
          <div className="max-w-4xl mx-auto mb-16 p-8 sm:p-12 bg-[#141520] light:bg-white border border-[#C5A059]/30 relative shadow-xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#C5A059]/15">
              <div className="flex items-center gap-3">
                <span className="text-[11px] uppercase tracking-widest font-mono text-[#C5A059]">
                  {filteredReviews[activeSlide]?.source}
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-xs text-slate-400 font-mono">
                  {filteredReviews[activeSlide]?.date}
                </span>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < filteredReviews[activeSlide]?.rating
                        ? 'text-[#C5A059] fill-[#C5A059]'
                        : 'text-slate-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="font-serif text-lg sm:text-2xl text-[#F3F4F6] light:text-[#191817] leading-relaxed italic mb-8">
              "{filteredReviews[activeSlide]?.comment}"
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-[#C5A059]/40 bg-[#0B0C10]">
                  <img
                    src={filteredReviews[activeSlide]?.avatar}
                    alt={filteredReviews[activeSlide]?.author}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#F3F4F6] light:text-[#191817]">
                    {filteredReviews[activeSlide]?.author}
                  </h4>
                  <p className="text-xs text-slate-400 light:text-slate-600">
                    {filteredReviews[activeSlide]?.role}
                  </p>
                </div>
              </div>

              {/* Slider Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="p-2 border border-[#C5A059]/30 text-slate-400 hover:text-[#C5A059] transition-colors"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-slate-400 px-1">
                  {activeSlide + 1} / {filteredReviews.length}
                </span>
                <button
                  onClick={nextSlide}
                  className="p-2 border border-[#C5A059]/30 text-slate-400 hover:text-[#C5A059] transition-colors"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3-Column Review Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="p-6 bg-[#13141E] light:bg-white border border-[#C5A059]/20 flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < rev.rating ? 'text-[#C5A059] fill-[#C5A059]' : 'text-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase font-mono text-[#C5A059]">
                    {rev.source}
                  </span>
                </div>

                <p className="text-xs text-slate-300 light:text-slate-700 leading-relaxed font-light mb-4 line-clamp-4">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#C5A059]/15 flex items-center justify-between">
                <div>
                  <h5 className="font-serif font-semibold text-sm text-[#F3F4F6] light:text-[#191817]">
                    {rev.author}
                  </h5>
                  <p className="text-[10px] text-slate-400 light:text-slate-500">{rev.role}</p>
                </div>
                <span className="text-[10px] font-mono text-slate-500">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Share Review Modal */}
        {isReviewModalOpen && (
          <div className="fixed inset-0 z-50 bg-[#0B0C10]/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#13141F] border border-[#C5A059]/40 max-w-lg w-full p-8 shadow-2xl relative">
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {reviewSubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-[#C5A059] mx-auto" />
                  <h4 className="text-2xl font-serif">Thank You</h4>
                  <p className="text-xs text-slate-300">
                    Your dining review has been preserved and added to our guestbook.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAddReview} className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-serif text-[#F3F4F6]">
                      Share Your Dining Experience
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Your candid feedback guides our kitchen brigade.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5 font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lord Alexander Wright"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#0B0C10] border border-[#C5A059]/30 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5 font-medium">
                      Rating
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="p-1 text-slate-500 hover:text-[#C5A059]"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= rating ? 'text-[#C5A059] fill-[#C5A059]' : ''
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-mono text-[#C5A059] ml-2">{rating} / 5 Stars</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5 font-medium">
                      Favorite Dish or Pairing
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. A5 Miyazaki Wagyu & Barolo"
                      value={highlightedDish}
                      onChange={(e) => setHighlightedDish(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#0B0C10] border border-[#C5A059]/30 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5 font-medium">
                      Your Comments
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Describe the dishes, sommelier recommendations, or service ambiance..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#0B0C10] border border-[#C5A059]/30 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div className="pt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsReviewModalOpen(false)}
                      className="px-4 py-2 text-xs uppercase tracking-wider text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0B0C10] bg-[#C5A059] hover:bg-[#D4AF37]"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
