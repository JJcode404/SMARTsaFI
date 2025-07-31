import { ProgressBar } from "../booking/progressBar";
import {
  ClientRegistrationProvider,
  useClientRegistration,
} from "../../utilites/clientRegistrationContext";
import { ClientType } from "../../components/clientRegistration/clientType/clientType";
import { ClientDetailsForm } from "../../components/clientRegistration/clientDetails/clientDetails";
import { ClientDocumentUploads } from "../../components/clientRegistration/clientDocuments/clientDocuments";
import { RegistrationSummary } from "../../components/clientRegistration/RegistraionSummary/registrationSummary";
import { Header } from "../authPage/authPage";
import PaginationButtons from "../../components/clientRegistration/pagination/pagination";
import { SuccessfulRegistrationPage } from "../../components/clientRegistration/successfulRegistration/successfulRegistration";

const RegistrationContent = () => {
  const { state } = useClientRegistration();
  const components = [
    <ClientType state={state} />,
    <ClientDetailsForm />,
    <ClientDocumentUploads />,
    <RegistrationSummary />,
  ];

  const CurrentComponent = components[state.current];
  const steps = [
    { full: "Client Type", short: "Service" },
    { full: "Client Details", short: "Location" },
    { full: "Document Uploads ", short: "Date" },
    { full: "Verification", short: "Date" },
  ];
  const title = "Client Registration";
  const subtitle = "Complete your registration in 4 easy steps";

  return (
    <div>
      {state.isSubmitted ? (
        <SuccessfulRegistrationPage />
      ) : (
        <>
          <Header />
          <ProgressBar
            steps={steps}
            currentStep={state.current}
            title={title}
            subtitle={subtitle}
          />
          <div
            className="container"
            style={{
              maxWidth: "900px",
              margin: "20px auto",
              background: "white",
              borderRadius: "20px",
              width: "100%",
              padding: "2em 20px",
              minHeight: "0px",
            }}
          >
            {CurrentComponent}
            {state.current >= 1 && <PaginationButtons />}
          </div>
        </>
      )}
    </div>
  );
};
const ClientRegistrationPage = () => (
  <ClientRegistrationProvider>
    <RegistrationContent />
  </ClientRegistrationProvider>
);

export { ClientRegistrationPage };
