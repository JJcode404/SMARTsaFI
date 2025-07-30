// hooks/useClientData.js
import { useEffect, useState } from "react";
import { useAuth } from "./authContextapi";
import { useFetch } from "./useFetch";

const useClientData = () => {
  const { user } = useAuth();
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (user?.client_id) {
      setUrl(`http://127.0.0.1:8000/clients/${user.client_id}`);
    }
  }, [user]);

  return useFetch(url);
};

export { useClientData };
