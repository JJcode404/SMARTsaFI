import styles from "./mpesa.module.css";
function MpesaForm() {
  return (
    <div className={styles.form}>
      <label>Mpesa Phone Number</label>
      <input type="text" placeholder="07XXXXXXXX" />

      <label>Email Address</label>
      <input type="email" placeholder="example@email.com" />
    </div>
  );
}

export { MpesaForm };
