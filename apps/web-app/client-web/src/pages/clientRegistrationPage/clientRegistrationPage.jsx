import { ProgressBar } from "../booking/progressBar";
import { useClientRegistration } from "../../utilites/clientRegistrationContext";
import { ClientType } from "../../components/clientRegistration/clientType/clientType";
import { ClientDetailsForm } from "../../components/clientRegistration/clientDetails/clientDetails";
import { ClientDocumentUploads } from "../../components/clientRegistration/clientDocuments/clientDocuments";
import { RegistrationSummary } from "../../components/clientRegistration/RegistraionSummary/registrationSummary";
import { Bookingheader } from "../booking/header";

const ClientRegistrationPage = () => {
  const { state } = useClientRegistration();
  const components = [
    <ClientType />,
    <ClientDetailsForm />,
    <ClientDocumentUploads />,
    <RegistrationSummary />,
  ];

  const CurrentComponent = components[3];
  const steps = [
    { full: "Client Type", short: "Service" },
    { full: "Client Details", short: "Location" },
    { full: "Document Uploads ", short: "Date" },
    { full: "Verification", short: "Date" },
  ];

  return (
    <div>
      {state.isSubmitted ? (
        <div className="success">
          <p>User Registered Succefully</p>
        </div>
      ) : (
        <>
          <Bookingheader />
          <ProgressBar steps={steps} currentStep={state.current} />
          {CurrentComponent}
        </>
      )}
    </div>
  );
};

export { ClientRegistrationPage };
