import { ScheduleService } from "../../components/schedule-components/schedule";
import { useBooking } from "../../utilites/bookingContext";
import { Location } from "../location/location";
import { ServiceDetails } from "../serviceDetails/serviceDetails";
import { Bookingheader } from "./header";
import { ProgressBar } from "./progressBar";
import { Checkout } from "../checkout/checkout";
import { ConfirmationPage } from "../paymentSuccesful/paymentSuccessful";

const Booking = () => {
  const { current, isSubmitted } = useBooking();
  const components = [
    <ServiceDetails />,
    <Location />,
    <ScheduleService />,
    <Checkout />,
  ];

  const CurrentComponent = components[current];

  return (
    <div>
      {isSubmitted ? (
        <ConfirmationPage />
      ) : (
        <>
          <Bookingheader />
          <ProgressBar />
          {CurrentComponent}
        </>
      )}
    </div>
  );
};

export { Booking };
