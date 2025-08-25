import { useState } from "react";

const usePutReq = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const putData = async (url, payload) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
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

  return { data, error, loading, putData };
};

export { usePutReq };
