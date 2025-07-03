import { RootLayout } from "./rootlayout";
import { LandingPage } from "../pages/landing-page/landingPage";
import { AuthPage } from "../pages/authPage/authPage";
import { ServiceDetails } from "../pages/serviceDetails/serviceDetails";
import { BookingProvider } from "../utilites/bookingContext";
import { Booking } from "../pages/booking/booking";
Booking;

const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
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
    path: "/booking",
    element: (
      <BookingProvider>
        <Booking />
      </BookingProvider>
    ),
  },
];

export { routes };
