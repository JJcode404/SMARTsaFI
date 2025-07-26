import { useState, useRef, useEffect } from "react";
import { ChevronDown, Plus, Minus } from "lucide-react";
import styles from "./serviceDetails.module.css";
import { useBooking } from "../../utilites/bookingContext";
import { roomConfig } from "../../../data/roomConfig";

const basePrice = 3000;

const createInitialCounts = (type) => {
  const counts = {};
  roomConfig[type].forEach(({ key }) => {
    counts[key] = 0;
  });
  return counts;
};

const ServiceDetails = () => {
  const { state, dispatch, handleNext } = useBooking();

  const instructions = state.cleaningInstructions;

  const [roomCounts, setRoomCounts] = useState(() =>
    createInitialCounts(state.serviceType)
  );
  const [showPaymentDetails, setShowPaymentDetails] = useState(true);
  const [showServiceDetails, setShowServiceDetails] = useState(false);

  useEffect(() => {
    // Reset counts when serviceType changes
    setRoomCounts(createInitialCounts(state.serviceType));
  }, [state.serviceType]);

  useEffect(() => {
    const rooms = roomConfig[state.serviceType];
    let totalPrice = basePrice;

    rooms.forEach(({ key, price }) => {
      totalPrice += price * (roomCounts[key] || 0);
    });

    dispatch({ type: "SET_PRICE", payload: totalPrice });

    const label = rooms
      .map(({ key, label }) => `${roomCounts[key] || 0} ${label.split(" ")[0]}`)
      .join(", ");
    dispatch({ type: "SET_BEDROOMLABLE", payload: label });
  }, [roomCounts, state.serviceType]);

  const handlePropertyChange = (type) => {
    dispatch({ type: "SET_PROPERTY_TYPE", payload: type });
  };

  const handleFurnishingChange = (value) => {
    dispatch({ type: "SET_FURNISHING", payload: value });
  };

  const handleCleaningInstructions = (value) => {
    dispatch({ type: "SET_CLEANINGINSTRUCTIONS", payload: value });
  };

  const updateRoomCount = (roomType, increment) => {
    setRoomCounts((prev) => {
      const newCount = Math.max(
        0,
        (prev[roomType] || 0) + (increment ? 1 : -1)
      );
      return {
        ...prev,
        [roomType]: newCount,
      };
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.contentGrid}>
          {/* Left Column */}
          <div className={styles.leftColumn}>
            <div className={styles.serviceCard}>
              <h2 className={styles.serviceTitle}>Premium Deep Cleaning</h2>

              <div className={styles.serviceImageContainer}>
                <img
                  src="/homepage3.jpg"
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
                    onClick={() => handlePropertyChange("Apartment")}
                    className={`${styles.propertyButton} ${
                      state.propertyType === "Apartment"
                        ? styles.propertyButtonActive
                        : ""
                    }`}
                  >
                    Apartment
                  </button>
                  <button
                    onClick={() => handlePropertyChange("Villa")}
                    className={`${styles.propertyButton} ${
                      state.propertyType === "Villa"
                        ? styles.propertyButtonActive
                        : ""
                    }`}
                  >
                    Villa
                  </button>
                </div>

                <div className={styles.buttonGroup}>
                  <button
                    onClick={() => handleFurnishingChange("Furnished")}
                    className={`${styles.furnishingButton} ${
                      state.furnishing === "Furnished"
                        ? styles.furnishingButtonActive
                        : ""
                    }`}
                  >
                    Furnished
                  </button>
                  <button
                    onClick={() => handleFurnishingChange("Unfurnished")}
                    className={`${styles.furnishingButton} ${
                      state.furnishing === "Unfurnished"
                        ? styles.furnishingButtonActive
                        : ""
                    }`}
                  >
                    Unfurnished
                  </button>
                </div>
              </div>

              {/* Room Count Section */}
              <div className={styles.roomSection}>
                {roomConfig[state.serviceType].map(({ key, label }) => (
                  <div key={key} className={styles.roomRow}>
                    <span className={styles.roomLabel}>{label}</span>
                    <div className={styles.roomControls}>
                      <button
                        onClick={() => updateRoomCount(key, false)}
                        className={styles.roomButton}
                        disabled={roomCounts[key] === 0}
                      >
                        <Minus className={styles.roomButtonIcon} />
                      </button>
                      <span className={styles.roomCount}>
                        {roomCounts[key] || 0}
                      </span>
                      <button
                        onClick={() => updateRoomCount(key, true)}
                        className={styles.roomButton}
                        disabled={roomCounts[key] === 15}
                      >
                        <Plus className={styles.roomButtonIcon} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cleaning Instructions */}
              <div className={styles.futherInstruction}>
                <label
                  htmlFor="instructions"
                  className={styles.insturctionsLable}
                >
                  Do you have any specific cleaning instructions?
                </label>
                <textarea
                  name="instructions"
                  id="instructions"
                  value={instructions}
                  onChange={(e) => handleCleaningInstructions(e.target.value)}
                  placeholder="Example: A/C has bad smell, too much dust in vents, regular cleaning, etc."
                  className={styles.instructions}
                ></textarea>
              </div>

              {/* Navigation Buttons */}
              <div className={styles.navigate}>
                <button className={styles.navbackButton}>BACK</button>
                <button
                  className={styles.bookButton}
                  onClick={() => handleNext()}
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
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
                        Ksh {state.price.toFixed(2)}
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
                        Ksh {state.price.toFixed(2)}
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
                        {state.propertyType}
                      </span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>Rooms</span>
                      <span className={styles.summaryValue}>
                        {roomConfig[state.serviceType]
                          .map(
                            ({ key, label }) =>
                              `${roomCounts[key] || 0} ${label}`
                          )
                          .join(", ")}
                      </span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>Furnishing</span>
                      <span className={styles.summaryValue}>
                        {state.furnishing}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* End of Grid */}
        </div>
      </div>
    </div>
  );
};

export { ServiceDetails };
