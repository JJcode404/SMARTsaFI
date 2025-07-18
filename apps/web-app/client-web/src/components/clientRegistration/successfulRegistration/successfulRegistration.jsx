import { useClientRegistration } from "../../../utilites/clientRegistrationContext";
import "./successfulRegistration.css";
import { Hourglass } from "lucide-react";

const SuccessfulRegistrationPage = () => {
  const { state } = useClientRegistration();
  const address = state.formData.address;
  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

  return (
    <div className="confirmation-container">
      <div className="floating-elements">
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
      </div>

      <div className="success-icon">
        <span className="checkmark">
          <Hourglass />
        </span>
      </div>

      <h1 className="title">Registration Complete!</h1>
      <p className="subtitle">
        Your cleaning service customer account has been created and your
        documents are being reviewed.
      </p>

      <div className="info-card">
        <div className="info-row">
          <span className="info-label">Account Status:</span>
          <span className="info-value">Pending Verification</span>
        </div>
        <div className="info-row">
          <span className="info-label">Document Status:</span>
          <span className="document-status">Under Review</span>
        </div>
        <div className="info-row">
          <span className="info-label">Service Location:</span>
          <span className="info-value">{address}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Registration Date:</span>
          <span className="info-value">{formatDate(new Date())}</span>
        </div>
      </div>

      <div className="next-steps">
        <h3>What Happens Next?</h3>
        <ul className="steps-list">
          <li>Our team will review your documents within 24-48 hours</li>
          <li>You'll receive an email notification once verified</li>
          <li>Browse and book cleaning services once approved</li>
          <li>Enjoy hassle-free professional cleaning!</li>
        </ul>
      </div>

      <div className="action-buttons">
        <button className="btn btn-primary">Browse Services</button>
        <button className="btn btn-secondary">My Profile</button>
      </div>
    </div>
  );
};

export { SuccessfulRegistrationPage };
