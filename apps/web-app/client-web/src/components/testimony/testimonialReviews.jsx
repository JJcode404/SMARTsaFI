import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import styles from "./testimonialReviews.module.css";

const TestimonialReviews = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Ric Harris",
      date: "26/05/2025",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "Big thanks to Maya for an awesome job!!! Had a mov...",
      fullReview:
        "Big thanks to Maya for an awesome job!!! Had a move-out cleaning and she did an incredible job. The place was spotless and ready for the next tenant. Highly recommend SMARTsaFI Cleaning Services!",
    },
    {
      id: 2,
      name: "Byron Wolf",
      date: "14/04/2025",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "Hands down this was the best cleaning we have rece...",
      fullReview:
        "Hands down this was the best cleaning we have received. The attention to detail was amazing and our house has never looked better. Professional, reliable, and affordable!",
    },

    {
      id: 3,
      name: "Michael Johnson",
      date: "08/03/2025",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "Outstanding service! The team was punctual and prof...",
      fullReview:
        "Outstanding service! The team was punctual and professional. They transformed our home and exceeded all expectations. Worth every penny!",
    },
    {
      id: 4,
      name: "Sarah Davis",
      date: "22/02/2025",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "I've tried several cleaning services, but SMARTsaFI Cle...",
      fullReview:
        "I've tried several cleaning services, but SMARTsaFI Cleaning Services TX stands out from the rest. Reliable, thorough, and friendly staff. Highly recommended!",
    },
    {
      id: 5,
      name: "Michael Johnson",
      date: "08/03/2025",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "Outstanding service! The team was punctual and prof...",
      fullReview:
        "Outstanding service! The team was punctual and professional. They transformed our home and exceeded all expectations. Worth every penny!",
    },
    {
      id: 6,
      name: "Sarah Davis",
      date: "22/02/2025",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "I've tried several cleaning services, but SMARTsaFI Cle...",
      fullReview:
        "I've tried several cleaning services, but SMARTsaFI Cleaning Services TX stands out from the rest. Reliable, thorough, and friendly staff. Highly recommended!",
    },
  ];

  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(testimonials.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const getCurrentTestimonials = () => {
    const start = currentSlide * itemsPerSlide;
    return testimonials.slice(start, start + itemsPerSlide);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? styles.starFilled : styles.starEmpty}
      />
    ));
  };

  return (
    <div className={styles.container}>
      {/* Dark overlay */}
      <div className={styles.overlay}></div>

      {/* Content */}
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>
            Customer Reviews That Speak for Themselves
          </h1>

          {/* Company Info with Google Rating */}
          <div className={styles.ratingSection}>
            <div className={styles.left}>
              <div className={styles.googleIcon}>
                <svg className={styles.googleSvg} viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </div>
              <span className={styles.scoreNumber}>4.8</span>
            </div>
            <div className={styles.ratingInfo}>
              <p className={styles.companyDescription}>
                SMARTsaFI Cleaning Services TX - Cleaning Service Houston TX,
                Residential Cleaning, Affordable Deep Cleaning
              </p>
              <div className={styles.ratingScore}>
                <div className={styles.starsContainer}>{renderStars(5)}</div>
              </div>
              <div className={styles.reviewCount}>62 Reviews</div>
            </div>
          </div>
        </div>

        {/* Testimonials Slider */}
        <div className={styles.sliderContainer}>
          {/* Navigation Arrows */}
          <div className={styles.sliderdiv}>
            <button
              onClick={prevSlide}
              className={`${styles.navButton} ${styles.prevButton} ${
                currentSlide === 0 ? styles.disabled : ""
              }`}
              disabled={currentSlide === 0}
            >
              <ChevronLeft size={24} />
            </button>
            <div className={styles.cardsGrid}>
              {getCurrentTestimonials().map((testimonial) => (
                <div key={testimonial.id} className={styles.card}>
                  {/* Avatar */}
                  <div className={styles.avatarContainer}>
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className={styles.avatar}
                    />
                  </div>
                  {/* Stars */}
                  <div className={styles.cardStars}>
                    {renderStars(testimonial.rating)}
                  </div>
                  {/* Review Text */}
                  <p className={styles.reviewText}>"{testimonial.text}"</p>
                  {/* Read Full Review Link */}
                  <div className={styles.readMoreContainer}>
                    <button className={styles.readMoreLink}>
                      Read full review →
                    </button>
                  </div>
                  {/* Author Info */}
                  <div className={styles.authorInfo}>
                    <svg
                      className={styles.authorGoogleIcon}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className={styles.authorName}>
                      {testimonial.name}
                    </span>
                    <span className={styles.dateSeparator}>-</span>
                    <span className={styles.reviewDate}>
                      {testimonial.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={nextSlide}
              className={`${styles.navButton} ${styles.nextButton} ${
                currentSlide === totalSlides - 1 ? styles.disabled : ""
              }`}
              disabled={currentSlide === totalSlides - 1}
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Testimonial Cards */}

          {/* Pagination Dots */}
          <div className={styles.pagination}>
            {Array.from({ length: totalSlides }, (_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`${styles.dot} ${
                  i === currentSlide ? styles.activeDot : ""
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { TestimonialReviews };
