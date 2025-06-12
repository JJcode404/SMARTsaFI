import styles from "./gift-card.module.css";

const GiftCard = () => {
  return (
    <div className={styles.giftCardContainer}>
      <div className={styles.imageSection}></div>

      <div className={styles.contentSection}>
        <h1 className={styles.title}>
          Get a Pretty Cleaning Services TX Gift Card Today
        </h1>
        <p className={styles.description}>
          Looking for the perfect gift? Give the gift of a clean home with a
          Pretty Cleaning Services TX gift card. Our gift cards are available in
          a variety of denominations and can be purchased online today!
        </p>
        <button className={styles.ctaButton}>Get Gift Card</button>
      </div>
    </div>
  );
};

export { GiftCard };
