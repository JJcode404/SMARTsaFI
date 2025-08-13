import { Outlet } from "react-router-dom";
import { HomeSiderBar } from "../../components/homePage/sidebar/sidebar";
import styles from "./homePage.module.css";
import { HeaderNav } from "../../components/homePage/headerNav/headerNav";
import { BookingProvider } from "../../utilites/bookingContext";
import NotificationUI from "../../components/homePage/notification/notification";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // On mobile, start with sidebar closed
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <BookingProvider>
      <div className={styles.container}>
        <HomeSiderBar
          isOpen={isSidebarOpen}
          onToggle={setIsSidebarOpen}
          isMobile={isMobile}
        />
        <main
          className={`${styles.mainContent} ${
            !isMobile && isSidebarOpen ? styles.mainContentPushed : ""
          } ${!isMobile && !isSidebarOpen ? styles.mainContentCollapsed : ""}`}
        >
          {/* Header - fixed height, doesn't scroll */}
          <HeaderNav
            onNotificationClick={() => setShowNotification((prev) => !prev)}
          />

          {/* Notification Panel */}
          {showNotification && (
            <div className={styles.notificationPanel}>
              <NotificationUI
                onNotificationClick={() => setShowNotification((prev) => !prev)}
              />
            </div>
          )}

          {/* Scrollable Content Area */}
          <div className={styles.contentArea}>
            <Outlet />
          </div>
        </main>
      </div>
    </BookingProvider>
  );
};

export { HomePage };
