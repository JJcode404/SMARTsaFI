import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  Shield,
  Award,
  Users,
  Calendar,
  MessageCircle,
  ArrowLeft,
  CheckCircle,
  DollarSign,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import styles from "./serviceProviderDetails.module.css";
import { serviceProviders } from "../../../data/Serviceproviders";

const ServiceProviderDetail = () => {
  const { id } = useParams();
  const provider = serviceProviders.find((p) => p.id === Number(id));
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState("overview");

  // Sample provider data

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className={`${styles.star} ${styles.starFilled}`} />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className={`${styles.star} ${styles.starHalf}`} />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          className={`${styles.star} ${styles.starEmpty}`}
        />
      );
    }

    return stars;
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % provider.gallery.length);
  };

  const prevImage = () => {
    setSelectedImageIndex(
      (prev) => (prev - 1 + provider.gallery.length) % provider.gallery.length
    );
  };

  return (
    <div className={styles.container}>
      {/* Header with back button */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <Link to={"/viewServiceProviders"}>
            <button className={styles.backButton}>
              <ArrowLeft className={styles.backButtonIcon} />
              Back to providers
            </button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <img
            src={provider.coverImage}
            alt="Cover"
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay}></div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroCard}>
            <div className={styles.heroCardContent}>
              <div className={styles.heroHeader}>
                <div className={styles.heroProfile}>
                  <div className={styles.profileImageContainer}>
                    <img
                      src={provider.profileImage}
                      alt={provider.name}
                      className={styles.profileImage}
                      loading="lazy"
                    />
                    <div className={styles.onlineIndicator}></div>
                  </div>
                  <div className={styles.profileInfo}>
                    <h1>{provider.name}</h1>
                    <div className={styles.ratingContainer}>
                      <div className={styles.stars}>
                        {renderStars(provider.rating)}
                        <span className={styles.ratingText}>
                          {provider.rating}
                        </span>
                        <span className={styles.reviewCount}>
                          ({provider.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                    <div className={styles.location}>
                      <MapPin className={styles.locationIcon} />
                      <span>{provider.location}</span>
                    </div>
                    <div className={styles.badges}>
                      {provider.badges.map((badge, index) => (
                        <span key={index} className={styles.badge}>
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={styles.heroActions}>
                  <button className={styles.primaryButton}>
                    <Calendar className={styles.buttonIcon} />
                    Book Now
                  </button>
                  <button className={styles.secondaryButton}>
                    <MessageCircle className={styles.buttonIcon} />
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className={styles.contentSection}>
        <div className={styles.contentGrid}>
          {/* Main Content */}
          <div className={styles.mainContent}>
            {/* Navigation Tabs */}
            <div className={styles.tabsContainer}>
              <div className={styles.tabsNav}>
                <nav className={styles.tabsNavList}>
                  {[
                    { id: "overview", label: "Overview" },
                    { id: "services", label: "Services" },
                    { id: "gallery", label: "Gallery" },
                    { id: "reviews", label: "Reviews" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id)}
                      className={`${styles.tab} ${
                        selectedTab === tab.id
                          ? styles.tabActive
                          : styles.tabInactive
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className={styles.tabContent}>
                {selectedTab === "overview" && (
                  <div className={styles.overviewContent}>
                    <div>
                      <h3 className={styles.overviewTitle}>About</h3>
                      <p className={styles.overviewDescription}>
                        {provider.description}
                      </p>
                    </div>

                    <div className={styles.statsGrid}>
                      <div className={styles.statCard}>
                        <Award
                          className={`${styles.statIcon} ${styles.statIconBlue}`}
                        />
                        <div className={styles.statLabel}>Experience</div>
                        <div className={styles.statValue}>
                          {provider.experience}
                        </div>
                      </div>
                      <div className={styles.statCard}>
                        <CheckCircle
                          className={`${styles.statIcon} ${styles.statIconGreen}`}
                        />
                        <div className={styles.statLabel}>Completed Jobs</div>
                        <div className={styles.statValue}>
                          {provider.completedJobs}+
                        </div>
                      </div>
                      <div className={styles.statCard}>
                        <Clock
                          className={`${styles.statIcon} ${styles.statIconOrange}`}
                        />
                        <div className={styles.statLabel}>Response Time</div>
                        <div className={styles.statValue}>
                          {provider.responseTime}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === "services" && (
                  <div className={styles.servicesContent}>
                    <h3 className={styles.servicesTitle}>Services & Pricing</h3>
                    {provider.services.map((service, index) => (
                      <div key={index} className={styles.serviceCard}>
                        <div className={styles.serviceHeader}>
                          <div className={styles.serviceInfo}>
                            <h4>{service.name}</h4>
                            <p className={styles.serviceDuration}>
                              <Clock className={styles.durationIcon} />
                              {service.duration}
                            </p>
                          </div>
                          <div className={styles.servicePrice}>
                            <div className={styles.priceAmount}>
                              <DollarSign className={styles.priceIcon} />
                              {service.price}
                            </div>
                            <button className={styles.bookButton}>
                              Book Service
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {selectedTab === "gallery" && (
                  <div className={styles.galleryContent}>
                    <h3 className={styles.galleryTitle}>Work Gallery</h3>
                    <div className={styles.galleryMain}>
                      <div className={styles.galleryImage}>
                        <img
                          src={provider.gallery[selectedImageIndex]}
                          alt={`Gallery ${selectedImageIndex + 1}`}
                          loading="lazy"
                        />
                      </div>
                      <button
                        onClick={prevImage}
                        className={`${styles.galleryNav} ${styles.galleryNavLeft}`}
                      >
                        <ChevronLeft className={styles.galleryNavIcon} />
                      </button>
                      <button
                        onClick={nextImage}
                        className={`${styles.galleryNav} ${styles.galleryNavRight}`}
                      >
                        <ChevronRight className={styles.galleryNavIcon} />
                      </button>
                    </div>
                    <div className={styles.galleryThumbnails}>
                      {provider.gallery.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`${styles.thumbnail} ${
                            selectedImageIndex === index
                              ? styles.thumbnailActive
                              : ""
                          }`}
                        >
                          <img src={image} alt={`Thumbnail ${index + 1}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTab === "reviews" && (
                  <div className={styles.reviewsContent}>
                    <h3 className={styles.reviewsTitle}>Customer Reviews</h3>
                    {provider.reviews.map((review) => (
                      <div key={review.id} className={styles.reviewCard}>
                        <div className={styles.reviewHeader}>
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className={styles.reviewAvatar}
                          />
                          <div className={styles.reviewContent}>
                            <div className={styles.reviewMeta}>
                              <div className={styles.reviewAuthor}>
                                <h4>{review.name}</h4>
                                <div className={styles.reviewRating}>
                                  <div className={styles.stars}>
                                    {renderStars(review.rating)}
                                  </div>
                                  <span className={styles.reviewDate}>
                                    {review.date}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className={styles.reviewText}>
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            {/* Contact Card */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Contact Information</h3>
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <Phone className={styles.contactIcon} />
                  <div>
                    <div className={styles.contactLabel}>Phone</div>
                    <div className={styles.contactValue}>
                      {provider.contact.phone}
                    </div>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <Mail className={styles.contactIcon} />
                  <div>
                    <div className={styles.contactLabel}>Email</div>
                    <div className={styles.contactValue}>
                      {provider.contact.email}
                    </div>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <Clock className={styles.contactIcon} />
                  <div>
                    <div className={styles.contactLabel}>Hours</div>
                    <div className={styles.contactValue}>
                      {provider.contact.hours}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Quick Stats</h3>
              <div className={styles.statsContent}>
                <div className={styles.statRow}>
                  <span className={styles.statRowLabel}>Rating</span>
                  <span className={styles.statRowValue}>
                    {provider.rating}/5
                  </span>
                </div>
                <div className={styles.statRow}>
                  <span className={styles.statRowLabel}>Total Reviews</span>
                  <span className={styles.statRowValue}>
                    {provider.reviewCount}
                  </span>
                </div>
                <div className={styles.statRow}>
                  <span className={styles.statRowLabel}>Response Time</span>
                  <span className={styles.statRowValue}>
                    {provider.responseTime}
                  </span>
                </div>
                <div className={styles.statRow}>
                  <span className={styles.statRowLabel}>Completed Jobs</span>
                  <span className={styles.statRowValue}>
                    {provider.completedJobs}+
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.sidebarCard}>
              <div className={styles.sidebarActions}>
                <button className={styles.sidebarPrimaryButton}>
                  <Calendar className={styles.buttonIcon} />
                  Book Now
                </button>
                <button className={styles.sidebarSecondaryButton}>
                  <MessageCircle className={styles.buttonIcon} />
                  Send Message
                </button>
                <button className={styles.sidebarSecondaryButton}>
                  <Phone className={styles.buttonIcon} />
                  Call Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ServiceProviderDetail };
