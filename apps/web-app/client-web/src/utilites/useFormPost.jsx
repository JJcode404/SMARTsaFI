import { useState } from "react";

const useFormPostReq = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const postFormData = async (url, formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // ❗ Do not set Content-Type manually when sending FormData!
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        const message =
          response.status === 403
            ? errorData.error || "Session expired. Please log in again."
            : errorData.error || "Server error";
        throw new Error(message);
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || "Unknown error");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, postFormData };
};

export { useFormPostReq };
