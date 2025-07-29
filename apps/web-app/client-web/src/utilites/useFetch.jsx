import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(url);
    if (!url) {
      setError("Url required");
      setLoading(false);
    }
    fetch(`${url}`, { mode: "cors" })
      .then((response) => {
        if (response.status === 404) {
          navigate("/404");
          return null;
        }
        if (response.status >= 400) {
          navigate("/serverError");
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => {
        console.log(response);
        setData(response);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { data, error, loading };
};

export { useFetch };
