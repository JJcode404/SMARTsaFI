import styles from "./dashboard.module.css";
import { Plus, Send, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../../utilites/useFetch";
import { useAuth } from "../../../utilites/authContextapi";
import { useClientData } from "../../../utilites/useClientData";
import { useBookingData } from "../../../utilites/useBookingData";

const Dashboard = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const navigate = useNavigate();
  const {
    data: clientData,
    loading: clientLoading,
    status: clientStatus,
  } = useClientData();
  const {
    data: bookingData,
    loading: bookingLoading,
    error: bookingError,
    status: bookingStatus,
  } = useBookingData();

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  if (clientData) {
    console.log("Client data:", clientData);
  }
  useEffect(() => {
    if (clientStatus === 404) {
      navigate("/clientRegistration");
    }
  }, [clientStatus, navigate]);

  useEffect(() => {
    if (bookingStatus === 404) {
      // This might be normal - client just has no bookings yet
      console.log("No bookings found - this is normal for new clients");
    } else if (bookingStatus === 401) {
      console.log("Unauthorized access to bookings");
      navigate("/login");
    } else if (bookingStatus === 403) {
      console.log("Forbidden access to bookings");
    }
  }, [bookingStatus, navigate]);

  // Process booking data to generate stats
  const getStatsFromBookings = (bookings) => {
    if (!bookings || bookings.length === 0) {
      return {
        totalBookings: 0,
        upcomingCleanings: 0,
        messages: 0,
        topCleaner: "N/A",
      };
    }

    const now = new Date();
    const upcomingBookings = bookings.filter(
      (booking) =>
        new Date(booking.appointment_datetime) > now &&
        (booking.status === "Scheduled" || booking.status === "pending")
    );

    // Get top cleaner (most bookings)
    const cleanerCounts = {};
    bookings.forEach((booking) => {
      const cleanerName = `${
        booking.worker.first_name
      } ${booking.worker.last_name.charAt(0)}.`;
      cleanerCounts[cleanerName] = (cleanerCounts[cleanerName] || 0) + 1;
    });

    const topCleaner =
      Object.keys(cleanerCounts).length > 0
        ? Object.keys(cleanerCounts).reduce((a, b) =>
            cleanerCounts[a] > cleanerCounts[b] ? a : b
          )
        : "N/A";

    return {
      totalBookings: bookings.length,
      upcomingCleanings: upcomingBookings.length,
      messages: 0, // This would come from a separate messages API
      topCleaner,
    };
  };

  const stats = bookingLoading
    ? []
    : (() => {
        const bookingStats = getStatsFromBookings(bookingData);
        return [
          {
            label: "Total Bookings",
            value: bookingStats.totalBookings.toString(),
            change: "",
            color: "#3b82f6",
          },
          {
            label: "Upcoming Cleanings",
            value: bookingStats.upcomingCleanings.toString(),
            change: "",
            color: "#10b981",
          },
          {
            label: "Messages",
            value: bookingStats.messages.toString(),
            change: "",
            color: "#8b5cf6",
          },
          {
            label: "Top Cleaner",
            value: bookingStats.topCleaner,
            change: "",
            color: "#ec4899",
          },
        ];
      })();

  // Process booking data for recent bookings display
  const getRecentBookings = (bookings) => {
    if (!bookings || bookings.length === 0) return [];

    return bookings
      .sort((a, b) => new Date(b.date_of_booking) - new Date(a.date_of_booking))
      .slice(0, 4)
      .map((booking) => {
        // Get the main service name from booked_services
        const mainService =
          booking.booked_services[0]?.feature_option?.feature?.title ||
          "Cleaning Service";

        // Format date
        const date = new Date(booking.appointment_datetime).toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "numeric",
            year: "numeric",
          }
        );

        // Format status
        let displayStatus = booking.status;
        if (booking.status === "pending") {
          displayStatus = "Scheduled";
        }

        return {
          id: booking.id,
          service: mainService,
          date: date,
          status: displayStatus,
          cleaner: `${
            booking.worker.first_name
          } ${booking.worker.last_name.charAt(0)}.`,
        };
      });
  };

  const recentBookings = bookingLoading ? [] : getRecentBookings(bookingData);

  // Mock messages - you can replace this with real message data when available
  const messages = [
    {
      id: 1,
      sender: "Support Team",
      message: "Welcome to our cleaning service platform!",
      time: "Today",
      unread: false,
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "Scheduled":
        return <Clock className={styles.statusIcon} />;
      case "In Progress":
        return <AlertCircle className={styles.statusIcon} />;
      case "Completed":
        return <CheckCircle className={styles.statusIcon} />;
      default:
        return <Clock className={styles.statusIcon} />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Scheduled":
        return styles.statusScheduled;
      case "In Progress":
        return styles.statusInProgress;
      case "Completed":
        return styles.statusCompleted;
      default:
        return styles.statusScheduled;
    }
  };

  // Skeleton components
  const StatCardSkeleton = () => (
    <div className={styles.statCard}>
      <div className={styles.statCardHeader}>
        <div className={`${styles.statIcon} ${styles.skeleton}`}></div>
        <div className={`${styles.skeletonText} ${styles.skeletonSmall}`}></div>
      </div>
      <div className={`${styles.skeletonText} ${styles.skeletonLarge}`}></div>
      <div className={`${styles.skeletonText} ${styles.skeletonMedium}`}></div>
    </div>
  );

  const BookingItemSkeleton = () => (
    <div className={styles.bookingItem}>
      <div className={styles.bookingHeader}>
        <div
          className={`${styles.skeletonText} ${styles.skeletonMedium}`}
        ></div>
        <div className={styles.bookingStatus}>
          <div className={`${styles.statusIcon} ${styles.skeleton}`}></div>
          <div
            className={`${styles.skeletonText} ${styles.skeletonSmall}`}
          ></div>
        </div>
      </div>
      <div className={styles.bookingDetails}>
        <div className={`${styles.skeletonText} ${styles.skeletonSmall}`}></div>
        <div className={`${styles.skeletonText} ${styles.skeletonSmall}`}></div>
      </div>
    </div>
  );

  const MessageItemSkeleton = () => (
    <div className={styles.messageItem}>
      <div className={styles.messageHeader}>
        <div
          className={`${styles.skeletonText} ${styles.skeletonMedium}`}
        ></div>
      </div>
      <div className={`${styles.skeletonText} ${styles.skeletonLarge}`}></div>
      <div className={`${styles.skeletonText} ${styles.skeletonSmall}`}></div>
    </div>
  );

  return (
    <main className={styles.dashboard}>
      {/* Welcome */}
      <div className={styles.welcomeSection}>
        <div className={styles.welcomeContent}>
          <div className={styles.welcomeText}>
            {clientLoading ? (
              <div
                className={`${styles.skeletonText} ${styles.skeletonLarge}`}
              ></div>
            ) : (
              clientData && (
                <h1 className={styles.welcomeTitle}>
                  Welcome back,{" "}
                  <span className={styles.userName}>
                    {clientData?.first_name ||
                      clientData?.last_name ||
                      "Client"}
                  </span>
                  !👋
                </h1>
              )
            )}
            <p className={styles.welcomeSubtitle}>
              Your home is looking great. Ready for your next cleaning?
            </p>
          </div>
          <div className={styles.welcomeActions}>
            <Link to={`/booking-flow/service-type`}>
              <button className={styles.primaryButton}>
                <Plus className={styles.icon} />
                <span>Book Cleaning</span>
              </button>
            </Link>
            <Link to={`/messages`}>
              <button className={styles.secondaryButton}>
                <Send className={styles.icon} />
                <span>Send Message</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        {bookingLoading
          ? Array(4)
              .fill(0)
              .map((_, i) => <StatCardSkeleton key={i} />)
          : stats.map((stat, i) => (
              <div
                key={i}
                className={styles.statCard}
                style={{ "--stat-color": stat.color }}
              >
                <div className={styles.statCardHeader}>
                  <div
                    className={styles.statIcon}
                    style={{ backgroundColor: stat.color }}
                  ></div>
                  {stat.change && (
                    <span className={styles.statChange}>{stat.change}</span>
                  )}
                </div>
                <h3 className={styles.statValue}>{stat.value}</h3>
                <p className={styles.statLabel}>{stat.label}</p>
              </div>
            ))}
      </div>

      {/* Content Grid */}
      <div
        className={`${styles.contentGrid} ${
          isLargeScreen ? styles.contentGridLarge : ""
        }`}
      >
        {/* Bookings */}
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recent Bookings</h2>
            <a href="#" className={styles.sectionLink}>
              View All
            </a>
          </div>
          <div className={styles.bookingsList}>
            {bookingLoading ? (
              Array(4)
                .fill(0)
                .map((_, i) => <BookingItemSkeleton key={i} />)
            ) : bookingError ? (
              <div className={styles.errorMessage}>
                Unable to load bookings. Please try again.
              </div>
            ) : recentBookings.length === 0 ? (
              <div className={styles.emptyState}>
                <p>No bookings yet. Book your first cleaning service!</p>
                <Link to="/booking-flow/service-type">
                  <button className={styles.primaryButton}>
                    <Plus className={styles.icon} />
                    Book Now
                  </button>
                </Link>
              </div>
            ) : (
              recentBookings.map((booking) => (
                <div key={booking.id} className={styles.bookingItem}>
                  <div className={styles.bookingHeader}>
                    <h3 className={styles.bookingTitle}>{booking.service}</h3>
                    <div className={styles.bookingStatus}>
                      {getStatusIcon(booking.status)}
                      <span
                        className={`${styles.statusBadge} ${getStatusClass(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
                  <div className={styles.bookingDetails}>
                    <span>{booking.date}</span>
                    <span>Cleaner: {booking.cleaner}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Messages */}
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Messages</h2>
            <a href="#" className={styles.sectionLink}>
              View All
            </a>
          </div>
          <div className={styles.messagesList}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.messageItem} ${
                  msg.unread ? styles.messageItemUnread : ""
                }`}
              >
                <div className={styles.messageHeader}>
                  <h3 className={styles.messageSender}>{msg.sender}</h3>
                  {msg.unread && <div className={styles.unreadDot}></div>}
                </div>
                <p className={styles.messageText}>{msg.message}</p>
                <span className={styles.messageTime}>{msg.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export { Dashboard };
