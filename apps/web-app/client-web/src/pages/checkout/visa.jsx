import React, { useState } from "react";
import { CreditCard, Lock, Calendar, User } from "lucide-react";
import styles from "./checkout.module.css"; // Assumes your CSS module uses the same class names

const CardForm = () => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    email: "",
    billingAddress: "",
    city: "",
    zipCode: "",
    country: "US",
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : v;
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    return v.length >= 2 ? v.substring(0, 2) + "/" + v.substring(2, 4) : v;
  };

  const validateMastercard = (number) => {
    const cleanNumber = number.replace(/\s/g, "");
    return (
      /^5[1-5][0-9]{14}$/.test(cleanNumber) ||
      /^2[2-7][0-9]{14}$/.test(cleanNumber)
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = formatCardNumber(value);
      if (formattedValue.length <= 19) {
        setFormData((prev) => ({ ...prev, [name]: formattedValue }));
      }
    } else if (name === "expiryDate") {
      formattedValue = formatExpiryDate(value);
      if (formattedValue.length <= 5) {
        setFormData((prev) => ({ ...prev, [name]: formattedValue }));
      }
    } else if (name === "cvv") {
      if (value.length <= 3 && /^\d*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.cardNumber) {
      newErrors.cardNumber = "Card number is required";
    } else if (!validateMastercard(formData.cardNumber)) {
      newErrors.cardNumber = "Invalid Mastercard number";
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Format MM/YY";
    }

    if (!formData.cvv) {
      newErrors.cvv = "CVV is required";
    } else if (!/^\d{3}$/.test(formData.cvv)) {
      newErrors.cvv = "Must be 3 digits";
    }

    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = "Cardholder name required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert("Payment successful! (demo)");
    }, 2000);
  };

  return (
    <>
      <h2 className={styles.cardtitle}>
        <CreditCard size={25} /> Card Information
      </h2>
      <p className={styles.subtitle}>Enter your Card details to proceed</p>

      <div className={styles.form}>
        <input
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleInputChange}
          placeholder="Card Number"
        />
        {errors.cardNumber && (
          <p className={styles.errorText}>{errors.cardNumber}</p>
        )}

        <input
          type="text"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleInputChange}
          placeholder="MM/YY"
        />
        {errors.expiryDate && (
          <p className={styles.errorText}>{errors.expiryDate}</p>
        )}

        <input
          type="text"
          name="cvv"
          value={formData.cvv}
          onChange={handleInputChange}
          placeholder="CVV"
        />
        {errors.cvv && <p className={styles.errorText}>{errors.cvv}</p>}

        <input
          type="text"
          name="cardholderName"
          value={formData.cardholderName}
          onChange={handleInputChange}
          placeholder="Cardholder Name"
        />
        {errors.cardholderName && (
          <p className={styles.errorText}>{errors.cardholderName}</p>
        )}
      </div>

      {/* <button
        type="button"
        onClick={handleSubmit}
        disabled={isProcessing}
        className={styles.payBtn}
      >
        {isProcessing ? (
          "Processing..."
        ) : (
          <>
            <Lock size={16} /> Complete Payment
          </>
        )}
      </button> */}
    </>
  );
};

export { CardForm };
