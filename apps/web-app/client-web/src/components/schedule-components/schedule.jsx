import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // default styling
import { Video } from "lucide-react";
import styles from "./schedule.module.css";
import { useBooking } from "../../utilites/bookingContext";

const ScheduleService = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const { handleNext } = useBooking();

  const times = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
  ];

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Schedule your service</h1>
      <p className={styles.subheading}>
        Summarize what's great about your service. To edit a service's subtitle,
        click Manage Services and select a service.
      </p>

      <div className={styles.filters}>
        <div className={styles.filtertext}>Filter by:</div>
        <div className={styles.selectdiv}>
          <select className={styles.select}>
            <option>Location (All)</option>
          </select>
          <select className={styles.select}>
            <option>Staff Member (All)</option>
          </select>
        </div>
      </div>

      <div className={styles.grid}>
        {/* Calendar Section */}

        <div className={styles.rightgrid}>
          <div className={styles.top}>
            <h2 className={styles.sectionTitle}>Select a Date and Time</h2>
            <div className={styles.dateHeader}>
              <span className={styles.dateTimeZone}>
                Time zone: East Africa Time (GMT+3)--
              </span>
            </div>
          </div>
          <hr />
          <div className={styles.calenderTime}>
            <div className={styles.calendarWrapper}>
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                className={styles.reactCalendar}
              />
            </div>
            <div className="left">
              <p className={styles.availability}>
                Availability for {formatDate(selectedDate)}
              </p>
              <div className={styles.timeGrid}>
                {times.map((time) => (
                  <button
                    key={time}
                    className={`${styles.timeSlot} ${
                      selectedTime === time ? styles.timeSlotSelected : ""
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Time Slots */}
        {/* <div>
          <p className={styles.availability}>
            Availability for {formatDate(selectedDate)}
          </p>
          <div className={styles.timeGrid}>
            {times.map((time) => (
              <button
                key={time}
                className={`${styles.timeSlot} ${
                  selectedTime === time ? styles.timeSlotSelected : ""
                }`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div> */}

        {/* Service Details */}
        <div className={styles.serviceDetails}>
          <h2 className={styles.sectionTitle}>Service Details</h2>
          <hr />
          <div className={styles.details}>
            <div className={styles.availabilityBadge}>
              <Video /> Available Online
            </div>
            <ul className={styles.serviceList}>
              <li>Service Name</li>
              <li>Location</li>
              <li>Staff Member</li>
              <li>Duration</li>
              <li>Price</li>
            </ul>
            <button className={styles.nextButton} onClick={() => handleNext()}>
              Next
            </button>
          </div>
        </div>
      </div>

      <div className={styles.showAllWrapper}>
        <button className={styles.showAllButton}>Show all sessions</button>
      </div>
    </div>
  );
};

export { ScheduleService };
