import styles from "./introduction.module.css";

const WhoWeAre = () => {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLine}>
          <div className={styles.line}></div>
          <h2 className={styles.headerText}>Who We Are</h2>
          <div className={styles.line}></div>
        </div>
      </div>

      {/* Hero Image */}
      <img
        src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        alt="Modern bathroom interior"
        className={styles.heroImage}
      />

      {/* Our Story Section */}
      <div className={styles.storySection}>
        <h3 className={styles.storyTitle}>Our Story</h3>
        <p className={styles.storyText}>
          At Pretty Cleaning Services TX, we started this business in 2017 with
          a passion for providing a clean and healthy home environment for our
          clients. Our team of experienced cleaners is dedicated to delivering
          high-quality cleaning services that exceed our clients' expectations.
        </p>
        <button className={styles.servicesButton}>Our Services</button>
      </div>

      {/* Content Grid */}
      <div className={styles.contentGrid}>
        {/* Our Team */}
        <div className={styles.gridItem}>
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="Cleaning team member"
            className={styles.teamImage}
          />
          <h4 className={styles.sectionTitle}>Our Team</h4>
          <p className={styles.sectionText}>
            Our team of professional cleaners is fully trained, insured, and
            background checked to ensure the safety and security of our clients'
            homes. We take pride in providing a reliable, efficient, and
            trustworthy cleaning service that is approachable, and always ready
            to go the extra mile to ensure that our clients are satisfied.
          </p>
          <button className={styles.bookButton}>Book Online</button>
        </div>

        {/* Serenity Section */}
        <div className={styles.gridItem}>
          <div className={styles.serenityImageContainer}>
            <img
              src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Serene sky with clouds"
              className={styles.serenityImage}
            />
            <div className={styles.serenityOverlay}>
              <h3 className={styles.serenityTitle}>serenity</h3>
              <p className={styles.serenitySubtitle}>n.</p>
              <p className={styles.serenityDescription}>
                the peaceful sensation experienced as a result of hiring a
                cleaning service.
              </p>
            </div>
          </div>
          <div className={styles.servicesSection}>
            <h4 className={styles.servicesTitle}>Our Services</h4>
            <p className={styles.servicesText}>
              We clean your space so you can focus on what matters most,
              including regular cleaning, deep cleaning, move-in and move-out
              cleaning, and more. Our services are affordable and flexible, and
              we strive to provide our clients with the peace of mind they
              deserve.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { WhoWeAre };
