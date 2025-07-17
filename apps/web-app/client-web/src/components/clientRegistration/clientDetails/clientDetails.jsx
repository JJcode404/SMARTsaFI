import {
  Building2,
  Contact,
  Shield,
  Phone,
  MapPin,
  FileText,
} from "lucide-react";
import styles from "./clientDetails.module.css";

const ClientDetailsForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          <FileText className={styles.headerIcon} />
          <div className={styles.intro}>
            <h1 className={styles.title}>Client Details</h1>
            <p className={styles.subtitle}>Choose your registration type</p>
          </div>
        </div>
        <p className={styles.startText}>Tell us about yourself!</p>
      </div>

      <p className={styles.infoText}>
        <span className={styles.infoIcon}>i</span> Fields marked with{" "}
        <span className={styles.required}>* </span> are required for
        verification
      </p>

      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Organization Name <span className={styles.required}>*</span>
          </label>
          <div className={styles.inputWrapper}>
            <Building2 className={styles.inputIcon} />
            <input
              type="text"
              placeholder="Enter organization name"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Tax Number <span className={styles.required}>*</span>
            </label>
            <div className={styles.inputWrapper}>
              <Contact className={styles.inputIcon} />
              <input
                type="text"
                placeholder="Enter tax number"
                className={styles.input}
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Phone Number</label>
            <div className={styles.inputWrapper}>
              <Phone className={styles.inputIcon} />
              <input
                type="tel"
                placeholder="Enter phone number"
                className={styles.input}
              />
            </div>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>National ID Number</label>
          <div className={styles.inputWrapper}>
            <Shield className={styles.inputIcon} />
            <input
              type="text"
              placeholder="Enter national ID"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Address</label>
          <div className={styles.inputWrapper}>
            <MapPin className={styles.inputIcon} />
            <input
              type="text"
              placeholder="Enter your address"
              className={styles.input}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export { ClientDetailsForm };
