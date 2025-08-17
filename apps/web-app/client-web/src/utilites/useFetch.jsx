import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchData = useCallback(async () => {
    if (!url) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setStatus(null);

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setStatus(response.status);

      if (!response.ok) {
        const errorObj = {
          message:
            response.status === 404
              ? "Resource not found"
              : `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
        };
        setError(errorObj);
        return;
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError({
        message: err.message || "Unknown error",
        originalError: err,
      });
    } finally {
      setLoading(false);
    }
  }, [url, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, status, loading, refetch: fetchData };
};

export { useFetch };
