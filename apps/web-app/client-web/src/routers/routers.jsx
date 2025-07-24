import { RootLayout } from "./rootlayout";
import { LandingPage } from "../pages/landing-page/landingPage";
import { AuthPage } from "../pages/authPage/authPage";
import { ServiceDetails } from "../pages/serviceDetails/serviceDetails";
import { BookingProvider } from "../utilites/bookingContext";
import { Booking } from "../pages/booking/booking";
import { ClientRegistrationPage } from "../pages/clientRegistrationPage/clientRegistrationPage";
import { ClientRegistrationProvider } from "../utilites/clientRegistrationContext";
import { ServiceProvidersScreen } from "../pages/serviceProviderViewPage/serviceProviderViewPage";
import { ServiceProviderDetail } from "../pages/serviceProviderDetails/serviceProviderDetails";
import { HomePage } from "../pages/homePage/homePage";
import { Dashboard } from "../components/homePage/dashboard/dashboard";
import { Profile } from "../components/homePage/profile/profile";
import ServiceBookingCard from "../components/homePage/booking/booking";
import ServiceSelectionCard from "../components/homePage/booking/serviceSelection";
import { MyBookings } from "../components/homePage/booking/myBookings";
import { BookingLayout } from "../utilites/bookingLayout";
import { Messaging } from "../components/homePage/messages/messages";

const routes = [
  {
    path: "/",
    element: (
      <BookingProvider>
        <BookingLayout />
      </BookingProvider>
    ),
    children: [
      {
        path: "",
        element: <HomePage />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          { path: "myProfile", element: <Profile /> },
          { path: "cleaners", element: <ServiceProvidersScreen /> },
          { path: "choose-service", element: <ServiceSelectionCard /> },
          { path: "service-type", element: <ServiceBookingCard /> },
          { path: "myBookings", element: <MyBookings /> },
          { path: "messages", element: <Messaging /> },
        ],
      },
      {
        path: "booking",
        element: <Booking />,
      },
    ],
  },
  {
    path: "/account",
    element: <AuthPage />,
  },
  {
    path: "/service-product-detail",
    element: <ServiceDetails />,
  },

  {
    path: "/clientRegistration",
    element: (
      <ClientRegistrationProvider>
        <ClientRegistrationPage />
      </ClientRegistrationProvider>
    ),
  },
  {
    path: "/viewServiceProviders",
    element: <ServiceProvidersScreen />,
  },

  {
    path: "/service-provider/:id",
    element: <ServiceProviderDetail />,
  },
];

export { routes };
