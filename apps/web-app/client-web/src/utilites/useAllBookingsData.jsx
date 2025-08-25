import { useEffect, useState } from "react";
import { useFetch } from "./useFetch";
import { useClientData } from "./useClientData";

const useAllBookingsData = () => {
  const { data } = useClientData();
  const [bookingUrl, setBookingUrl] = useState(null);
  const [requestUrl, setRequestUrl] = useState(null);

  useEffect(() => {
    if (data?.id) {
      setBookingUrl(`http://127.0.0.1:8000/bookings/client/${data.id}`);
      setRequestUrl(
        `http://127.0.0.1:8000/bookings/requests/client/${data.id}`
      );
    }
  }, [data]);

  const {
    data: bookingData,
    loading: bookingLoading,
    refetch: refetchBookings,
  } = useFetch(bookingUrl);

  const {
    data: requestData,
    loading: requestLoading,
    refetch: refetchRequests,
  } = useFetch(requestUrl);

  // Combine results into one array (skip nulls)
  const combined = [
    ...(bookingData
      ? bookingData.map((b) => ({ ...b, source: "booking" }))
      : []),
    ...(requestData
      ? requestData.map((r) => ({ ...r, source: "request" }))
      : []),
  ];

  const refetch = async () => {
    await Promise.all([refetchBookings(), refetchRequests()]);
  };

  return {
    data: combined,
    loading: bookingLoading || requestLoading,
    refetch,
  };
};

export { useAllBookingsData };
