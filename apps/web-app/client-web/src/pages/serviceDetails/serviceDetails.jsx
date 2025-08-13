import { useState, useRef, useEffect } from "react";
import { ChevronDown, Plus, Minus } from "lucide-react";
import styles from "./serviceDetails.module.css";
import { useBooking } from "../../utilites/bookingContext";

const basePrice = 3000;

const createInitialCounts = (features, selectedService) => {
  const counts = {};
  const selectedFeature = features.find(
    (feature) => feature.title === selectedService
  );

  if (
    selectedFeature &&
    selectedFeature.options &&
    selectedFeature.options.length > 0
  ) {
    selectedFeature.options.forEach((option) => {
      counts[`${selectedFeature.id}_${option.id}`] = 0;
    });
  }

  return counts;
};

const ServiceDetails = () => {
  const { state, dispatch, handleNext } = useBooking();

  const instructions = state.cleaningInstructions;

  const [roomCounts, setRoomCounts] = useState(() =>
    createInitialCounts(state.features, state.service)
  );
  const [featureDescriptions, setFeatureDescriptions] = useState({});
  const [showPaymentDetails, setShowPaymentDetails] = useState(true);
  const [showServiceDetails, setShowServiceDetails] = useState(false);

  useEffect(() => {
    // Reset counts when features or service changes
    setRoomCounts(createInitialCounts(state.features, state.service));
    setFeatureDescriptions({});
  }, [state.features, state.service]);

  useEffect(() => {
    let totalPrice = basePrice;

    // Find the selected feature
    const selectedFeature = state.features.find(
      (feature) => feature.title === state.service
    );

    // Calculate price from the selected feature's options
    if (
      selectedFeature &&
      selectedFeature.options &&
      selectedFeature.options.length > 0
    ) {
      selectedFeature.options.forEach((option) => {
        const key = `${selectedFeature.id}_${option.id}`;
        totalPrice += option.unit_price * (roomCounts[key] || 0);
      });
    }

    dispatch({ type: "SET_PRICE", payload: totalPrice });

    // Create label from selected options
    const labels = [];
    if (
      selectedFeature &&
      selectedFeature.options &&
      selectedFeature.options.length > 0
    ) {
      selectedFeature.options.forEach((option) => {
        const key = `${selectedFeature.id}_${option.id}`;
        const count = roomCounts[key] || 0;
        if (count > 0) {
          labels.push(`${count} ${option.label}`);
        }
      });
    }
    dispatch({ type: "SET_BEDROOMLABLE", payload: labels.join(", ") });
  }, [roomCounts, state.features, state.service, dispatch]);

  const handlePropertyChange = (type) => {
    dispatch({ type: "SET_PROPERTY_TYPE", payload: type });
  };

  const handleFurnishingChange = (value) => {
    dispatch({ type: "SET_FURNISHING", payload: value });
  };

  const handleCleaningInstructions = (value) => {
    dispatch({ type: "SET_CLEANINGINSTRUCTIONS", payload: value });
  };

  const handleFeatureDescriptionChange = (featureId, value) => {
    setFeatureDescriptions((prev) => ({
      ...prev,
      [featureId]: value,
    }));
  };

  const updateRoomCount = (key, increment) => {
    setRoomCounts((prev) => {
      const newCount = Math.max(0, (prev[key] || 0) + (increment ? 1 : -1));
      return {
        ...prev,
        [key]: newCount,
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

              {/* Features Section */}
              <div className={styles.roomSection}>
                {(() => {
                  // Find the selected feature by matching title with state.service
                  const selectedFeature = state.features.find(
                    (feature) => feature.title === state.service
                  );

                  if (!selectedFeature) {
                    return (
                      <div className={styles.noFeatureMessage}>
                        No feature found for "{state.service}"
                      </div>
                    );
                  }

                  return (
                    <div
                      key={selectedFeature.id}
                      className={styles.featureGroup}
                    >
                      <h4 className={styles.featureTitle}>
                        {selectedFeature.title}
                      </h4>
                      <p className={styles.featureDescription}>
                        {selectedFeature.description}
                      </p>

                      {selectedFeature.options &&
                      selectedFeature.options.length > 0 ? (
                        // Render options with counters
                        selectedFeature.options.map((option) => {
                          const key = `${selectedFeature.id}_${option.id}`;
                          return (
                            <div key={option.id} className={styles.roomRow}>
                              <span className={styles.roomLabel}>
                                {option.label} (Ksh {option.unit_price})
                              </span>
                              <div className={styles.roomControls}>
                                {/* Minus button */}
                                <button
                                  onClick={() => updateRoomCount(key, false)}
                                  className={styles.roomButton}
                                  disabled={roomCounts[key] === 0}
                                >
                                  <Minus className={styles.roomButtonIcon} />
                                </button>

                                {/* Number input */}
                                <input
                                  type="number"
                                  className={styles.roomInput}
                                  value={roomCounts[key] || 0}
                                  min={option.min_units || 0}
                                  placeholder="0"
                                  max={option.max_units || 100}
                                  onChange={(e) => {
                                    const value = Math.max(
                                      option.min_units || 0,
                                      Math.min(
                                        option.max_units || 100,
                                        Number(e.target.value) || 0
                                      )
                                    );
                                    setRoomCounts((prev) => ({
                                      ...prev,
                                      [key]: value,
                                    }));
                                  }}
                                />

                                {/* Plus button */}
                                <button
                                  onClick={() => updateRoomCount(key, true)}
                                  className={styles.roomButton}
                                  disabled={
                                    roomCounts[key] >= (option.max_units || 100)
                                  }
                                >
                                  <Plus className={styles.roomButtonIcon} />
                                </button>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        // Render description input when no options
                        <div className={styles.futherInstruction}>
                          <label
                            htmlFor={`feature-${selectedFeature.id}`}
                            className={styles.insturctionsLable}
                          >
                            Please provide details for {selectedFeature.title}:
                          </label>
                          <textarea
                            name={`feature-${selectedFeature.id}`}
                            id={`feature-${selectedFeature.id}`}
                            value={
                              featureDescriptions[selectedFeature.id] || ""
                            }
                            onChange={(e) =>
                              handleFeatureDescriptionChange(
                                selectedFeature.id,
                                e.target.value
                              )
                            }
                            placeholder={`Describe your ${selectedFeature.title.toLowerCase()} requirements...`}
                            className={styles.instructions}
                          />
                        </div>
                      )}
                    </div>
                  );
                })()}
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
                />
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
                      <span className={styles.summaryLabel}>
                        Selected Features
                      </span>
                      <span className={styles.summaryValue}>
                        {state.bedroomLabel || "None selected"}
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
