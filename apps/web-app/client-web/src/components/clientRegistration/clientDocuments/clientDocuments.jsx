import { UploadCloud, FileText, Shield } from "lucide-react";
import styles from "./clientDocuments.module.css";
import { useClientRegistration } from "../../../utilites/clientRegistrationContext";

const ClientDocumentUploads = () => {
  const { state, setFile, setFieldError, clearFieldError } =
    useClientRegistration();

  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];

  const validateAndSetFile = (file, type) => {
    if (!file) {
      setFieldError(type, "File is required");
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      setFieldError(
        type,
        "Invalid file type. Only PDF, JPEG, or PNG are allowed."
      );
      return;
    }

    if (file.size > maxSize) {
      setFieldError(type, "File is too large. Max size is 5MB.");
      return;
    }

    clearFieldError(type);
    setFile(type, file);
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    validateAndSetFile(file, type);
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    validateAndSetFile(file, type);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const renderFieldError = (field) =>
    state.fieldErrors[field] && (
      <p className={styles.fieldError}>{state.fieldErrors[field]}</p>
    );

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          <UploadCloud className={styles.headerIcon} />
          <div className={styles.intro}>
            <h1 className={styles.title}>Document Uploads</h1>
            <p className={styles.subtitle}>
              Submit required verification documents
            </p>
          </div>
        </div>
        <p className={styles.startText}>Upload your documents!</p>
      </div>

      <div className={styles.grid}>
        {/* National ID Proof */}
        <label
          className={`${styles.card} ${
            state.fieldErrors["national_id_proof"] ? styles.errorCard : ""
          }`}
          onDrop={(e) => handleDrop(e, "national_id_proof")}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            onChange={(e) => handleFileChange(e, "national_id_proof")}
            className={styles.fileInput}
            hidden
          />
          <div className={styles.iconWrapper}>
            <Shield className={styles.icon} />
          </div>
          <p className={styles.cardText}>Upload ID Proof</p>
          {state.formData.national_id_proof && (
            <p className={styles.fileName}>
              Uploaded: {state.formData.national_id_proof.name}
            </p>
          )}
          {renderFieldError("national_id_proof")}
        </label>

        {/* Tax Document Proof */}
        <label
          className={`${styles.card} ${
            state.fieldErrors["tax_document_proof"] ? styles.errorCard : ""
          }`}
          onDrop={(e) => handleDrop(e, "tax_document_proof")}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            onChange={(e) => handleFileChange(e, "tax_document_proof")}
            className={styles.fileInput}
            hidden
          />
          <div className={styles.iconWrapper}>
            <FileText className={styles.icon} />
          </div>
          <p className={styles.cardText}>Upload Tax Document</p>
          {state.formData.tax_document_proof && (
            <p className={styles.fileName}>
              Uploaded: {state.formData.tax_document_proof.name}
            </p>
          )}
          {renderFieldError("tax_document_proof")}
        </label>
      </div>
    </div>
  );
};

export { ClientDocumentUploads };
