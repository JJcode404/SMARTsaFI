import { Navbar } from "../../components/header/navbar";
import styles from "./landingPage.module.css";
import { WhoWeAre } from "../../components/introduction/introduction";
import { TestimonialReviews } from "../../components/testimony/testimonialReviews";
import { SparkligGallery } from "../../components/sparkling-gallery/sparkling-gallery";
import { QuoteComponent } from "../../components/quote/quote";
import { WhatWeOffer } from "../../components/whatweOffer/whatweOffer";
import { Subscription } from "../../components/subscription/subscription";
import { GiftCard } from "../../components/gift-card/gift-card";
import { Footer } from "../../components/footer/footer";

function HeroContent() {
  return (
    <div className={styles.heroContent}>
      <div className={styles.heroText}>
        <h1>Transform Your Home with Our Cleaning Services</h1>
        <p>
          We make your home spotless so you can enjoy the important things in
          life
        </p>
        <div className="schedule">
          <button className={styles.heroButton}>Schedule a Cleaning</button>
        </div>
      </div>
    </div>
  );
}

function LandingPage() {
  return (
    <div className={styles.main}>
      <div className={styles.hero}>
        <Navbar />
        <HeroContent />
        <WhoWeAre />
        <TestimonialReviews />
        <SparkligGallery />
        <QuoteComponent />
        <WhatWeOffer />
        <Subscription />
        <GiftCard />
        <Footer />
      </div>
    </div>
  );
}

export { LandingPage };
