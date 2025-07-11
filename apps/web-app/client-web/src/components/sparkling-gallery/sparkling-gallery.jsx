import React, { useState, useEffect } from "react";
import styles from "./sparkling-gallery.module.css";

const SparkligGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    // Modern living rooms
    "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg",
    "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg",
    // Clean kitchens
    "https://images.pexels.com/photos/1599791/pexels-photo-1599791.jpeg",
    "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg",
    "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg",
    // Bedrooms
    "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
    "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
    // Bathrooms
    "https://images.pexels.com/photos/6585751/pexels-photo-6585751.jpeg",
    // Home office/study
    "https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg",
  ];

  const goPrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  // ⏱ Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); // cleanup on unmount
  }, [images.length]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLine}>
          <div className={styles.line}></div>
          <h2 className={styles.headerText}>Sparkling Clean Home Gallery</h2>
          <div className={styles.line}></div>
        </div>
      </div>

      <div className={styles.galleryWrapper}>
        <div
          className={styles.slider}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Gallery item ${index + 1}`}
              className={styles.slideImage}
              loading="lazy"
            />
          ))}
        </div>

        <button className={styles.navButton} onClick={goPrev}>
          &lt;
        </button>
        <button className={styles.navButton} onClick={goNext}>
          &gt;
        </button>
      </div>

      <div className={styles.thumbnailRow}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            className={`${styles.thumbnail} ${
              index === currentIndex ? styles.active : ""
            }`}
            onClick={() => setCurrentIndex(index)}
            alt={`Thumbnail ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export { SparkligGallery };
