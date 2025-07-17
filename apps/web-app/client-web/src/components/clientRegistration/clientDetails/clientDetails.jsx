import {
  Building2,
  Contact,
  Shield,
  User,
  Phone,
  MapPin,
  FileText,
} from "lucide-react";
import styles from "./clientDetails.module.css";
import { useClientRegistration } from "../../../utilites/clientRegistrationContext";

const ClientDetailsForm = () => {
  const { state, setField } = useClientRegistration();
  const clientType = state.formData.client_type;

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
        {clientType === "Individual" ? (
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                First Name <span className={styles.required}>*</span>
              </label>
              <div className={styles.inputWrapper}>
                <User className={styles.inputIcon} />
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Enter first name"
                  value={state.formData.first_name}
                  onChange={(e) => setField("first_name", e.target.value)}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Last Name <span className={styles.required}>*</span>
              </label>
              <div className={styles.inputWrapper}>
                <User className={styles.inputIcon} />
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Enter last name"
                  value={state.formData.last_name}
                  onChange={(e) => setField("last_name", e.target.value)}
                />
              </div>
            </div>
          </div>
        ) : (
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
                value={state.formData.organization_name}
                onChange={(e) => setField("organization_name", e.target.value)}
              />
            </div>
          </div>
        )}

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
                value={state.formData.tax_number}
                onChange={(e) => setField("tax_number", e.target.value)}
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
                value={state.formData.phone_number}
                onChange={(e) => setField("phone_number", e.target.value)}
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
              value={state.formData.national_id_number}
              onChange={(e) => setField("national_id_number", e.target.value)}
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
              value={state.formData.address}
              onChange={(e) => setField("address", e.target.value)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export { ClientDetailsForm };
