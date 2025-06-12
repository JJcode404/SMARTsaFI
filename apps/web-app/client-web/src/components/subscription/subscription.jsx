import styles from "./subscription.module.css";

function Subscription() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Subscribe</h1>

        <p className={styles.subtitle}>
          Get 10% off your first service when you sign up for our newsletter!
        </p>

        <div className={styles.inputContainer}>
          <input
            type="email"
            placeholder="Email"
            className={styles.emailInput}
          />
          <button className={styles.signupButton}>Sign up</button>
        </div>
      </div>
    </div>
  );
}

export { Subscription };
