import { ScheduleService } from "../../components/schedule-components/schedule";
import { useBooking } from "../../utilites/bookingContext";
import { Location } from "../location/location";
import { ServiceDetails } from "../serviceDetails/serviceDetails";
import { Bookingheader } from "./header";
import { ProgressBar } from "./progressBar";
import { Checkout } from "../checkout/checkout";
import { ConfirmationPage } from "../paymentSuccesful/paymentSuccessful";
import { ServiceProvider } from "../chooseProvider/chooseProvider";

const Booking = () => {
  const { state } = useBooking();
  const components = [
    <ServiceDetails />,
    <Location />,
    <ScheduleService />,
    <ServiceProvider />,
    <Checkout />,
  ];

  const CurrentComponent = components[state.current];

  return (
    <div>
      {state.isSubmitted ? (
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
