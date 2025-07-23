import React, { useState } from "react";
import {
  Calendar,
  CalendarClock,
  Home,
  User,
  Star,
  RotateCcw,
  Ban,
  MapPin,
  Clock,
} from "lucide-react";
import styles from "./myBookings.module.css";

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const upcomingBookings = [
    {
      id: 1,
      serviceType: "Deep Cleaning",
      property: "2-bedroom Apartment",
      location: "Westlands",
      date: "Tomorrow",
      time: "10:00 AM",
      cleaner: "Sarah Kimani",
      status: "Scheduled",
    },
    {
      id: 2,
      serviceType: "Regular Cleaning",
      property: "3-bedroom House",
      location: "Karen",
      date: "July 25, 2025",
      time: "2:00 PM",
      cleaner: "John Mwangi",
      status: "Scheduled",
    },
    {
      id: 3,
      serviceType: "Move-out Cleaning",
      property: "Studio Apartment",
      location: "Kilimani",
      date: "July 28, 2025",
      time: "9:00 AM",
      cleaner: null,
      status: "Pending",
    },
  ];

  const pastBookings = [
    {
      id: 4,
      serviceType: "Deep Cleaning",
      property: "2-bedroom Apartment",
      location: "Westlands",
      date: "July 15, 2025",
      time: "10:00 AM",
      cleaner: "Mary Wanjiku",
      status: "Completed",
      rated: false,
    },
    {
      id: 5,
      serviceType: "Regular Cleaning",
      property: "1-bedroom Apartment",
      location: "CBD",
      date: "July 10, 2025",
      time: "3:00 PM",
      cleaner: "Peter Ochieng",
      status: "Completed",
      rated: true,
    },
  ];

  const canceledBookings = [
    {
      id: 6,
      serviceType: "Regular Cleaning",
      property: "2-bedroom Apartment",
      location: "Westlands",
      date: "July 12, 2025",
      time: "11:00 AM",
      reason: "Rescheduled by customer",
      status: "Canceled",
    },
  ];

  const getServiceIcon = (serviceType) => {
    if (serviceType.includes("Deep")) {
      return (
        <Home className={`${styles.serviceIcon} ${styles.serviceIconBlue}`} />
      );
    }
    if (serviceType.includes("Regular")) {
      return (
        <RotateCcw
          className={`${styles.serviceIcon} ${styles.serviceIconGreen}`}
        />
      );
    }
    return (
      <Calendar
        className={`${styles.serviceIcon} ${styles.serviceIconPurple}`}
      />
    );
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "scheduled":
        return styles.statusScheduled;
      case "pending":
        return styles.statusPending;
      case "completed":
        return styles.statusCompleted;
      case "canceled":
        return styles.statusCanceled;
      default:
        return "";
    }
  };

  const BookingCard = ({ booking, type }) => (
    <div className={styles.bookingCard}>
      <div className={styles.cardHeader}>
        <div className={styles.serviceInfo}>
          {getServiceIcon(booking.serviceType)}
          <div>
            <h3 className={styles.serviceTitle}>{booking.serviceType}</h3>
            <div className={styles.propertyInfo}>
              <MapPin />
              <span>
                {booking.property}, {booking.location}
              </span>
            </div>
          </div>
        </div>
        <span
          className={`${styles.statusBadge} ${getStatusClass(booking.status)}`}
        >
          {booking.status}
        </span>
      </div>

      <div className={styles.cardDetail}>
        <Clock />
        <span>
          {booking.date} at {booking.time}
        </span>
      </div>

      {booking.cleaner && (
        <div className={styles.cardDetail}>
          <User />
          <span>Assigned to {booking.cleaner}</span>
        </div>
      )}

      {type === "canceled" && booking.reason && (
        <div className={`${styles.cardDetail} ${styles.cancelReason}`}>
          <Ban />
          <span>{booking.reason}</span>
        </div>
      )}

      <div className={styles.cardActions}>
        {type === "upcoming" && (
          <button className={`${styles.actionButton} ${styles.buttonPrimary}`}>
            <CalendarClock />
            <span>Reschedule</span>
          </button>
        )}

        {type === "past" && (
          <>
            {!booking.rated && (
              <button
                className={`${styles.actionButton} ${styles.buttonYellow}`}
              >
                <Star />
                <span>Rate Cleaner</span>
              </button>
            )}
            <button
              className={`${styles.actionButton} ${styles.buttonSecondary}`}
            >
              <RotateCcw />
              <span>Rebook</span>
            </button>
          </>
        )}
      </div>
    </div>
  );

  const tabs = [
    { id: "upcoming", label: "Upcoming", count: upcomingBookings.length },
    { id: "past", label: "Past", count: pastBookings.length },
    { id: "canceled", label: "Canceled", count: canceledBookings.length },
  ];

  const getCurrentBookings = () => {
    switch (activeTab) {
      case "upcoming":
        return upcomingBookings;
      case "past":
        return pastBookings;
      case "canceled":
        return canceledBookings;
      default:
        return upcomingBookings;
    }
  };

  const getEmptyMessage = () => {
    switch (activeTab) {
      case "upcoming":
        return "You don't have any upcoming bookings.";
      case "past":
        return "You don't have any past bookings.";
      case "canceled":
        return "You don't have any canceled bookings.";
      default:
        return "";
    }
  };

  return (
    <div className={styles.container}>
      <div className="progressSection">
        <div className="progressContent">
          <div className="progressHeader">
            <h1 className="progressTitle">My Bookings</h1>
            <p className="progressSubtitle">
              Manage your cleaning appointments
            </p>
          </div>
        </div>
      </div>
      <div className={styles.tabContainer}>
        <div className={styles.maxWidth}>
          <div className={styles.tabNavigation}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${styles.tab} ${
                  activeTab === tab.id ? styles.tabActive : styles.tabInactive
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`${styles.tabBadge} ${
                    activeTab === tab.id
                      ? styles.tabBadgeActive
                      : styles.tabBadgeInactive
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`${styles.maxWidth} ${styles.content}`}>
        {getCurrentBookings().length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Calendar />
            </div>
            <h3 className={styles.emptyTitle}>No bookings found</h3>
            <p className={styles.emptyText}>{getEmptyMessage()}</p>
          </div>
        ) : (
          <div className={styles.bookingsList}>
            {getCurrentBookings().map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                type={activeTab}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { MyBookings };
