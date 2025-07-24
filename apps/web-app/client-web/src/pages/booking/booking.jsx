import { useBooking } from "../../utilites/bookingContext";
import { ScheduleService } from "../schedule-components/schedule";
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
  const steps = [
    { full: "Service Details", short: "Service" },
    { full: "Location", short: "Location" },
    { full: "Date & Time", short: "Date" },
    { full: "Service Provider", short: "Provider" },
    { full: "Payment", short: "Payment" },
  ];
  const title = "Service Details";
  const subtitle = state.service;
  console.log(state.service);
  const CurrentComponent = components[state.current];

  return (
    <div>
      {state.isSubmitted ? (
        <ConfirmationPage />
      ) : (
        <>
          <Bookingheader />
          <ProgressBar
            steps={steps}
            currentStep={state.current}
            title={title}
            subtitle={subtitle}
          />
          {CurrentComponent}
        </>
      )}
    </div>
  );
};

export { Booking };
