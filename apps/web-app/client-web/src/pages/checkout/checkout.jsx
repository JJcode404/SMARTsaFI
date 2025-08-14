import { useState } from "react";
import { useBooking } from "../../utilites/bookingContext";
import styles from "./checkout.module.css";
import { MpesaForm } from "./mpesa";
import { CardForm } from "./visa";
import { usePostReq } from "../../utilites/usePost";
import { useAuth } from "../../utilites/authContextapi";

const Checkout = () => {
  const { handleSubmit, state, buildPayload } = useBooking();
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const { user } = useAuth();
  const { postData, loading, error, data } = usePostReq();

  const { price } = state;
  const Vat = 500;
  const totalPrice = price + Vat;

  const handleFinalBooking = async () => {
    const payload = buildPayload(state);
    console.log("Booking Payload:", payload);

    const clientId = state.user_id;
    if (!clientId) {
      alert("You're not logged in. Please log in to complete your booking.");
      return;
    }
    // const payload = buildPayload(state);
    // console.log("Booking Payload:", payload);

    // const payload = {
    //   client_id: clientId,
    //   worker_id: workerId,
    //   appointmentdatetime: scheduledDateTime,
    //   service_feature_id: cleaningInstructions || "",
    //   deposit_paid: propertyType,
    //   status: clientSpecialReaquest || "",
    //   rating: location?.pin || "",
    //   total_price: totalPrice,
    //   booked_services: [
    //     {
    //       feature_option_id:
    //       quantity:
    //       unit_price:
    //       total_price
    //     }
    //   ]
    // };

    try {
      const response = await postData(
        "http://127.0.0.1:8000/bookings",
        payload
      );
      console.log("Booking successful:", response);
      handleSubmit();
    } catch (err) {
      console.error("Booking failed:", err.message);
    }
  };

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
        <button
          className={styles.payBtn}
          onClick={handleFinalBooking}
          disabled={loading}
        >
          {loading ? "Processing..." : `Pay Ksh ${totalPrice}`}
        </button>
      </div>
    </div>
  );
};

export { Checkout };
