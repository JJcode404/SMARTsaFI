import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import styles from "./booking.module.css";
import { Link } from "react-router-dom";
import { services } from "../../../../data/Servicetypes";
import { useBooking } from "../../../utilites/bookingContext";

const ServiceBookingCard = () => {
  const { setServiceType } = useBooking();

  const [selectedService, setSelectedService] = useState("residential");

  const {
    icon: Icon,
    title,
    description,
    features,
  } = services[selectedService];
  console.log(selectedService);

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
        {/* Dynamic Service Selector */}
        <div className={styles.serviceOptionsGrid}>
          {Object.entries(services).map(([key, service]) => {
            const ServiceIcon = service.icon;
            return (
              <button
                key={key}
                className={`${styles.serviceOptionButton} ${
                  selectedService === key ? styles.activeService : ""
                }`}
                onClick={() => {
                  setSelectedService(key);
                  setServiceType(key);
                }}
              >
                <div className={styles.serviceOptionIcon}>
                  <ServiceIcon />
                </div>
                <div className={styles.serviceOptionText}>
                  <h4>{service.title}</h4>
                </div>
              </button>
            );
          })}
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
            {features.map((feature) => {
              const FeatureIcon = feature.icon;
              return (
                <div className={styles.featureItem} key={feature.id}>
                  <div className={styles.featureIcon}>
                    <FeatureIcon />
                  </div>
                  <div className={styles.featureText}>
                    <h5 className={styles.featureTitle}>{feature.title}</h5>
                    <p className={styles.featureDescription}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Continue Button */}
        <Link to={`/choose-service`}>
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
