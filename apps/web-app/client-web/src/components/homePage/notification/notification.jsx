import { useState } from "react";
import { Check, Clock, Sparkles, Percent, X, Bell } from "lucide-react";
import styles from "./notification.module.css";

const NotificationUI = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "confirmation",
      title: "Booking Confirmed",
      description:
        "Your deep cleaning service is scheduled for tomorrow at 2:00 PM",
      timestamp: "2 minutes ago",
      isRead: false,
    },
    {
      id: 2,
      type: "service",
      title: "Service Update",
      description: "Our team is on the way and will arrive in 15 minutes",
      timestamp: "1 hour ago",
      isRead: false,
    },
    {
      id: 3,
      type: "reminder",
      title: "Upcoming Service",
      description:
        "Don't forget about your weekly cleaning tomorrow at 10:00 AM",
      timestamp: "3 hours ago",
      isRead: true,
    },
    {
      id: 4,
      type: "promotion",
      title: "Special Offer",
      description:
        "Get 20% off your next deep cleaning service this weekend only",
      timestamp: "1 day ago",
      isRead: false,
    },
    {
      id: 5,
      type: "confirmation",
      title: "Payment Processed",
      description: "Your payment of $85 has been successfully processed",
      timestamp: "2 days ago",
      isRead: true,
    },
  ]);

  const getNotificationIcon = (type) => {
    const iconProps = { size: 20, strokeWidth: 2 };
    switch (type) {
      case "confirmation":
        return <Check {...iconProps} className={styles.iconConfirmation} />;
      case "reminder":
        return <Clock {...iconProps} className={styles.iconReminder} />;
      case "service":
        return <Sparkles {...iconProps} className={styles.iconService} />;
      case "promotion":
        return <Percent {...iconProps} className={styles.iconPromotion} />;
      default:
        return <Bell {...iconProps} className={styles.iconDefault} />;
    }
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const dismissNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div
      className={`${styles.container} ${
        isDarkMode ? styles.darkMode : styles.lightMode
      }`}
    >
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerIcon}>
              <Bell className={styles.bellIcon} />
            </div>
            <div>
              <h1 className={styles.title}>Notifications</h1>
              <p className={styles.subtitle}>{unreadCount} unread messages</p>
            </div>
          </div>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={styles.themeToggle}
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Notifications List */}
        <div className={styles.notificationsList}>
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`${styles.notificationCard} ${
                !notification.isRead ? styles.unread : ""
              }`}
            >
              {/* Unread Indicator */}
              {!notification.isRead && (
                <div className={styles.unreadIndicator}></div>
              )}

              <div className={styles.cardContent}>
                {/* Icon */}
                <div className={styles.iconContainer}>
                  {getNotificationIcon(notification.type)}
                </div>

                {/* Content */}
                <div className={styles.textContent}>
                  <div className={styles.titleRow}>
                    <h3
                      className={`${styles.notificationTitle} ${
                        !notification.isRead ? styles.unreadTitle : ""
                      }`}
                    >
                      {notification.title}
                    </h3>
                  </div>

                  <p
                    className={`${styles.description} ${
                      !notification.isRead ? styles.unreadDescription : ""
                    }`}
                  >
                    {notification.description}
                  </p>

                  <div className={styles.footer}>
                    <span className={styles.timestamp}>
                      {notification.timestamp}
                    </span>

                    <div className={styles.actions}>
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className={styles.markReadButton}
                        >
                          Mark as read
                        </button>
                      )}

                      <button
                        onClick={() => dismissNotification(notification.id)}
                        className={styles.dismissButton}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {notifications.length === 0 && (
          <div className={styles.emptyState}>
            <Bell className={styles.emptyIcon} />
            <p className={styles.emptyTitle}>All caught up!</p>
            <p className={styles.emptySubtitle}>
              No new notifications at the moment.
            </p>
          </div>
        )}

        {/* SMARTsafi Branding */}
        <div className={styles.branding}>
          <div className={styles.brandingCard}>
            <Sparkles className={styles.brandIcon} />
            <span className={styles.brandName}>SMARTsafi</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationUI;
