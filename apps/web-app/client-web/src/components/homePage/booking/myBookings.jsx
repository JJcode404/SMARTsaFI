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
import { useBookingData } from "../../../utilites/useBookingData";

const SkeletonCard = () => (
  <div className={styles.bookingCard}>
    <div className={styles.cardHeader}>
      <div className={styles.serviceInfo}>
        <div className={`${styles.serviceIcon} ${styles.skeleton}`}></div>
        <div>
          <div className={`${styles.skeleton} ${styles.skeletonTitle}`}></div>
          <div className={styles.propertyInfo}>
            <div className={`${styles.skeleton} ${styles.skeletonIcon}`}></div>
            <div
              className={`${styles.skeleton} ${styles.skeletonProperty}`}
            ></div>
          </div>
        </div>
      </div>
      <div
        className={`${styles.statusBadge} ${styles.skeleton} ${styles.skeletonStatus}`}
      ></div>
    </div>

    <div className={styles.cardDetail}>
      <div className={`${styles.skeleton} ${styles.skeletonIcon}`}></div>
      <div className={`${styles.skeleton} ${styles.skeletonText}`}></div>
    </div>

    <div className={styles.cardDetail}>
      <div className={`${styles.skeleton} ${styles.skeletonIcon}`}></div>
      <div className={`${styles.skeleton} ${styles.skeletonText}`}></div>
    </div>

    <div className={styles.cardDetail}>
      <div className={`${styles.skeleton} ${styles.skeletonPrice}`}></div>
    </div>

    <div className={styles.cardActions}>
      <div
        className={`${styles.actionButton} ${styles.skeleton} ${styles.skeletonButton}`}
      ></div>
      <div
        className={`${styles.actionButton} ${styles.skeleton} ${styles.skeletonButton}`}
      ></div>
    </div>
  </div>
);

const SkeletonTabs = () => (
  <div className={styles.tabContainer}>
    <div className={styles.maxWidth}>
      <div className={styles.tabNavigation}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`${styles.tab} ${styles.skeleton} ${styles.skeletonTab}`}
          ></div>
        ))}
      </div>
    </div>
  </div>
);

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const { data, loading, error } = useBookingData();

  const mapBookingData = (booking) => {
    const services = booking.booked_services || [];
    let serviceType = "Service";
    let property = "N/A";

    if (services.length > 0) {
      const firstService = services[0].feature_option;
      serviceType = firstService?.feature?.title || "Service";
      property = firstService?.area_type || "N/A";

      if (services.length > 1) {
        serviceType += ` (+${services.length - 1} more)`;
      }
    }

    const location =
      booking.client.organization_name ||
      `${booking.client.first_name} ${booking.client.last_name}`;

    return {
      id: booking.id,
      serviceType,
      property,
      location,
      date: new Date(booking.appointment_datetime).toLocaleDateString(),
      time: new Date(booking.appointment_datetime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      cleaner: booking.worker
        ? `${booking.worker.first_name} ${booking.worker.last_name}`
        : null,
      status: booking.status,
      rated: booking.rating !== null,
      reason: booking.reason || null,
      totalPrice: booking.total_price,
      depositPaid: booking.deposit_paid,
    };
  };

  const upcomingBookings = (data || [])
    .filter((b) => ["scheduled", "pending"].includes(b.status.toLowerCase()))
    .map(mapBookingData);

  const pastBookings = (data || [])
    .filter((b) => b.status.toLowerCase() === "completed")
    .map(mapBookingData);

  const canceledBookings = (data || [])
    .filter((b) => ["canceled", "cancelled"].includes(b.status.toLowerCase()))
    .map(mapBookingData);

  const tabs = [
    { id: "upcoming", label: "Upcoming", count: upcomingBookings.length },
    { id: "past", label: "Past", count: pastBookings.length },
    { id: "canceled", label: "Canceled", count: canceledBookings.length },
  ];

  const getCurrentBookings = () => {
    switch (activeTab) {
      case "past":
        return pastBookings;
      case "canceled":
        return canceledBookings;
      default:
        return upcomingBookings;
    }
  };

  const getServiceIcon = (serviceType) => {
    const lowerType = serviceType.toLowerCase();
    if (lowerType.includes("deep") || lowerType.includes("institution")) {
      return (
        <Home className={`${styles.serviceIcon} ${styles.serviceIconBlue}`} />
      );
    }
    if (
      lowerType.includes("regular") ||
      lowerType.includes("washing") ||
      lowerType.includes("laundry")
    ) {
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
      case "cancelled":
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
                {booking.property} - {booking.location}
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

      <div className={styles.cardDetail}>
        <span className={styles.priceInfo}>
          Total: KSh {booking.totalPrice?.toLocaleString()}
          {booking.depositPaid > 0 && (
            <span className={styles.depositInfo}>
              {" "}
              (Deposit: KSh {booking.depositPaid?.toLocaleString()})
            </span>
          )}
        </span>
      </div>

      {type === "canceled" && booking.reason && (
        <div className={`${styles.cardDetail} ${styles.cancelReason}`}>
          <Ban />
          <span>{booking.reason}</span>
        </div>
      )}

      <div className={styles.cardActions}>
        {type === "upcoming" && (
          <>
            <button
              className={`${styles.actionButton} ${styles.buttonPrimary}`}
            >
              <CalendarClock />
              <span>Reschedule</span>
            </button>
            <button
              className={`${styles.actionButton} ${styles.buttonSecondary}`}
            >
              <Ban />
              <span>Cancel</span>
            </button>
          </>
        )}

        {type === "past" && (
          <>
            {!booking.rated && (
              <button
                className={`${styles.actionButton} ${styles.buttonYellow}`}
              >
                <Star />
                <span>Rate Service</span>
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

        {type === "canceled" && (
          <button className={`${styles.actionButton} ${styles.buttonPrimary}`}>
            <RotateCcw />
            <span>Rebook</span>
          </button>
        )}
      </div>
    </div>
  );

  if (loading) {
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

        <SkeletonTabs />

        <div className={`${styles.maxWidth} ${styles.content}`}>
          <div className={styles.bookingsList}>
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

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
            <p className={styles.emptyText}>
              {activeTab === "upcoming"
                ? "You don't have any upcoming bookings."
                : activeTab === "past"
                ? "You don't have any past bookings."
                : "You don't have any canceled bookings."}
            </p>
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
