import { useState } from "react";
import { useBooking } from "../../utilites/bookingContext";
import styles from "./checkout.module.css";
import { MpesaForm } from "./mpesa";
import { CardForm } from "./visa";

const Checkout = () => {
  const { handleSubmit, state } = useBooking();
  const [paymentMethod, setPaymentMethod] = useState("mpesa");

  const { price } = state;
  const Vat = 500;

  return (
    <div className={styles.wrapper}>
      <div className={styles.checkoutContainer}>
        <h2 className={styles.title}>CheckOut</h2>
        <p className={styles.subtitle}>
          Please complete the purchase by providing payment details
        </p>
        <div className={styles.paymentIcons}>
          <img
            src={"/mpesalogo1.svg"}
            className={`${styles.mpesa} ${
              paymentMethod === "mpesa" ? styles.active : ""
            }`}
            alt="Mpesa"
            onClick={() => setPaymentMethod("mpesa")}
          />
          <img
            src={"/visa-svgrepo-com.svg"}
            alt="Visa"
            className={paymentMethod === "card" ? styles.active : ""}
            onClick={() => setPaymentMethod("card")}
          />
          <img
            src={"/mastercard-svgrepo-com.svg"}
            alt="Mastercard"
            className={paymentMethod === "card" ? styles.active : ""}
            onClick={() => setPaymentMethod("card")}
          />
        </div>
        {paymentMethod === "mpesa" && <MpesaForm />}
        {paymentMethod === "card" && <CardForm />}
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
    </div>
  );
};

export { Checkout };
