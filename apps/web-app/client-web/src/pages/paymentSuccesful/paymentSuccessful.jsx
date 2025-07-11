import { useBooking } from "../../utilites/bookingContext";
import jsPDF from "jspdf";
import "./paymentSuccessful.css";

const ConfirmationPage = () => {
  const { state } = useBooking();
  const { selectedDate, selectedTime, location, price, service, bedroomLabel } =
    state;

  const downloadReceipt = () => {
    const doc = new jsPDF();
    const lineSpacing = 10;
    let y = 10; // Reduced top spacing

    const img = new Image();
    img.src = "/smart-safi.png"; // PNG image in public folder

    img.onload = () => {
      const pageWidth = doc.internal.pageSize.getWidth();

      // Maintain image aspect ratio (original: 626x512)
      const imgWidth = 60;
      const imgHeight = imgWidth * (512 / 626);
      const imgX = (pageWidth - imgWidth) / 2;
      doc.addImage(img, "PNG", imgX, y, imgWidth, imgHeight);

      // Move below image
      y += imgHeight + 10;

      // Company Title
      const title = "SMARTsaFI Cleaning Services Receipt";
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      const textWidth = doc.getTextWidth(title);
      const textX = (pageWidth - textWidth) / 2;
      doc.text(title, textX, y);

      y += 20;
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");

      // Details
      doc.text(`Service ID: #CL789123`, 20, y);
      y += lineSpacing;
      doc.text(`Service Type: ${service}`, 20, y);
      y += lineSpacing;
      doc.text(`Scheduled Date: ${formatDate(selectedDate)}`, 20, y);
      y += lineSpacing;
      doc.text(`Scheduled Time: ${selectedTime || "Not set"}`, 20, y);
      y += lineSpacing;
      doc.text(`Property Size: ${bedroomLabel}`, 20, y);
      y += lineSpacing;
      doc.text(`Location: ${location}`, 20, y);
      y += lineSpacing;

      doc.setFont("helvetica", "bold");
      doc.text(`Total Amount: KSH ${price}`, 20, y);
      y += 30;
      doc.setFont("helvetica", "normal");

      // Footer
      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text(
        "Thank you for booking with SMARTsaFI. Your home is in safe hands.",
        20,
        y
      );
      y += lineSpacing;
      doc.text(
        "For queries, contact us via info@smartsaFI.com or 0700-123-456",
        20,
        y
      );

      doc.save("SMARTsaFI-Receipt.pdf");
    };
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
