import React, { useState } from "react";
import { Building2, Home, ArrowRight } from "lucide-react";
import styles from "./booking.module.css";
import { Link } from "react-router-dom";

const ServiceBookingCard = () => {
  const [selectedService, setSelectedService] = useState("residential");

  const services = {
    commercial: {
      icon: Building2,
      title: "Commercial",
      description: "Office buildings, retail spaces, and commercial properties",
      features: [
        "Office cleaning",
        "Retail spaces",
        "Medical facilities",
        "Warehouses",
      ],
    },
    residential: {
      icon: Home,
      title: "Residential",
      description: "Homes, apartments, and residential properties",
      features: [
        "Deep cleaning",
        "Move-in/out",
        "Regular cleaning",
        "Post-construction",
      ],
    },
  };

  const {
    icon: Icon,
    title,
    description,
    features,
  } = services[selectedService];

  return (
    <div className={styles.container}>
      <div className="progressSection">
        <div className="progressContent">
          <div className="progressHeader">
            <h1 className="progressTitle">Select Service Type</h1>
            <p className="progressSubtitle">
              Choose the type of cleaning service you need
            </p>
          </div>
        </div>
      </div>
      <div className={styles.card}>
        {/* Toggle */}
        <div className={styles.toggleContainer}>
          <div
            className={`${styles.toggleSlider} ${
              selectedService === "commercial" ? styles.toggleSliderRight : ""
            }`}
          />
          <div className={styles.toggleButtons}>
            <button
              className={`${styles.toggleButton} ${
                selectedService === "residential"
                  ? styles.toggleButtonActive
                  : ""
              }`}
              onClick={() => setSelectedService("residential")}
            >
              Residential
            </button>
            <button
              className={`${styles.toggleButton} ${
                selectedService === "commercial"
                  ? styles.toggleButtonActive
                  : ""
              }`}
              onClick={() => setSelectedService("commercial")}
            >
              Commercial
            </button>
          </div>
        </div>

        {/* Service Details */}
        <div className={styles.serviceDetails}>
          <div className={styles.serviceContent}>
            <div className={styles.iconWrapper}>
              <Icon className={styles.icon} />
            </div>
            <div className={styles.textContent}>
              <h3 className={styles.serviceTitle}>{title} Cleaning</h3>
              <p className={styles.serviceDescription}>{description}</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className={styles.featuresContainer}>
          <div className={styles.featuresGrid}>
            {features.map((feature, idx) => (
              <div className={styles.featureItem} key={idx}>
                <div className={styles.featureDot}></div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <Link to={`/homePage/choose-service`}>
          <button className={styles.continueButton}>
            <span>Continue</span>
            <ArrowRight className={styles.arrowIcon} />
          </button>
        </Link>

        {/* Footer */}
        <div className={styles.footer}>
          <p className={styles.footerText}>
            Free quotes • Insured & bonded • Satisfaction guaranteed
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceBookingCard;
