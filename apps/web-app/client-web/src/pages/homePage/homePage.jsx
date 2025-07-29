import { Outlet } from "react-router-dom";
import { HomeSiderBar } from "../../components/homePage/sidebar/sidebar";
import styles from "./homePage.module.css";
import { HeaderNav } from "../../components/homePage/headerNav/headerNav";
import { BookingProvider } from "../../utilites/bookingContext";
import NotificationUI from "../../components/homePage/notification/notification";
import { useState } from "react";

const HomePage = () => {
  const [showNotification, setShowNotification] = useState(false);

  return (
    <BookingProvider>
      <div className={styles.container}>
        <HomeSiderBar />
        <div className={styles.mainContent}>
          <HeaderNav
            onNotificationClick={() => setShowNotification((prev) => !prev)}
          />
          {showNotification && (
            <div className={styles.notificationPanel}>
              <NotificationUI
                onNotificationClick={() => setShowNotification((prev) => !prev)}
              />
            </div>
          )}
          <Outlet />
        </div>
      </div>
    </BookingProvider>
  );
};

export { HomePage };
