import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  House,
  SprayCan,
  Sparkles,
  Sofa,
  Building2,
  Wrench,
  Hammer,
  Shirt,
} from "lucide-react";
import styles from "./booking.module.css";
import { Link } from "react-router-dom";
import { transformServices } from "../../../../data/Servicetypes";
import { useBooking } from "../../../utilites/bookingContext";
import { Bookingheader } from "../../../pages/booking/header";
import { useFetch } from "../../../utilites/useFetch";
import { useMemo } from "react";

// Create an icon mapping object - handle both string formats
const iconMapping = {
  // Service icons (slug format)
  sanitation: House,
  "pest-control": SprayCan,
  laundry: Sparkles,
  commercial: Building2,
  upholstery: Sofa,
  residential: House,

  // Feature icons (component name format - from your console logs)
  House: House,
  SprayCan: SprayCan,
  Sparkles: Sparkles,
  Sofa: Sofa,
  Building2: Building2,
  Wrench: Wrench,
  Hammer: Hammer,
  Shirt: Shirt,

  // Additional mappings in case the format is different
  house: House,
  sprayCan: SprayCan,
  sparkles: Sparkles,
  sofa: Sofa,
  building2: Building2,
  wrench: Wrench,
  hammer: Hammer,
  shirt: Shirt,
};

const ServiceBookingCard = () => {
  const { setServiceType, state } = useBooking();

  const { data, loading, error } = useFetch(
    "http://127.0.0.1:8000/services/categories"
  );

  const services = useMemo(() => {
    return data ? transformServices(data) : {};
  }, [data]);

  // Initialize selectedService with null first, then set it when services are loaded
  const [selectedService, setSelectedService] = useState(null);

  // Set initial selection when services are loaded
  useEffect(() => {
    if (services && Object.keys(services).length > 0 && !selectedService) {
      // Option 1: Use "residential" if it exists, otherwise use the first service
      const initialService = services.residential
        ? "residential"
        : Object.keys(services)[4];

      // Option 2: Always use the first available service
      // const initialService = Object.keys(services)[0];

      // Option 3: Use a specific service you prefer
      // const initialService = "residential"; // Make sure this key exists in your services

      setSelectedService(initialService);
      setServiceType(initialService);
    }
  }, [services, selectedService, setServiceType]);

  console.log("this is the services transformed", services);

  const selected = selectedService ? services[selectedService] || {} : {};
  const { icon: Icon, title, description, features = [] } = selected;

  // Fallback icon if the service doesn't have one
  const ServiceDetailsIcon =
    Icon ||
    iconMapping[selectedService] ||
    iconMapping[selected.icon_name] ||
    House;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Don't render the main content until we have services and an initial selection
  if (!services || Object.keys(services).length === 0 || !selectedService) {
    return (
      <>
        <Bookingheader />
        <div className={styles.container}>
          <p>Loading services...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Bookingheader />
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
              // Get the actual React component from the mapping
              const ServiceIconComponent =
                iconMapping[service.icon_name] || iconMapping[key];
              console.log("Service Debug:", {
                key,
                icon_name: service.icon_name,
                component: ServiceIconComponent,
                title: service.title,
                isSelected: selectedService === key,
              });

              return (
                <button
                  key={key}
                  className={`${styles.serviceOptionButton} ${
                    selectedService === key ? styles.activeService : ""
                  }`}
                  onClick={() => {
                    setSelectedService(key);
                    setServiceType(service.slug);
                    console.log("state after selection:", state);
                  }}
                >
                  <div className={styles.serviceOptionIcon}>
                    {ServiceIconComponent ? (
                      <ServiceIconComponent />
                    ) : (
                      <House /> // Fallback icon
                    )}
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
                <ServiceDetailsIcon className={styles.icon} />
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
              {features.map((feature, index) => {
                console.log("Feature Debug:", feature);

                // Try multiple ways to get the icon
                let FeatureIconComponent;

                // If feature.icon is already a React component
                if (
                  typeof feature.icon === "function" ||
                  (typeof feature.icon === "object" && feature.icon?.$$typeof)
                ) {
                  FeatureIconComponent = feature.icon;
                } else {
                  // Otherwise try to map from string
                  FeatureIconComponent =
                    iconMapping[feature.icon] ||
                    iconMapping[feature.icon_name] ||
                    iconMapping[feature.iconName];
                }

                console.log("Feature Icon Debug:", {
                  title: feature.title,
                  icon: feature.icon,
                  icon_name: feature.icon_name,
                  iconName: feature.iconName,
                  component: FeatureIconComponent,
                  iconType: typeof feature.icon,
                });

                return (
                  <div className={styles.featureItem} key={feature.id || index}>
                    <div className={styles.featureIcon}>
                      {FeatureIconComponent ? (
                        <FeatureIconComponent />
                      ) : (
                        <Sparkles /> // Fallback icon
                      )}
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
          <Link to={`/booking-flow/choose-service`}>
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
    </>
  );
};

export default ServiceBookingCard;
