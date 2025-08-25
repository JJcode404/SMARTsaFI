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
import { useAllBookingsData } from "../../../utilites/useAllBookingsData";

// ================== API service functions ==================
const bookingAPI = {
  // --- Bookings ---
  cancelBooking: async (id) => {
    return updateEndpoint(`/bookings/${id}`, { status: "canceled" });
  },
  rebookBooking: async (id) => {
    return updateEndpoint(`/bookings/${id}`, { status: "pending" });
  },
  rescheduleBooking: async (id, newDateTime) => {
    return updateEndpoint(`/bookings/${id}`, {
      appointment_datetime: newDateTime,
      status: "pending",
    });
  },

  // --- Requests ---
  cancelRequest: async (id) => {
    return updateEndpoint(`/bookings/requests/${id}`, { status: "canceled" });
  },
  rebookRequest: async (id) => {
    return updateEndpoint(`/bookings/requests/${id}`, { status: "pending" });
  },
  rescheduleRequest: async (id, newDateTime) => {
    return updateEndpoint(`/bookings/requests/${id}`, {
      appointment_date: newDateTime,
      status: "pending",
    });
  },
};

async function updateEndpoint(url, body) {
  try {
    const response = await fetch(`http://127.0.0.1:8000${url}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(`Failed to update ${url}`);
    return await response.json();
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
}
// ================== Reschedule Modal ==================
const RescheduleModal = ({ isOpen, onClose, onConfirm, booking }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    setLoading(true);
    try {
      // build datetime in local time then convert to UTC ISO
      const localDateTime = new Date(`${selectedDate}T${selectedTime}:00`);
      const newDateTime = localDateTime.toISOString();

      await onConfirm(newDateTime);
      onClose();
    } catch {
      alert("Failed to reschedule booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Reschedule Booking</h3>
        <p>
          Current appointment: {booking?.date} at {booking?.time}
        </p>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>New Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>New Time:</label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              required
            />
          </div>
          <div className={styles.modalActions}>
            <button
              type="button"
              onClick={onClose}
              className={`${styles.actionButton} ${styles.buttonSecondary}`}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${styles.actionButton} ${styles.buttonPrimary}`}
              disabled={loading}
            >
              {loading ? "Rescheduling..." : "Confirm Reschedule"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ================== Confirmation Modal ==================
const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  loading,
}) => {
  if (!isOpen) return null;
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className={styles.modalActions}>
          <button
            onClick={onClose}
            className={`${styles.actionButton} ${styles.buttonSecondary}`}
            disabled={loading}
          >
            No, Keep Booking
          </button>
          <button
            onClick={onConfirm}
            className={`${styles.actionButton} ${styles.buttonDanger}`}
            disabled={loading}
          >
            {loading ? "Canceling..." : "Yes, Cancel Booking"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ================== Main Component ==================
const MyBookings = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const { data, loading, error, refetch } = useAllBookingsData();

  // --- Map bookings/requests ---
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
    if (booking.source === "request") {
      serviceType = booking.feature.category.title || "my service test";
      property = booking.feature.title || "N/A";
      console.log("booking", booking.feature);
    }

    const location =
      booking.client?.organization_name ||
      `${booking.client?.first_name ?? ""} ${booking.client?.last_name ?? ""}`;

    // ✅ Pick the right datetime field depending on source
    const rawDateTime =
      booking.appointment_datetime || booking.appointment_date || null;

    const dateObj = rawDateTime ? new Date(rawDateTime) : null;

    return {
      id: booking.id,
      source: booking.source,
      serviceType,
      property,
      location,
      date: dateObj ? dateObj.toLocaleDateString() : "N/A",
      time: dateObj
        ? dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : "N/A",
      cleaner: booking.worker
        ? `${booking.worker.first_name} ${booking.worker.last_name}`
        : null,
      status: booking.status,
      rated: booking.rating !== null && booking.rating !== undefined,
      reason: booking.reason || null,
      totalPrice: booking.total_price,
      depositPaid: booking.deposit_paid,
      appointment_datetime: rawDateTime, // ✅ unified for updates
    };
  };

  // --- Actions ---
  const handleCancelBooking = async () => {
    if (!selectedBooking) return;
    setActionLoading(true);
    try {
      if (selectedBooking.source === "request") {
        await bookingAPI.cancelRequest(selectedBooking.id);
      } else {
        await bookingAPI.cancelBooking(selectedBooking.id);
      }

      data.forEach((b) => {
        if (b.id === selectedBooking.id) {
          b.status = "canceled";
        }
      });

      setActiveTab("canceled");
      await refetch();
      setShowCancelModal(false);
      setSelectedBooking(null);
      alert("Booking cancelled successfully!");
    } catch (error) {
      console.log("this is my error", error);
      alert("Failed to cancel. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRebookBooking = async () => {
    if (!selectedBooking) return;
    setActionLoading(true);
    try {
      if (selectedBooking.source === "request") {
        await bookingAPI.rebookRequest(selectedBooking.id);
      } else {
        await bookingAPI.rebookBooking(selectedBooking.id);
      }

      data.forEach((b) => {
        if (b.id === selectedBooking.id) {
          b.status = "pending";
        }
      });

      setActiveTab("upcoming");
      await refetch();
      setShowCancelModal(false);
      setSelectedBooking(null);
      alert("Rebooked successfully!");
    } catch (error) {
      alert("Failed to rebook. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRescheduleBooking = async (newDateTime) => {
    if (!selectedBooking) return;
    try {
      if (selectedBooking.source === "request") {
        await bookingAPI.rescheduleRequest(selectedBooking.id, newDateTime);
      } else {
        await bookingAPI.rescheduleBooking(selectedBooking.id, newDateTime);
      }

      data.forEach((b) => {
        if (b.id === selectedBooking.id) {
          b.status = "pending";
          b.appointment_datetime = newDateTime; // unified field
        }
      });

      setActiveTab("upcoming");
      await refetch();
      setSelectedBooking(null);
      alert("Rescheduled successfully!");
    } catch (error) {
      alert("Failed to reschedule. Please try again.");
    }
  };

  const openCancelModal = (booking) => {
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };
  const openRescheduleModal = (booking) => {
    setSelectedBooking(booking);
    setShowRescheduleModal(true);
  };

  // --- Data split ---
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

  // --- UI helpers ---
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

  // --- Booking card ---
  const BookingCard = ({ booking, type }) => (
    <div className={styles.bookingCard}>
      <div className={styles.cardHeader}>
        <div className={styles.serviceInfo}>
          {getServiceIcon(booking.serviceType)}
          <div>
            <h3 className={styles.serviceTitle}>
              {booking.serviceType}
              {booking.source === "request" && " (Request)"}
            </h3>
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

      {booking.source === "booking" && booking.totalPrice && (
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
      )}

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
              onClick={() => openRescheduleModal(booking)}
            >
              <CalendarClock />
              <span>Reschedule</span>
            </button>
            <button
              className={`${styles.actionButton} ${styles.buttonSecondary}`}
              onClick={() => openCancelModal(booking)}
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
          <button
            className={`${styles.actionButton} ${styles.buttonPrimary}`}
            onClick={() => {
              setSelectedBooking(booking);
              handleRebookBooking();
            }}
          >
            <RotateCcw />
            <span>Rebook</span>
          </button>
        )}
      </div>
    </div>
  );

  // --- Render ---
  if (loading) {
    return <p>Loading bookings...</p>;
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

      {/* Tabs */}
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

      {/* Bookings List */}
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
                key={`${booking.source}-${booking.id}`}
                booking={booking}
                type={activeTab}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <RescheduleModal
        isOpen={showRescheduleModal}
        onClose={() => setShowRescheduleModal(false)}
        onConfirm={handleRescheduleBooking}
        booking={selectedBooking}
      />
      <ConfirmationModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancelBooking}
        title="Cancel Booking"
        message={`Are you sure you want to cancel your ${selectedBooking?.serviceType} appointment on ${selectedBooking?.date} at ${selectedBooking?.time}?`}
        loading={actionLoading}
      />
    </div>
  );
};

export { MyBookings };
