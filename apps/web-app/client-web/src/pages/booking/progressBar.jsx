import { useBooking } from "../../utilites/bookingContext";
import styles from "./booking.module.css";

const steps = ["Service Details", "Location", "Date & Time", "Payment"];

const ProgressBar = () => {
  const { current } = useBooking(); // Assuming current is a number from 0 to 3

  return (
    <div className={styles.progressSection}>
      <div className={styles.progressContent}>
        <div className={styles.progressHeader}>
          <h1 className={styles.progressTitle}>Service Details</h1>
          <p className={styles.progressSubtitle}>Premium Deep Cleaning</p>
        </div>

        <div className={styles.progressBar}>
          {steps.map((label, index) => (
            <div key={index} className={styles.progressStep}>
              <div
                className={`${styles.stepCircle} ${
                  current >= index ? styles.stepActive : ""
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`${styles.stepLabel} ${
                  current >= index ? styles.stepLabelActive : ""
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { ProgressBar };
