import { useBooking } from "../../utilites/bookingContext";
import styles from "./booking.module.css";

const ProgressBar = ({ steps, currentStep }) => {
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
                  currentStep >= index ? styles.stepActive : ""
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`${styles.stepLabel} ${
                  currentStep >= index ? styles.stepLabelActive : ""
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
