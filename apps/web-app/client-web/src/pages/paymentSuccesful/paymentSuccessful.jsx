import { useBooking } from "../../utilites/bookingContext";
import jsPDF from "jspdf";
import "./paymentSuccessful.css";

const ConfirmationPage = () => {
  const { state } = useBooking();
  const { selectedDate, selectedTime, location, price, service, bedroomLabel } =
    state;

  const downloadReceipt = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("SMARTsaFI Cleaning Service Receipt", 20, 20);

    doc.setFontSize(12);
    doc.text("Service ID: #CL789123", 20, 40);
    doc.text(`Service Type: ${service}`, 20, 50);
    doc.text(`Scheduled Date: ${formatDate(selectedDate)}`, 20, 60);
    doc.text(`Scheduled Time : ${selectedTime}`, 20, 70);
    doc.text(`Location: ${location}`, 20, 80);
    doc.text(`Total Amount: ksh ${price}`, 20, 90);

    doc.save("cleaning-receipt.pdf");
  };

  const contactCleaner = () => {
    console.log("Contacting cleaner...");
    // Implement real logic here
  };

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
        <span className="checkmark">✓</span>
      </div>

      <h1 className="title">Cleaning Booked!</h1>
      <p className="subtitle">Your home cleaning service has been confirmed</p>

      <div className="booking-details">
        <div className="detail-row">
          <span className="detail-label">Service ID</span>
          <span className="detail-value">#CL789123</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Service Type</span>
          <span className="detail-value">{service}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Scheduled Date</span>
          <span className="detail-value">
            {selectedDate ? formatDate(selectedDate) : "Not set"}
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Scheduled Time</span>
          <span className="detail-value">
            {selectedTime ? `${selectedTime}` : "Not set"}
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Property Size</span>
          <span className="detail-value"> {bedroomLabel}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Location</span>
          <span className="detail-value">
            {typeof location === "string" ? location : "Not set"}
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Total Amount</span>
          <span className="detail-value total-amount">ksh {price}</span>
        </div>
      </div>

      <div className="action-buttons">
        <button className="btn btn-primary" onClick={downloadReceipt}>
          Download Receipt
        </button>
        <button className="btn btn-secondary" onClick={contactCleaner}>
          Contact Cleaner
        </button>
      </div>
    </div>
  );
};

export { ConfirmationPage };
