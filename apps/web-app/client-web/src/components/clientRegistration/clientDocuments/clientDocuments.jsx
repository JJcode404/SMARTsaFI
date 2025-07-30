import {
  UploadCloud,
  FileText,
  Shield,
  Image as ImageIcon,
} from "lucide-react";
import styles from "./clientDocuments.module.css";
import { useClientRegistration } from "../../../utilites/clientRegistrationContext";

const ClientDocumentUploads = () => {
  const { state, setFile } = useClientRegistration();

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFile(type, file);
    }
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFile(type, file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

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
          className={styles.card}
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
        </label>

        {/* Tax Document Proof */}
        <label
          className={styles.card}
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
        </label>

        {/* Profile Picture */}
        {/* <label
          className={styles.card}
          onDrop={(e) => handleDrop(e, "profile_picture")}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            onChange={(e) => handleFileChange(e, "profile_picture")}
            className={styles.fileInput}
            hidden
          />
          <div className={styles.iconWrapper}>
            <ImageIcon className={styles.icon} />
          </div>
          <p className={styles.cardText}>Upload Photo</p>
          {state.formData.profile_picture && (
            <p className={styles.fileName}>
              Uploaded: {state.formData.profile_picture.name}
            </p>
          )}
        </label> */}
      </div>
    </div>
  );
};

export { ClientDocumentUploads };
