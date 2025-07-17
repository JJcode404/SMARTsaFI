import { Check, ChevronRight } from "lucide-react";
import { useClientRegistration } from "../../../utilites/clientRegistrationContext";
import styles from "./pagination.module.css";

export default function PaginationButtons() {
  const { state, nextStep, prevStep } = useClientRegistration();
  const isLastStep = state.current === 3;

  return (
    <div className={styles.footer}>
      <button className={styles.backButton} onClick={prevStep}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </button>

      {isLastStep ? (
        <button type="submit" className={styles.completeButton}>
          <Check size={20} />
          <span>Complete Registration</span>
        </button>
      ) : (
        <button type="button" className={styles.nextButton} onClick={nextStep}>
          <span>Next</span>
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
}
