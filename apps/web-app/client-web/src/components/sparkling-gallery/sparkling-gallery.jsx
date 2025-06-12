import React, { useState } from "react";
import styles from "./sparkling-gallery.module.css";

const SparkligGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goPrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };
  const images = [
    // Modern living rooms
    "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
    "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
    "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",

    // Clean kitchens
    "https://images.pexels.com/photos/1599791/pexels-photo-1599791.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
    "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
    "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",

    // Bedrooms
    "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
    "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",

    // Bathrooms
    "https://images.pexels.com/photos/6585751/pexels-photo-6585751.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",

    // Home office/study
    "https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
  ];

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
        <button className={styles.navButton} onClick={goPrev}>
          &lt;
        </button>
        <img
          src={images[currentIndex]}
          alt={`Gallery item ${currentIndex + 1}`}
          className={styles.mainImage}
        />
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
