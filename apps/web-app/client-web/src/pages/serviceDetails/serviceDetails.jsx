// CleaningServiceUI.jsx
import React, { useState } from "react";
import { ChevronDown, Plus, Minus, User, Menu, ArrowLeft } from "lucide-react";
import styles from "./serviceDetails.module.css";

const ServiceDetails = () => {
  const [propertyType, setPropertyType] = useState("Apartment");
  const [furnishing, setFurnishing] = useState("Furnished");
  const [roomCounts, setRoomCounts] = useState({
    studio: 0,
    oneBedroom: 0,
    twoBedroom: 0,
    threeBedroom: 0,
    fourBedroom: 0,
    fiveBedroom: 0,
  });
  const [showPaymentDetails, setShowPaymentDetails] = useState(true);
  const [showServiceDetails, setShowServiceDetails] = useState(false);

  const updateRoomCount = (roomType, increment) => {
    setRoomCounts((prev) => {
      const newCount = Math.max(0, prev[roomType] + (increment ? 1 : -1));

      return {
        studio: 0,
        oneBedroom: 0,
        twoBedroom: 0,
        threeBedroom: 0,
        fourBedroom: 0,
        fiveBedroom: 0,
        [roomType]: newCount,
      };
    });
  };

  const basePrice = 3000;
  const additionalRoomPrice = 500;
  const totalRooms = Object.values(roomCounts).reduce(
    (sum, count) => sum + count,
    0
  );
  const totalPrice = basePrice + totalRooms * additionalRoomPrice;

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <a href="#" className={styles.backButton}>
          {/* <Link to={"/"}> */}
          <span className={styles.backArrow}>
            <ArrowLeft />
          </span>
          {/* </Link> */}
          <span className={styles.brandName}>
            SMART <span className={styles.small}>sa</span>FI
          </span>
        </a>
      </header>

      {/* Progress Bar */}
      <div className={styles.progressSection}>
        <div className={styles.progressContent}>
          <div className={styles.progressHeader}>
            <h1 className={styles.progressTitle}>Service Details</h1>
            <p className={styles.progressSubtitle}>Premium Deep Cleaning</p>
          </div>

          <div className={styles.progressBar}>
            <div className={styles.progressStep}>
              <div className={`${styles.stepCircle} ${styles.stepActive}`}>
                1
              </div>
              <span className={`${styles.stepLabel} ${styles.stepLabelActive}`}>
                Service Details
              </span>
            </div>
            {/* <div className={styles.stepConnector}></div> */}
            <div className={styles.progressStep}>
              <div className={styles.stepCircle}>2</div>
              <span className={styles.stepLabel}>Location</span>
            </div>
            {/* <div className={styles.stepConnector}></div> */}
            <div className={styles.progressStep}>
              <div className={styles.stepCircle}>3</div>
              <span className={styles.stepLabel}>Date & Time</span>
            </div>
            {/* <div className={styles.stepConnector}></div> */}
            <div className={styles.progressStep}>
              <div className={styles.stepCircle}>4</div>
              <span className={styles.stepLabel}>Payment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.contentGrid}>
          {/* Left Column - Service Details */}
          <div className={styles.leftColumn}>
            <div className={styles.serviceCard}>
              <h2 className={styles.serviceTitle}>Premium Deep Cleaning</h2>

              {/* Service Image */}
              <div className={styles.serviceImageContainer}>
                <img
                  src="https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                  alt="Premium Deep Cleaning Service"
                  className={styles.serviceImage}
                />
              </div>

              <div className={styles.serviceInfo}>
                <p className={styles.servicePrice}>Starting from Ksh 3000</p>
                <p className={styles.inclusionsTitle}>Inclusions</p>
                <p className={styles.inclusionsDescription}>
                  Thorough cleaning and sanitization of 6 sections:
                </p>

                <ul className={styles.inclusionsList}>
                  <li>• Bedroom and living rooms</li>
                  <li>• Kitchen and dining area</li>
                  <li>• Toilet and shower area</li>
                  <li>• Balcony</li>
                  <li>• Flooring and staircase</li>
                  <li>• Internal and external</li>
                </ul>
              </div>

              {/* Property Type Selection */}
              <div className={styles.propertySection}>
                <h3 className={styles.sectionTitle}>Type of Property</h3>
                <div className={styles.buttonGroup}>
                  <button
                    onClick={() => setPropertyType("Apartment")}
                    className={`${styles.propertyButton} ${
                      propertyType === "Apartment"
                        ? styles.propertyButtonActive
                        : ""
                    }`}
                  >
                    Apartment
                  </button>
                  <button
                    onClick={() => setPropertyType("Villa")}
                    className={`${styles.propertyButton} ${
                      propertyType === "Villa"
                        ? styles.propertyButtonActive
                        : ""
                    }`}
                  >
                    Villa
                  </button>
                </div>

                <div className={styles.buttonGroup}>
                  <button
                    onClick={() => setFurnishing("Furnished")}
                    className={`${styles.furnishingButton} ${
                      furnishing === "Furnished"
                        ? styles.furnishingButtonActive
                        : ""
                    }`}
                  >
                    Furnished
                  </button>
                  <button
                    onClick={() => setFurnishing("Unfurnished")}
                    className={`${styles.furnishingButton} ${
                      furnishing === "Unfurnished"
                        ? styles.furnishingButtonActive
                        : ""
                    }`}
                  >
                    Unfurnished
                  </button>
                </div>
              </div>

              {/* Room Selection */}
              <div className={styles.roomSection}>
                {[
                  { key: "studio", label: "Studio" },
                  { key: "oneBedroom", label: "1 Bedroom" },
                  { key: "twoBedroom", label: "2 Bedroom" },
                  { key: "threeBedroom", label: "3 Bedroom" },
                  { key: "fourBedroom", label: "4 Bedroom" },
                  { key: "fiveBedroom", label: "5 Bedroom" },
                ].map((room) => (
                  <div key={room.key} className={styles.roomRow}>
                    <span className={styles.roomLabel}>{room.label}</span>
                    <div className={styles.roomControls}>
                      <button
                        onClick={() => updateRoomCount(room.key, false)}
                        className={styles.roomButton}
                        disabled={roomCounts[room.key] === 0}
                      >
                        <Minus className={styles.roomButtonIcon} />
                      </button>
                      <span className={styles.roomCount}>
                        {roomCounts[room.key]}
                      </span>
                      <button
                        onClick={() => updateRoomCount(room.key, true)}
                        className={styles.roomButton}
                        disabled={roomCounts[room.key] === 1}
                      >
                        <Plus className={styles.roomButtonIcon} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.futherInstruction}>
                <label
                  htmlFor="insturctions"
                  className={styles.insturctionsLable}
                >
                  Do you have any specific cleaning instructions?
                </label>
                <textarea
                  name="instructions"
                  id="instructions"
                  placeholder="Example: A/C has bad smell, to much dust in vents, regular cleaning .etc"
                  className={styles.instructions}
                ></textarea>
              </div>
              <div className={styles.navigate}>
                <button className={styles.navbackButton}>BACK</button>
                <button className={styles.bookButton}> BOOK NOW</button>
              </div>
            </div>
          </div>
          {/* Right Column - Summary */}
          <div className={styles.rightColumn}>
            <div className={styles.summaryCard}>
              <h3 className={styles.summaryTitle}>Summary</h3>

              {/* Payment Details */}
              <div className={styles.summarySection}>
                <button
                  onClick={() => setShowPaymentDetails(!showPaymentDetails)}
                  className={styles.summaryToggle}
                >
                  <span className={styles.summaryToggleLabel}>
                    Payment Details
                  </span>
                  <ChevronDown
                    className={`${styles.summaryToggleIcon} ${
                      showPaymentDetails ? styles.summaryToggleIconRotated : ""
                    }`}
                  />
                </button>

                {showPaymentDetails && (
                  <div className={styles.summaryDetails}>
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>Price</span>
                      <span className={styles.summaryValue}>
                        Ksh {totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>Service Fee</span>
                      <span className={styles.summaryValue}>Ksh 0.00</span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>VAT</span>
                      <span className={styles.summaryValue}>Ksh 0.00</span>
                    </div>
                    <div
                      className={`${styles.summaryRow} ${styles.summaryTotal}`}
                    >
                      <span className={styles.summaryLabel}>Total Price</span>
                      <span className={styles.summaryValue}>
                        Ksh {totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Service Details */}
              <div className={styles.summarySection}>
                <button
                  onClick={() => setShowServiceDetails(!showServiceDetails)}
                  className={styles.summaryToggle}
                >
                  <span className={styles.summaryToggleLabel}>
                    Service Details
                  </span>
                  <ChevronDown
                    className={`${styles.summaryToggleIcon} ${
                      showServiceDetails ? styles.summaryToggleIconRotated : ""
                    }`}
                  />
                </button>

                {showServiceDetails && (
                  <div className={styles.summaryDetails}>
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>
                        Type of Property
                      </span>
                      <span className={styles.summaryValue}>
                        {propertyType}
                      </span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>Total Rooms</span>
                      <span className={styles.summaryValue}>{totalRooms}</span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>Furnishing</span>
                      <span className={styles.summaryValue}>{furnishing}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ServiceDetails };
