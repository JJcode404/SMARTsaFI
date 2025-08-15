import { useEffect, useState } from "react";
import { useAuth } from "./authContextapi";
import { useFetch } from "./useFetch";

const useBookingData = () => {
  const { user } = useAuth();
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (user?.client_id) {
      setUrl(`http://127.0.0.1:8000/bookings/1`);
    }
  }, [user]);

  return useFetch(url);
};

export { useBookingData };
