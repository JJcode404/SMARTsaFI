import { Outlet } from "react-router-dom";
import { HomeSiderBar } from "../../components/homePage/sidebar/sidebar";
import styles from "./homePage.module.css";
import { HeaderNav } from "../../components/homePage/headerNav/headerNav";
import { BookingProvider } from "../../utilites/bookingContext";

const HomePage = () => {
  return (
    <BookingProvider>
      <div className={styles.container}>
        <HomeSiderBar />
        <div className={styles.mainContent}>
          <HeaderNav />
          <Outlet />
        </div>
      </div>
    </BookingProvider>
  );
};

export { HomePage };
