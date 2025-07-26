import { Outlet } from "react-router-dom";
import { BookingProvider } from "./bookingContext";

const BookingLayout = () => {
  return (
    <BookingProvider>
      <Outlet />
    </BookingProvider>
  );
};
export { BookingLayout };
