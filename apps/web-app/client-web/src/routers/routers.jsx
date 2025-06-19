import { RootLayout } from "./rootlayout";
import { LandingPage } from "../pages/landing-page/landingPage";
import { AuthPage } from "../pages/authPage/authPage";
import { ServiceDetails } from "../pages/serviceDetails/serviceDetails";

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
];

export { routes };
