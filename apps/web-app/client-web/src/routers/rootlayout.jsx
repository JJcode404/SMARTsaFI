import { Outlet } from "react-router-dom";
import { Navbar } from "../components/header/navbar";
import { Footer } from "../components/footer/footer";

const RootLayout = () => {
  return (
    <div className="container">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
export { RootLayout };
