// CleaningServiceUI.jsx
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Plus, Minus, User, Menu, ArrowLeft } from "lucide-react";
import styles from "./serviceDetails.module.css";
import { useBooking } from "../../utilites/bookingContext";

const ServiceDetails = () => {
  const { state, dispatch, handleNext, setService, setServiceType } =
    useBooking();
  const instructions = state.cleaningInstructions;
  const handlePropertyChange = (type) => {
    dispatch({ type: "SET_PROPERTY_TYPE", payload: type });
  };
  const handleBedroomChange = (room) => {
    dispatch({ type: "SET_BEDROOMLABLE", payload: room });
  };

  const handleFurnishingChange = (value) => {
    dispatch({ type: "SET_FURNISHING", payload: value });
  };
  const handlePriceChange = (price) => {
    dispatch({ type: "SET_PRICE", payload: price });
  };
  const handleCleaningInstructions = (value) => {
    dispatch({ type: "SET_CLEANINGINSTRUCTIONS", payload: value });
  };
  const [roomCounts, setRoomCounts] = useState({
    studio: 0,
    oneBedroom: 0,
    twoBedroom: 0,
    threeBedroom: 0,
    fourBedroom: 0,
    fiveBedroom: 0,
  });

  const roomPrices = {
    studio: 500,
    oneBedroom: 700,
    twoBedroom: 1000,
    threeBedroom: 1300,
    fourBedroom: 1600,
    fiveBedroom: 2000,
  };

  const [selectedRoom, setSelecteRoom] = useState("");

  const basePrice = 3000;

  const [showPaymentDetails, setShowPaymentDetails] = useState(true);
  const [showServiceDetails, setShowServiceDetails] = useState(false);

  const prevRoomCounts = useRef(roomCounts);

  useEffect(() => {
    const changedKey = Object.keys(roomCounts).find(
      (key) => roomCounts[key] > prevRoomCounts.current[key]
    );
    handleBedroomChange(changedKey);

    setSelecteRoom(changedKey);

    const newSelectedRoomPrice = roomPrices[changedKey] || 0;
    const newTotalPrice = basePrice + newSelectedRoomPrice;
    handlePriceChange(newTotalPrice);

    // Update the ref for next comparison
    prevRoomCounts.current = roomCounts;
  }, [roomCounts]);

  useEffect(() => {
    try {
      const savedService = localStorage.getItem("selectedService");
      const savedServiceType = localStorage.getItem("selectedServiceType");

      if (
        savedService &&
        savedServiceType &&
        !state.isSubmitted &&
        (state.service !== savedService ||
          state.serviceType !== savedServiceType)
      ) {
        setService(savedService);
        setServiceType(savedServiceType);
      }
    } catch (error) {
      console.error("Failed to load service data from localStorage:", error);
    }
  }, []);

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

  return (
    <div className={styles.container}>
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
                  src="./homepage3.jpg"
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
                  value={instructions}
                  onChange={(e) => handleCleaningInstructions(e.target.value)}
                  placeholder="Example: A/C has bad smell, to much dust in vents, regular cleaning .etc"
                  className={styles.instructions}
                ></textarea>
              </div>
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
                        {selectedRoom || "Not selected"}
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
        </div>
      </div>
    </div>
  );
};

export { ServiceDetails };
