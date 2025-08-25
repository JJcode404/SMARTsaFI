import { useState, useRef, useEffect } from "react";
import { ChevronDown, Plus, Minus } from "lucide-react";
import styles from "./serviceDetails.module.css";
import { useBooking } from "../../utilites/bookingContext";

const basePrice = 3000;

const createInitialCounts = (
  features,
  selectedService,
  existingCounts = {}
) => {
  const counts = { ...existingCounts };
  const selectedFeature = features.find(
    (feature) => feature.title === selectedService
  );

  if (selectedFeature?.options?.length > 0) {
    selectedFeature.options.forEach((option) => {
      const key = `${selectedFeature.id}_${option.id}`;
      if (counts[key] === undefined) {
        counts[key] = 0;
      }
    });
  }
  return counts;
};

const ServiceDetails = () => {
  const {
    state,
    dispatch,
    handleNext,
    updateRoomCount,
    updateFeatureDescription,
    buildPayload,
  } = useBooking();

  const instructions = state.cleaningInstructions;
  const description = state.description;
  const [showPaymentDetails, setShowPaymentDetails] = useState(true);
  const [showServiceDetails, setShowServiceDetails] = useState(false);

  const initializedServiceRef = useRef(null);

  useEffect(() => {
    const serviceKey = `${state.service}_${state.features.length}`;
    if (initializedServiceRef.current !== serviceKey) {
      const initialCounts = createInitialCounts(
        state.features,
        state.service,
        state.roomCounts
      );
      dispatch({ type: "SET_ROOM_COUNTS", payload: initialCounts });
      initializedServiceRef.current = serviceKey;
    }
  }, [state.features, state.service, dispatch, state.roomCounts]);

  useEffect(() => {
    let totalPrice = basePrice;
    const selectedFeature = state.features.find(
      (feature) => feature.title === state.service
    );

    if (selectedFeature?.options?.length > 0) {
      selectedFeature.options.forEach((option) => {
        const key = `${selectedFeature.id}_${option.id}`;
        totalPrice += option.unit_price * (state.roomCounts[key] || 0);
      });
    }

    dispatch({ type: "SET_PRICE", payload: totalPrice });

    const labels = [];
    if (selectedFeature?.options?.length > 0) {
      selectedFeature.options.forEach((option) => {
        const key = `${selectedFeature.id}_${option.id}`;
        const count = state.roomCounts[key] || 0;
        if (count > 0) {
          labels.push(`${count} ${option.label}`);
        }
      });
    }
    dispatch({ type: "SET_BEDROOMLABLE", payload: labels.join(", ") });
  }, [state.roomCounts, state.features, state.service, dispatch]);

  const handlePropertyChange = (type) => {
    dispatch({ type: "SET_PROPERTY_TYPE", payload: type });
  };

  const handleFurnishingChange = (value) => {
    dispatch({ type: "SET_FURNISHING", payload: value });
  };

  const handleCleaningInstructions = (value) => {
    dispatch({ type: "SET_CLEANINGINSTRUCTIONS", payload: value });
  };
  const handleDescription = (value) => {
    dispatch({ type: "SET_DESCRIPTION", payload: value });
  };

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Handles a change in the description of a feature.
   * @param {number} featureId The ID of the feature to be updated.
   * @param {string} value The new description for the feature.
   */
  /*******  a9a0a401-25ef-48d5-8367-6b41d293436f  *******/
  const handleFeatureDescriptionChange = (featureId, value) => {
    updateFeatureDescription(featureId, value);
  };

  const handleRoomCountUpdate = (key, increment) => {
    const currentCount = Number(state.roomCounts[key]) || 0;
    const newCount = Math.max(0, currentCount + (increment ? 1 : -1));
    updateRoomCount(key, newCount);
  };

  const handleInputChange = (key, option, inputValue) => {
    // Allow empty input
    if (inputValue === "") {
      updateRoomCount(key, "");
      return;
    }

    // Remove leading zeros except when the number is actually zero
    const cleanedValue = inputValue.replace(/^0+(?=\d)/, "");

    const numericValue = Number(cleanedValue);
    if (!Number.isNaN(numericValue)) {
      const minUnits = option.min_units || 0;
      const maxUnits = option.max_units || 999;

      if (numericValue > maxUnits) {
        updateRoomCount(key, String(maxUnits));
      } else if (numericValue < minUnits) {
        updateRoomCount(key, String(minUnits));
      } else {
        updateRoomCount(key, cleanedValue); // Keep as string
      }
    }
  };

  const handleNextWithPayload = () => {
    // const payload = buildPayload(state);
    // console.log("Booking Payload:", payload);
    handleNext();
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

                      {selectedFeature.options?.length > 0 ? (
                        selectedFeature.options.map((option) => {
                          const key = `${selectedFeature.id}_${option.id}`;
                          const currentValue =
                            state.roomCounts[key] === ""
                              ? ""
                              : Number(state.roomCounts[key]) || 0;
                          const minUnits = option.min_units || 0;
                          const maxUnits = option.max_units || 999;

                          return (
                            <div key={option.id} className={styles.roomRow}>
                              <span className={styles.roomLabel}>
                                {option.label} (Ksh {option.unit_price})
                                <small
                                  style={{
                                    display: "block",
                                    color: "#666",
                                    fontSize: "10px",
                                  }}
                                >
                                  Min: {minUnits}, Max: {maxUnits}
                                </small>
                              </span>
                              <div className={styles.roomControls}>
                                <button
                                  onClick={() =>
                                    handleRoomCountUpdate(key, false)
                                  }
                                  className={styles.roomButton}
                                  disabled={currentValue <= minUnits}
                                >
                                  <Minus className={styles.roomButtonIcon} />
                                </button>

                                <input
                                  type="number"
                                  className={styles.roomInput}
                                  value={state.roomCounts[key] ?? ""}
                                  min={minUnits}
                                  max={maxUnits}
                                  // placeholder="0"
                                  onChange={(e) =>
                                    handleInputChange(
                                      key,
                                      option,
                                      e.target.value
                                    )
                                  }
                                  onBlur={(e) => {
                                    let value = Number(e.target.value);
                                    if (Number.isNaN(value)) {
                                      value = minUnits;
                                    }
                                    value = Math.max(
                                      minUnits,
                                      Math.min(maxUnits, value)
                                    );
                                    updateRoomCount(key, String(value)); // Keep string format
                                  }}
                                />

                                <button
                                  onClick={() =>
                                    handleRoomCountUpdate(key, true)
                                  }
                                  className={styles.roomButton}
                                  disabled={currentValue >= maxUnits}
                                >
                                  <Plus className={styles.roomButtonIcon} />
                                </button>
                              </div>
                            </div>
                          );
                        })
                      ) : (
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
                            value={description}
                            onChange={(e) => handleDescription(e.target.value)}
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
                  onClick={handleNextWithPayload}
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
