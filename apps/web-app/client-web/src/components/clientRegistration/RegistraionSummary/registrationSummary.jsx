import { useState } from "react";
import { CheckCircle } from "lucide-react";
import styles from "./registrationSummary.module.css";

const RegistrationSummary = () => {
  const [selectedCards, setSelectedCards] = useState([]);

  const handleSelect = (index) => {
    setSelectedCards(
      (prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index) // unselect
          : [...prev, index] // select
    );
  };

  const cards = [
    {
      title: "ID Verification",
      description: "Confirm your identity documents",
    },
    {
      title: "Tax Verification",
      description: "Confirm your tax documents",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          <CheckCircle className={styles.headerIcon} />
          <div className={styles.intro}>
            <h1 className={styles.title}>Verification</h1>
            <p className={styles.subtitle}>Review and confirm your details</p>
          </div>
        </div>
        <p className={styles.startText}>Finalize your registration!</p>
      </div>

      <div className={styles.cardContainer}>
        {cards.map((card, i) => {
          const isSelected = selectedCards.includes(i);
          return (
            <div
              key={i}
              className={`${styles.card} ${isSelected ? styles.selected : ""}`}
              onClick={() => handleSelect(i)}
            >
              <div className={styles.radio}>
                {isSelected && <CheckCircle className={styles.tickIcon} />}
              </div>
              <div>
                <h4 className={styles.cardTitle}>{card.title}</h4>
                <p className={styles.cardText}>{card.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.summary}>
        <h4 className={styles.summaryTitle}>Registration Summary</h4>
        <div className={styles.row}>
          <span>Registration Type:</span>
          <span>Organization</span>
        </div>
        <div className={styles.row}>
          <span>Tax Number:</span>
          <span>8904854389054</span>
        </div>
        <div className={styles.row}>
          <span>ID Proof:</span>
          <span>None</span>
        </div>
        <div className={styles.row}>
          <span>Profile Picture:</span>
          <span>None</span>
        </div>
        <div className={styles.row}>
          <span>Organization:</span>
          <span>kdfhkdfhksdfjkds</span>
        </div>
        <div className={styles.row}>
          <span>Phone:</span>
          <span>0715369733</span>
        </div>
        <div className={styles.row}>
          <span>Tax Proof:</span>
          <span>None</span>
        </div>
      </div>
    </div>
  );
};

export { RegistrationSummary };
