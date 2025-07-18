import { useState } from "react";
import { CheckCircle } from "lucide-react";
import styles from "./registrationSummary.module.css";
import { useClientRegistration } from "../../../utilites/clientRegistrationContext";

const RegistrationSummary = () => {
  const { state, verifyID, verifyTax } = useClientRegistration();
  const [selectedCards, setSelectedCards] = useState([]);

  const handleSelect = (index) => {
    if (index === 0) verifyID();
    if (index === 1) verifyTax();
    setSelectedCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const cards = [
    {
      title: "ID Verification",
      description: "Confirm your identity documents",
      verified: state.formData.verification_id,
    },
    {
      title: "Tax Verification",
      description: "Confirm your tax documents",
      verified: state.formData.verification_tax,
    },
  ];

  const { formData, files } = state;

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
          const isSelected = card.verified || selectedCards.includes(i);
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
          <span>{formData.client_type || "Not provided"}</span>
        </div>
        <div className={styles.row}>
          <span>Tax Number:</span>
          <span>{formData.tax_number || "Not provided"}</span>
        </div>
        <div className={styles.row}>
          <span>ID Proof:</span>
          <span>{files.national_id_proof.name || "None"}</span>
        </div>
        <div className={styles.row}>
          <span>Profile Picture:</span>
          <span>{files.profile_picture.name || "None"}</span>
        </div>
        <div className={styles.row}>
          <span>Tax Proof:</span>
          <span>{files.tax_document_proof.name || "None"}</span>
        </div>
        {formData.client_type === "Individual" && (
          <div className={styles.row}>
            <span>Full Name:</span>
            <span>
              {`${formData.first_name || ""} ${
                formData.last_name || ""
              }`.trim() || "Not provided"}
            </span>
          </div>
        )}
        {formData.client_type === "Organization" && (
          <div className={styles.row}>
            <span>Organization:</span>
            <span>{formData.organization_name || "Not provided"}</span>
          </div>
        )}
        <div className={styles.row}>
          <span>Phone:</span>
          <span>{formData.phone_number || "Not provided"}</span>
        </div>
      </div>
    </div>
  );
};

export { RegistrationSummary };
