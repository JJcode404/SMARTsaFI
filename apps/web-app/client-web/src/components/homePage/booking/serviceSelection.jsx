import { ArrowRight } from "lucide-react";
import styles from "./serviceSelection.module.css";
import { useBooking } from "../../../utilites/bookingContext";
import { services } from "../../../../data/Servicetypes";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Bookingheader } from "../../../pages/booking/header";

const ServiceSelectionCard = () => {
  const { state, setService } = useBooking();
  const navigate = useNavigate();
  const selectedService = state.service;
  const selectedServiceType = state.serviceType;
  const currentFeatures = services[selectedServiceType]?.features || [];

  return (
    <>
      <Bookingheader />
      <div className={styles.container}>
        <div className="progressSection">
          <div className="progressContent">
            <div className="progressHeader">
              <h1 className="progressTitle">Select Your Service</h1>
              <p className="progressSubtitle">
                Choose the cleaning service that best fits your needs
              </p>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.servicesContainer}>
            {currentFeatures.map((service) => {
              const Icon = service.icon;
              const isSelected = selectedService === service.title;

              return (
                <button
                  key={service.id}
                  onClick={() => {
                    setService(service.title);
                  }}
                  className={`${styles.serviceOption} ${
                    isSelected ? styles.serviceOptionActive : ""
                  }`}
                >
                  <div className={styles.serviceContent}>
                    <div
                      className={`${styles.iconContainer} ${
                        isSelected ? styles.iconContainerActive : ""
                      }`}
                    >
                      <Icon
                        className={`${styles.icon} ${
                          isSelected ? styles.iconActive : ""
                        }`}
                      />
                    </div>
                    <div className={styles.textContent}>
                      <h3
                        className={`${styles.serviceTitle} ${
                          isSelected ? styles.serviceTitleActive : ""
                        }`}
                      >
                        {service.title}
                      </h3>
                      <p
                        className={`${styles.serviceDescription} ${
                          isSelected ? styles.serviceDescriptionActive : ""
                        }`}
                      >
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`${styles.checkmark} ${
                      isSelected ? styles.checkmarkActive : ""
                    }`}
                  >
                    <svg
                      className={styles.checkIcon}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>
          <Link to={"/booking-flow/final"}>
            <button
              className={`${styles.continueButton} ${
                selectedService ? styles.continueButtonEnabled : ""
              }`}
              disabled={!selectedService}
            >
              <span>Continue</span>
              <ArrowRight className={styles.arrowIcon} />
            </button>
          </Link>

          <div className={styles.footer}>
            <p className={styles.footerText}>
              Professional • Insured • Satisfaction Guaranteed
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceSelectionCard;
