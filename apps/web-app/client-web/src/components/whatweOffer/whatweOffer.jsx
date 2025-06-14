import React from "react";
import styles from "./whatweOffer.module.css";

const WhatWeOffer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLine}>
          <div className={styles.line}></div>
          <h2 className={styles.headerText}>What We Offer</h2>
          <div className={styles.line}></div>
        </div>
      </div>

      {/* Hero Image */}
      <img
        src="https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
        alt="Modern sitting room interior"
        className={styles.heroImage}
      />

      {/* Our Story Section */}
      <div className={styles.storySection}>
        <h2 className={styles["section-title"]}>Residential Services</h2>
        <p className={styles["section-text"]}>
          Don't stress about your pets or children: our environmentally friendly
          products provide a safe clean. Our maid service will handle it. We
          take care of your home with the same care as if it were our own. We
          leave your sanctuary spotless so that you can focus on the rest of
          your life.
        </p>
      </div>
      {/* Deep Clean Services Section */}
      <div className={styles["deep-clean-section"]}>
        <div className={styles["deep-clean-content"]}>
          <h2 className={styles["section-title"]}>Deep Clean Services</h2>
          <p className={styles["section-text"]}>
            If you have your day to day cleaning under control, let us do the
            really dirty work. We provide deep clean services to reach the
            places you might have missed. We have a variety of bonus services
            from oven cleaning to fogger disinfecting. Let us help you make your
            home shine!
          </p>
        </div>
        <div className={styles["deep-clean-image"]}></div>
      </div>

      {/* Move In/Out Services Section */}
      <div className={styles["move-section"]}>
        <div className={styles["move-image"]}></div>
        <div className={styles["move-content"]}>
          <h2 className={styles["move-title"]}>Move In / Move Out Services</h2>
          <p className={styles["move-text"]}>
            We know the stress and hassle of moving right along with the
            cleaning portion. No sweat! Hire our cleaning service for your
            residential move in/move out cleaning so you can handle the more
            important things. Deep cleaning from high ceiling corners to dusty
            baseboards. We execute these areas with ease.
          </p>
          <p className={styles["move-assurance"]}>
            Relax... and rest assure that you hired the right home cleaning
            company for your peace of mind. We have you covered!
          </p>
          <button className={styles["cta-button"]}>Get Estimate Today!</button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className={styles["bottom-section"]}>
        <div className={styles["commercial-services"]}>
          <h2 className={styles["bottom-title"]}>Commercial Services</h2>
          <p className={styles["bottom-text"]}>
            Houston, TX has more than 100,000 businesses! We're here to help
            serve you and to keep your customers safe and satisfied while away
            from home. Around town we've serviced Schools, Salons, Barbershops,
            Libraries, Restaurants, Gyms, Daycare's and Hospitals. In addition
            to our commercial cleaning, we've added a new disinfection service
            to further protect you and your customers.
          </p>
        </div>
        <div className={styles["event-services"]}>
          <h2 className={styles["bottom-title"]}>Event Services</h2>
          <p className={styles["bottom-def"]}>
            Extra attention is needed for extraordinary events. Let us help!
          </p>
          <ul className={styles["event-list"]}>
            <li>Holiday and birthday parties</li>
            <li>Weddings and Special Events</li>
            <li>Museums and Theaters</li>
          </ul>
          <p className={styles["bottom-text"]}>
            Be sure to book in advance for service!
          </p>
        </div>
      </div>
    </div>
  );
};

export { WhatWeOffer };
