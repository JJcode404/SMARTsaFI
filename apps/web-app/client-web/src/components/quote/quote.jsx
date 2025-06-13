import styles from "./quote.module.css";

const QuoteComponent = () => {
  return (
    <div className={styles.quoteContainer}>
      <div className={styles.quoteSection}>
        <div className={styles.right}>
          <div className={styles.quoteMark}>"</div>
          <p className={styles.quoteText}>
            The objective of cleaning is not just to clean, but to feel
            happiness living within that environment.
          </p>
          <div className={styles.divider}></div>
          <p className={styles.author}>Marie Kondo</p>
        </div>
        <div className={styles.imageSection}></div>
      </div>
    </div>
  );
};

export { QuoteComponent };
