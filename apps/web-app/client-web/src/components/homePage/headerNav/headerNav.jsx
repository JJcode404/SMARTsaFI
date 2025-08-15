import { useEffect, useState } from "react";
import { Bell, Search, Moon, Sun, Menu } from "lucide-react";
import styles from "./headerNav.module.css";
import { useClientData } from "../../../utilites/useClientData";

const HeaderNav = ({ onNotificationClick }) => {
  const [darkMode, setDarkMode] = useState(false);
  const { data, loading, error } = useClientData();

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

  const getInitials = (fullName) => {
    if (!fullName) return "U";
    return fullName
      .split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getProfileImageUrl = (imagePath) => {
    if (!imagePath) return null;
    return `http://127.0.0.1:8000/${imagePath}`;
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
            <button
              className={styles.headerButton}
              onClick={onNotificationClick}
            >
              <Bell style={{ width: "1.25rem", height: "1.25rem" }} />
              <span className={styles.notificationBadge}></span>
            </button>
          </div>

          {/* User Profile */}
          <div className={styles.userProfile}>
            <div className={styles.avatarWrapper}>
              {data?.profile_picture ? (
                <img
                  src={getProfileImageUrl(data.profile_picture)}
                  alt="Profile"
                  className={styles.avatarImage}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
              ) : null}
              <div
                className={styles.userAvatar}
                style={{
                  display: data?.profile_picture ? "none" : "flex",
                }}
              >
                <span>
                  {getInitials(
                    [data?.first_name, data?.last_name]
                      .filter(Boolean)
                      .join(" ")
                  )}
                </span>
              </div>
            </div>
            <div className={styles.userInfo}>
              <p className={styles.userName}>
                {[data?.first_name, data?.last_name].filter(Boolean).join(" ")}
              </p>
              <p className={styles.userRole}>Premium Member</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export { HeaderNav };
