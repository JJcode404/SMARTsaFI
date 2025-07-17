import {
  UploadCloud,
  FileText,
  Shield,
  Image as ImageIcon,
} from "lucide-react";
import styles from "./clientDocuments.module.css";
import { useState } from "react";

const ClientDocumentUploads = () => {
  const [files, setFiles] = useState({
    id: null,
    tax: null,
    photo: null,
  });

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [type]: file }));
    }
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [type]: file }));
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
          onDrop={(e) => handleDrop(e, "id")}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            onChange={(e) => handleFileChange(e, "id")}
            className={styles.fileInput}
            hidden
          />
          <div className={styles.iconWrapper}>
            <Shield className={styles.icon} />
          </div>
          <p className={styles.cardText}>Upload ID Proof</p>
          {files.id && (
            <p className={styles.fileName}>Uploaded: {files.id.name}</p>
          )}
        </label>

        {/* Tax Document Proof */}
        <label
          className={styles.card}
          onDrop={(e) => handleDrop(e, "tax")}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            onChange={(e) => handleFileChange(e, "tax")}
            className={styles.fileInput}
            hidden
          />
          <div className={styles.iconWrapper}>
            <FileText className={styles.icon} />
          </div>
          <p className={styles.cardText}>Upload Tax Document</p>
          {files.tax && (
            <p className={styles.fileName}>Uploaded: {files.tax.name}</p>
          )}
        </label>

        {/* Profile Picture */}
        <label
          className={styles.card}
          onDrop={(e) => handleDrop(e, "photo")}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            onChange={(e) => handleFileChange(e, "photo")}
            className={styles.fileInput}
            hidden
          />
          <div className={styles.iconWrapper}>
            <ImageIcon className={styles.icon} />
          </div>
          <p className={styles.cardText}>Upload Photo</p>
          {files.photo && (
            <p className={styles.fileName}>Uploaded: {files.photo.name}</p>
          )}
        </label>
      </div>
    </div>
  );
};

export { ClientDocumentUploads };
