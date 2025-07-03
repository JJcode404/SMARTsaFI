import { useBooking } from "../../utilites/bookingContext";
import styles from "./checkout.module.css";
// import mpesaLogo from "./mpesalogo.svg";
// import visaLogo from "./visa-svgrepo-com.svg";
// import mastercardLogo from "";

const Checkout = () => {
  const { handleSubmit, state } = useBooking();

  const { price } = state;
  const Vat = 500;

  return (
    <div className={styles.checkoutContainer}>
      <h2 className={styles.title}>CheckOut</h2>
      <p className={styles.subtitle}>
        Please complete the purchase by providing payment details
      </p>

      <div className={styles.paymentIcons}>
        <img src={"./mpesalogo1.svg"} className={styles.mpesa} alt="Mpesa" />
        <img src={"./visa-svgrepo-com.svg"} alt="Visa" />
        <img src={"./mastercard-svgrepo-com.svg"} alt="Mastercard" />
      </div>

      <div className={styles.form}>
        <label>Mpesa Phone Number</label>
        <input type="text" placeholder="07XXXXXXXX" />

        <label>Email Address</label>
        <input type="email" placeholder="example@email.com" />
      </div>

      <div className={styles.summary}>
        <div>
          <span>Subtotal</span>
          <span>Ksh {price}</span>
        </div>
        <div>
          <span>VAT(16%)</span>
          <span>Ksh {Vat}</span>
        </div>
        <div className={styles.total}>
          <strong>Total</strong>
          <strong>Ksh {price + Vat}</strong>
        </div>
      </div>

      <button className={styles.payBtn} onClick={() => handleSubmit()}>
        Pay Ksh {price + Vat}
      </button>
    </div>
  );
};

export { Checkout };
