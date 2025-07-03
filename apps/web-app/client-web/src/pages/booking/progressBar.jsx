import { useBooking } from "../../utilites/bookingContext";
import styles from "./booking.module.css";

const steps = ["Service Details", "Location", "Date & Time", "Payment"];

const ProgressBar = () => {
  const { state } = useBooking();

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
                  state.current >= index ? styles.stepActive : ""
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`${styles.stepLabel} ${
                  state.current >= index ? styles.stepLabelActive : ""
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
