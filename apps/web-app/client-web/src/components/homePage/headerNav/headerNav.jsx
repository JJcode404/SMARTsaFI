import { useState } from "react";
import { Bell, Search, Moon, Sun, Menu } from "lucide-react";
import styles from "./headerNav.module.css";

const HeaderNav = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.body.classList.toggle("dark-mode");
  };

  const toggleSidebar = () => {
    const sidebar = document.querySelector(".sidebar"); // Adjust selector as needed
    if (sidebar) {
      sidebar.classList.toggle("open");
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.headerLeft}>
          <button
            onClick={toggleSidebar}
            className={`${styles.menuButton} ${styles.menuButtonDesktop}`}
          >
            <Menu style={{ width: "1.25rem", height: "1.25rem" }} />
          </button>

          {/* Search Bar */}
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search services or providers..."
              className={styles.searchInput}
            />
          </div>
        </div>

        <div className={styles.headerRight}>
          {/* Notifications */}
          <div className={styles.notificationButton}>
            <button className={styles.headerButton}>
              <Bell style={{ width: "1.25rem", height: "1.25rem" }} />
              <span className={styles.notificationBadge}></span>
            </button>
          </div>

          {/* User Profile */}
          <div className={styles.userProfile}>
            <div className={styles.userAvatar}>
              <span>JD</span>
            </div>
            <div className={styles.userInfo}>
              <p className={styles.userName}>John Doe</p>
              <p className={styles.userRole}>Premium Member</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export { HeaderNav };
