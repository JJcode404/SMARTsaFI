import { useEffect, useState } from "react";
import { useFetch } from "./useFetch";
import { useClientData } from "./useClientData";

const useBookingData = () => {
  const { data } = useClientData();
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (data?.id) {
      setUrl(`http://127.0.0.1:8000/bookings/client/${data.id}`);
    }
  }, [data]);

  return useFetch(url);
};

export { useBookingData };
