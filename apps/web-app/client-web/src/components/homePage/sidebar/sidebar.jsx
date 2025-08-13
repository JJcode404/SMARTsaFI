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
  Menu,
  PanelLeft,
  PanelLeftClose,
} from "lucide-react";
import styles from "./sidebar.module.css";
import { useAuth } from "../../../utilites/authContextapi";

const HomeSiderBar = ({ isOpen, onToggle, isMobile }) => {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/account");
  };

  // Close sidebar when nav item is clicked on mobile
  const handleNavClick = () => {
    if (isMobile) {
      onToggle(false);
    }
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
    <>
      {/* Toggle Button - Visible on all screen sizes */}
      <button
        onClick={() => onToggle(!isOpen)}
        className={`${styles.toggleButton} ${
          isOpen && !isMobile ? styles.toggleButtonOpen : ""
        }`}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        title={isOpen ? "Close sidebar" : "Open sidebar"}
        type="button"
      >
        {isOpen ? (
          <PanelLeftClose className={styles.toggleIcon} />
        ) : (
          <PanelLeft className={styles.toggleIcon} />
        )}
      </button>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className={styles.overlay}
          onClick={() => onToggle(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${styles.sidebar} ${
          !isOpen ? styles.sidebarClosed : styles.sidebarOpen
        }`}
      >
        {/* Header - only show when expanded */}
        <div
          className={`${styles.sidebarHeader} ${
            !isOpen ? styles.headerHidden : ""
          }`}
        >
          <div className={styles.logoContainer}>
            <div className={styles.logoIcon}>
              <img
                src="/smart-safi(main-logo).jpg"
                alt="SmartSafi Logo"
                className={styles.brandLogo}
              />
            </div>
            <span className={styles.logoText}>SmartSafi</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          {navItems.map(({ id, icon: Icon, label, path }) => (
            <Link
              key={id}
              to={path}
              className={`${styles.navItem} ${
                location.pathname === path ? styles.navItemActive : ""
              } ${!isOpen ? styles.navItemCollapsed : ""}`}
              onClick={handleNavClick}
              title={!isOpen ? label : ""}
            >
              <Icon className={styles.navIcon} />
              <span
                className={`${styles.navLabel} ${
                  !isOpen ? styles.navLabelHidden : ""
                }`}
              >
                {label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className={styles.logoutContainer}>
          <button
            className={`${styles.logoutButton} ${
              !isOpen ? styles.logoutButtonCollapsed : ""
            }`}
            onClick={handleLogout}
            type="button"
            title={!isOpen ? "Log Out" : ""}
          >
            <LogOut className={styles.navIcon} />
            <span
              className={`${styles.navLabel} ${
                !isOpen ? styles.navLabelHidden : ""
              }`}
            >
              Log Out
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default HomeSiderBar;
export { HomeSiderBar };
