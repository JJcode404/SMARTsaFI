import { RootLayout } from "./rootlayout";
import { LandingPage } from "../pages/landing-page/landingPage";
import { AuthPage } from "../pages/authPage/authPage";

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
];

export { routes };
