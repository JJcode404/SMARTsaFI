import {
  Building2,
  Contact,
  Shield,
  User,
  Phone,
  MapPin,
  FileText,
  Camera,
} from "lucide-react";
import styles from "./clientDetails.module.css";
import { useClientRegistration } from "../../../utilites/clientRegistrationContext";

const ClientDetailsForm = () => {
  const { state, setField, error, setError, clearFieldError, setFieldError } =
    useClientRegistration();
  const clientType = state.formData.client_type;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ["image/jpeg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      setFieldError(
        "profile_picture",
        "Invalid file type. Only JPEG and PNG are allowed."
      );
      console.log("Invalid type");

      return;
    }

    if (file.size > maxSize) {
      setFieldError(
        "profile_picture",
        "File is too large. Maximum allowed size is 5MB."
      );
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setField("profile_picture", file);
    setField("profile_picture_preview", previewUrl);
    clearFieldError("profile_picture");
  };

  const renderFieldError = (field) =>
    state.fieldErrors[field] && (
      <p className={styles.fieldError}>{state.fieldErrors[field]}</p>
    );

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

      {error && <div className={styles.errorMessage}>{error}</div>}

      <form className={styles.form}>
        {clientType === "individual" ? (
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                First Name <span className={styles.required}>*</span>
              </label>
              <div className={styles.inputWrapper}>
                <User className={styles.inputIcon} />
                <input
                  type="text"
                  className={`${styles.input} ${
                    state.fieldErrors["first_name"] ? styles.errorInput : ""
                  }`}
                  placeholder="Enter first name"
                  value={state.formData.first_name}
                  onChange={(e) => {
                    setField("first_name", e.target.value);
                    clearFieldError("first_name");
                  }}
                />
              </div>
              {renderFieldError("first_name")}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Last Name <span className={styles.required}>*</span>
              </label>
              <div className={styles.inputWrapper}>
                <User className={styles.inputIcon} />
                <input
                  type="text"
                  className={`${styles.input} ${
                    state.fieldErrors["last_name"] ? styles.errorInput : ""
                  }`}
                  placeholder="Enter last name"
                  value={state.formData.last_name}
                  onChange={(e) => {
                    setField("last_name", e.target.value);
                    clearFieldError("last_name");
                  }}
                />
              </div>
              {renderFieldError("last_name")}
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
                className={`${styles.input} ${
                  state.fieldErrors["organization_name"]
                    ? styles.errorInput
                    : ""
                }`}
                value={state.formData.organization_name}
                onChange={(e) => {
                  setField("organization_name", e.target.value);
                  clearFieldError("organization_name");
                }}
              />
            </div>
            {renderFieldError("organization_name")}
          </div>
        )}

        <div className={styles.formGroup}>
          <label className={styles.label}>
            {clientType === "individual"
              ? "Profile Picture"
              : "Organization Logo"}
          </label>
          <div className={styles.fileUploadWrapper}>
            <input
              type="file"
              accept="image/*"
              id="profile-picture-upload"
              className={styles.fileInput}
              onChange={handleImageUpload}
            />
            <label
              htmlFor="profile-picture-upload"
              className={`${styles.fileInputLabel} ${
                state.fieldErrors["profile_picture"] ? styles.errorInput : ""
              }`}
            >
              <Camera className={styles.fileInputIcon} />
              <span className={styles.fileInputText}>
                {state.formData.profile_picture
                  ? "Change Image"
                  : "Choose Image"}
              </span>
            </label>
          </div>
          {state.formData.profile_picture_preview && (
            <div className={styles.imagePreview}>
              <img
                src={state.formData.profile_picture_preview}
                alt="Preview"
                className={styles.previewImage}
              />
            </div>
          )}
          {renderFieldError("profile_picture")}
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
                className={`${styles.input} ${
                  state.fieldErrors["tax_number"] ? styles.errorInput : ""
                }`}
                value={state.formData.tax_number}
                onChange={(e) => {
                  setField("tax_number", e.target.value);
                  clearFieldError("tax_number");
                }}
              />
            </div>
            {renderFieldError("tax_number")}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Phone Number</label>
            <div className={styles.inputWrapper}>
              <Phone className={styles.inputIcon} />
              <input
                type="tel"
                placeholder="Enter phone number"
                className={`${styles.input} ${
                  state.fieldErrors["phone_number"] ? styles.errorInput : ""
                }`}
                value={state.formData.phone_number}
                onChange={(e) => {
                  setField("phone_number", e.target.value);
                  clearFieldError("phone_number");
                }}
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
              className={`${styles.input} ${
                state.fieldErrors["national_id_number"] ? styles.errorInput : ""
              }`}
              value={state.formData.national_id_number}
              onChange={(e) => {
                setField("national_id_number", e.target.value);
                clearFieldError("national_id_number");
              }}
            />
          </div>
          {renderFieldError("national_id_number")}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Address</label>
          <div className={styles.inputWrapper}>
            <MapPin className={styles.inputIcon} />
            <input
              type="text"
              placeholder="Enter your address"
              className={`${styles.input} ${
                state.fieldErrors["address"] ? styles.errorInput : ""
              }`}
              value={state.formData.address}
              onChange={(e) => {
                setField("address", e.target.value);
                clearFieldError("address");
              }}
            />
          </div>
          {renderFieldError("address")}
        </div>
      </form>
    </div>
  );
};

export { ClientDetailsForm };
