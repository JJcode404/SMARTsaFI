import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  Home,
  Calendar,
  MessageCircle,
  CreditCard,
  User,
  Headphones,
  LogOut,
  BrushCleaning,
  X,
} from "lucide-react";
import styles from "./sidebar.module.css";
import { useAuth } from "../../../utilites/authContextapi";

const HomeSiderBar = () => {
  const { logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate("/account");
  };

  const navItems = [
    { id: "dashboard", icon: Home, label: "Dashboard", path: "/" },
    {
      id: "bookings",
      icon: Calendar,
      label: "Bookings",
      path: "/myBookings",
    },
    {
      id: "messages",
      icon: MessageCircle,
      label: "Messages",
      path: "/messages",
    },
    {
      id: "cleaners",
      icon: BrushCleaning,
      label: "Cleaners",
      path: "/cleaners",
    },
    {
      id: "profile",
      icon: User,
      label: "My Profile",
      path: "/myProfile",
    },
    { id: "support", icon: Headphones, label: "Support", path: "/support" },
  ];

  return (
    <div className={`${styles.sidebar} ${!isSidebarOpen ? styles.closed : ""}`}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logoContainer}>
          <div className={styles.logoIcon}>
            <img
              src="/smart-safi(main-logo).jpg"
              alt="SmartSafi Logo"
              className={styles.brandLogo}
            />
          </div>
          <h1 className={styles.logoText}>SmartSafi</h1>
        </div>
        <button onClick={toggleSidebar} className={styles.closeButton}>
          <X className={styles.icon} />
        </button>
      </div>

      <nav className={styles.nav}>
        {navItems.map(({ id, icon: Icon, label, path }) => (
          <Link
            key={id}
            to={path}
            className={`${styles.navItem} ${
              location.pathname === path ? styles.navItemActive : ""
            }`}
          >
            <Icon className={styles.icon} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <div className={styles.logoutContainer}>
        <button className={styles.logoutButton} onClick={handleLogout}>
          <LogOut className={styles.icon} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export { HomeSiderBar };
