import { useBooking } from "../../utilites/bookingContext";
import styles from "./booking.module.css";

const steps = [
  { full: "Service Details", short: "Service" },
  { full: "Location", short: "Location" },
  { full: "Date & Time", short: "Date" },
  { full: "Service Provider", short: "Provider" },
  { full: "Payment", short: "Payment" },
];

const ProgressBar = () => {
  const { state } = useBooking();

  // Function to determine if we should show short labels
  const useShortLabels = () => {
    return window.innerWidth <= 768;
  };

  return (
    <div className={styles.progressSection}>
      <div className={styles.progressContent}>
        <div className={styles.progressHeader}>
          <h1 className={styles.progressTitle}>Service Details</h1>
          <p className={styles.progressSubtitle}>Premium Deep Cleaning</p>
        </div>

        <div className={styles.progressBar}>
          {steps.map((step, index) => (
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
                <span className={styles.stepLabelFull}>{step.full}</span>
                <span className={styles.stepLabelShort}>{step.short}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { ProgressBar };
