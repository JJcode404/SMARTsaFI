import styles from "./dashboard.module.css";
import { Plus, Send, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const stats = [
    { label: "Total Bookings", value: "24", change: "+12%", color: "#3b82f6" },
    { label: "Upcoming Cleanings", value: "3", change: "+2", color: "#10b981" },
    { label: "Messages", value: "7", change: "+3", color: "#8b5cf6" },
    { label: "Top Cleaner", value: "Janet M.", change: "", color: "#ec4899" },
  ];

  const recentBookings = [
    {
      id: 1,
      service: "Deep House Cleaning",
      date: "Dec 28, 2024",
      status: "Scheduled",
      cleaner: "Sarah M.",
    },
    {
      id: 2,
      service: "Kitchen Deep Clean",
      date: "Dec 25, 2024",
      status: "In Progress",
      cleaner: "Mike K.",
    },
    {
      id: 3,
      service: "Bathroom Cleaning",
      date: "Dec 22, 2024",
      status: "Completed",
      cleaner: "Lisa P.",
    },
    {
      id: 4,
      service: "Office Cleaning",
      date: "Dec 20, 2024",
      status: "Completed",
      cleaner: "John D.",
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "Sarah M.",
      message: "I'll arrive at 2 PM today for your deep cleaning service.",
      time: "10:30 AM",
      unread: true,
    },
    {
      id: 2,
      sender: "Support Team",
      message: "Your feedback has been received. Thank you!",
      time: "9:15 AM",
      unread: false,
    },
    {
      id: 3,
      sender: "Mike K.",
      message: "Kitchen cleaning completed successfully. Please review.",
      time: "Yesterday",
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
        return null;
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
        return "";
    }
  };

  return (
    <main className={styles.dashboard}>
      {/* Welcome */}
      <div className={styles.welcomeSection}>
        <div className={styles.welcomeContent}>
          <div className={styles.welcomeText}>
            <h1 className={styles.welcomeTitle}>Welcome back, John! 👋</h1>
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
            <button className={styles.secondaryButton}>
              <Send className={styles.icon} />
              <span>Send Message</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        {stats.map((stat, i) => (
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
              <span className={styles.statChange}>{stat.change}</span>
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
            {recentBookings.map((booking) => (
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
            ))}
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
