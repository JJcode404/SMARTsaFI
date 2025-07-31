import { Check, ChevronRight } from "lucide-react";
import { useClientRegistration } from "../../../utilites/clientRegistrationContext";
import styles from "./pagination.module.css";
import { useFormPostReq } from "../../../utilites/useFormPost";
import { useEffect } from "react";

export default function PaginationButtons() {
  const { state, nextStep, prevStep, SubmitDocuments } =
    useClientRegistration();
  useEffect(() => {
    console.log(
      "PaginationButtons mounted with user_id:",
      state.formData.user_id
    );
  }, [state.formData.user_id]);
  const isLastStep = state.current === 3;
  const { postFormData, loading, error, data } = useFormPostReq();

  const submit = async () => {
    const { formData } = state;
    const payload = new FormData();

    if (!formData.user_id) {
      console.error("User ID not ready yet. Aborting form submission.");
      alert("Please wait a moment before submitting. User ID is loading...");
      return;
    }

    // Always required
    payload.append("client_type", formData.client_type);
    payload.append("first_name", formData.first_name);
    payload.append("last_name", formData.last_name);
    payload.append("phone_number", formData.phone_number);
    payload.append("address", formData.address);
    payload.append("user_id", formData.user_id);

    if (formData.profile_picture) {
      payload.append("profile_picture", formData.profile_picture);
    }
    if (formData.tax_document_proof) {
      payload.append("tax_document_proof", formData.tax_document_proof);
    }
    if (formData.national_id_proof) {
      payload.append("national_id_proof", formData.national_id_proof);
    }

    // Conditionally append fields based on client_type
    if (formData.client_type === "organization") {
      if (formData.organization_name) {
        payload.append("organization_name", formData.organization_name);
      }
      if (formData.tax_number) {
        payload.append("tax_number", formData.tax_number);
      }
    } else if (formData.client_type === "individual") {
      if (formData.national_id_number) {
        payload.append("national_id_number", formData.national_id_number);
      }
    }

    try {
      console.log("FormData contents:");
      for (let [key, value] of payload.entries()) {
        console.log(`${key}:`, value);
      }

      const result = await postFormData(
        "http://127.0.0.1:8000/clients/",
        payload
      );
      SubmitDocuments();
      console.log("Success:", result);
    } catch (err) {
      console.error("Failed:", err.message);
    }
  };

  return (
    <div className={styles.footer}>
      <button className={styles.backButton} onClick={prevStep}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </button>

      {isLastStep ? (
        <button
          type="submit"
          className={styles.completeButton}
          onClick={submit}
        >
          <Check size={20} />
          <span>Complete Registration</span>
        </button>
      ) : (
        <button type="button" className={styles.nextButton} onClick={nextStep}>
          <span>Next</span>
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
}
