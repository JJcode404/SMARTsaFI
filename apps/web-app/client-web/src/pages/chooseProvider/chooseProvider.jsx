import { useBooking } from "../../utilites/bookingContext";
import styles from "./chooseProvider.module.css";
import { Star, CheckCircle, Clock, MapPin, Video } from "lucide-react";

const ServiceProviderCard = ({ provider }) => {
  const { dispatch, state } = useBooking();

  const handleSelectProvider = () => {
    dispatch({ type: "SET_SERVICE_PROVIDER", payload: provider });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className={styles.starFilled} />);
    }

    const emptyStars = 5 - fullStars;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className={styles.starEmpty} />);
    }

    return stars;
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardInner}>
        <div className={styles.content}>
          {/* Profile Image with enhanced styling */}
          <div className={styles.profileSection}>
            <div className={styles.profileImageWrapper}>
              <img
                src={provider.profileImage}
                alt={provider.name}
                className={styles.profileImage}
              />
            </div>
            {provider.verified && (
              <div className={styles.verificationBadge}>
                <CheckCircle className={styles.verificationIcon} />
              </div>
            )}
          </div>

          {/* Content */}
          <div className={styles.details}>
            {/* Name with subtle animation */}
            <h3 className={styles.name}>{provider.name}</h3>

            {/* Rating with enhanced styling */}
            <div className={styles.ratingSection}>
              <div className={styles.starsContainer}>
                {renderStars(provider.rating)}
              </div>
              <span className={styles.ratingValue}>{provider.rating}</span>
              <span className={styles.reviewCount}>
                ({provider.reviewCount} reviews)
              </span>
            </div>

            {/* Quick stats */}
            <div className={styles.statsSection}>
              <div className={styles.statItem}>
                <Clock className={styles.statIconGreen} />
                <span>{provider.responseTime}</span>
              </div>
              <div className={styles.statItem}>
                <MapPin className={styles.statIconBlue} />
                <span>{provider.location}</span>
              </div>
            </div>

            {/* Bio with improved styling */}
            <p className={styles.bio}>{provider.bio}</p>

            {/* Action buttons */}
            <div className={styles.buttonSection}>
              <button
                className={styles.bookButton}
                onClick={handleSelectProvider}
                disabled={state.serviceProvider === null}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example usage with multiple providers
const ServiceProvidersList = () => {
  const providers = [
    {
      id: 1,
      name: "Emily R.",
      rating: 4.9,
      reviewCount: 87,
      bio: "Experienced and detail-oriented professional cleaner, issues an outstanding service and ensuring our clients' homes sparklingly clean.",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      verified: true,
      responseTime: "30 min",
      location: "Downtown",
    },
    {
      id: 2,
      name: "Marcus T.",
      rating: 4.8,
      reviewCount: 124,
      bio: "Professional cleaning specialist with 5+ years experience in residential and commercial cleaning. Eco-friendly products only.",
      profileImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      verified: true,
      responseTime: "45 min",
      location: "Midtown",
    },
    {
      id: 3,
      name: "Sarah K.",
      rating: 4.7,
      reviewCount: 156,
      bio: "Reliable and thorough cleaner specializing in deep cleaning services. Available for regular maintenance and one-time cleaning.",
      profileImage:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      verified: false,
      responseTime: "1 hour",
      location: "Uptown",
    },
    {
      id: 4,
      name: "David L.",
      rating: 4.9,
      reviewCount: 93,
      bio: "Detail-oriented professional with expertise in carpet cleaning, window washing, and general house maintenance. Fully insured.",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      verified: true,
      responseTime: "20 min",
      location: "Westside",
    },
    {
      id: 5,
      name: "David L.",
      rating: 4.9,
      reviewCount: 93,
      bio: "Detail-oriented professional with expertise in carpet cleaning, window washing, and general house maintenance. Fully insured.",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      verified: true,
      responseTime: "20 min",
      location: "Westside",
    },
    {
      id: 6,
      name: "David L.",
      rating: 4.9,
      reviewCount: 93,
      bio: "Detail-oriented professional with expertise in carpet cleaning, window washing, and general house maintenance. Fully insured.",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      verified: true,
      responseTime: "20 min",
      location: "Westside",
    },
    {
      id: 7,
      name: "David L.",
      rating: 4.9,
      reviewCount: 93,
      bio: "Detail-oriented professional with expertise in carpet cleaning, window washing, and general house maintenance. Fully insured.",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      verified: true,
      responseTime: "20 min",
      location: "Westside",
    },
  ];

  return (
    <div className={styles.providersList}>
      <h2 className={styles.listTitle}>Available Service Providers</h2>
      <div className={styles.providersGrid}>
        {providers.map((provider) => (
          <ServiceProviderCard key={provider.id} provider={provider} />
        ))}
      </div>
    </div>
  );
};

function ServiceProvider() {
  const { dispatch, state, handleNext } = useBooking();

  const handleLanguageChange = (e) => {
    dispatch({ type: "SET_PREFERED_LANGUAGE", payload: e.target.value });
  };

  const handleSpecialRequestChange = (e) => {
    dispatch({ type: "SET_CLIENT_SPECIAL_REQUEST", payload: e.target.value });
  };
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className="right">
          {/* Title and Description */}

          <div className={styles.titleSection}>
            <h1 className={styles.title}>Cleaner preferences</h1>
            <p className={styles.subtitle}>
              Choose your cleaner and specify any preferences
              <br />
              or special requests.
            </p>
          </div>
          {/* Cleaner Selection */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Cleaner</h2>
            {/* Any Available Option */}
            <div className={styles.radioOption}>
              <input
                type="checkbox"
                name="cleaner"
                onChange={(e) =>
                  dispatch({
                    type: "SET_SERVICE_PROVIDER",
                    payload: e.target.checked
                      ? null
                      : state.serviceProvider.name,
                  })
                }
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>Any available</span>
            </div>
            {/* Cleaner Profiles */}
            <div className={styles.cleanerGrid}>
              <ServiceProvidersList />
            </div>
          </div>
          {/* Preferred Language */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Preferred language</h2>
            <div className={styles.selectContainer}>
              <select className={styles.select} onChange={handleLanguageChange}>
                <option>English</option>
                <option>Swahili</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
              <div className={styles.selectIcon}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
          {/* Special Requests */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Special requests</h2>
            <textarea
              className={styles.textarea}
              rows="3"
              placeholder="Pet-friendly, eco-friendly products, etc."
              onChange={handleSpecialRequestChange}
            />
          </div>
          {/* Next Button */}
        </div>
        <div className="left">
          <div className={styles.serviceDetails}>
            <h2 className={styles.sectionTitle}>Summary Details</h2>
            <hr />
            <div className={styles.details}>
              <ul className={styles.serviceList}>
                <li>Service Provider: {state.serviceProvider.name}</li>
                <li>Language: {state.preferedLanguange}</li>
                <li>Special-Request: {state.clientSpecialReaquest}</li>
              </ul>
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.nextButton} onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export { ServiceProvider };
