import "./paymentSuccessful.css";

const ConfirmationPage = () => {
  const downloadReceipt = () => {
    console.log("Downloading receipt...");
    // logic to download receipt here
  };

  const contactCleaner = () => {
    console.log("Contacting cleaner...");
    // logic to contact cleaner here
  };

  return (
    <div class="confirmation-container">
      <div class="floating-elements">
        <div class="floating-circle"></div>
        <div class="floating-circle"></div>
        <div class="floating-circle"></div>
      </div>

      <div class="success-icon">
        <span class="checkmark">✓</span>
      </div>

      <h1 class="title">Cleaning Booked!</h1>
      <p class="subtitle">Your home cleaning service has been confirmed</p>

      <div class="booking-details">
        <div class="detail-row">
          <span class="detail-label">Service ID</span>
          <span class="detail-value">#CL789123</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Service Type</span>
          <span class="detail-value">Deep Cleaning Service</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Scheduled Date</span>
          <span class="detail-value">July 15, 2025</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Time Slot</span>
          <span class="detail-value">2:00 PM - 5:00 PM</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Property Size</span>
          <span class="detail-value">3 Bedroom Apartment</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Total Amount</span>
          <span class="detail-value total-amount">$180.00</span>
        </div>
      </div>

      <div class="action-buttons">
        <button class="btn btn-primary" onclick="downloadReceipt()">
          Download Receipt
        </button>
        <button class="btn btn-secondary" onclick="contactCleaner()">
          Contact Cleaner
        </button>
      </div>
    </div>
  );
};

export { ConfirmationPage };
