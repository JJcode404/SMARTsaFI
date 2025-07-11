import { useState, useRef, useEffect } from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleAccountDropdown = () => {
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
  };

  const handleLoginOption = (type) => {
    if (type === "customer") {
      navigate("/account");
    }
    // console.log(`Login as ${type}`);
    setIsAccountDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAccountDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.topNotice}>
        <span>📯</span> Sign up to our email list and become a member today!{" "}
        <span>🕊️</span>
      </div>
      <nav className={styles.navbar}>
        <img
          src="/smart-safi.svg"
          alt="SMARTsaFi Cleaning Services"
          className={styles.logo}
        />
        {/* Desktop Menu */}
        <ul className={`${styles.menu} ${styles.desktopMenu}`}>
          <li>Home</li>
          <li>FAQ</li>
          <li>Contact Us</li>
          <li>Testimonials</li>
          <li>Shop</li>
          <li>Gallery</li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className={styles.mobileMenuToggle}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className={styles.hamburger}></span>
          <span className={styles.hamburger}></span>
          <span className={styles.hamburger}></span>
        </button>

        <div className={styles.icons}>
          <span>
            <img src="./icons/search.svg" alt="search icon" />
          </span>
          <span>
            <img src="./icons/shopping-cart.svg" alt="shopping cart icon" />
          </span>
          {/* Account Dropdown */}
          <div className={styles.accountDropdown} ref={dropdownRef}>
            <span
              className={styles.accountIcon}
              onClick={toggleAccountDropdown}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && toggleAccountDropdown()}
            >
              <img src="./icons/user.svg" alt="user icon" />
            </span>

            {isAccountDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <div className={styles.dropdownHeader}>
                  <p>Choose Login Type</p>
                </div>

                <button
                  className={styles.dropdownOption}
                  onClick={() => handleLoginOption("customer")}
                >
                  <div className={styles.optionIcon}>
                    <img src="./icons/user.svg" alt="customer icon" />
                  </div>
                  <div className={styles.optionContent}>
                    <div className={styles.optionTitle}>Login as Customer</div>
                    <div className={styles.optionSubtitle}>
                      Access customer services
                    </div>
                  </div>
                </button>

                <button
                  className={styles.dropdownOption}
                  onClick={() => handleLoginOption("service provider")}
                >
                  <div className={styles.optionIcon}>
                    <img src="./icons/user.svg" alt="service provider icon" />
                  </div>
                  <div className={styles.optionContent}>
                    <div className={styles.optionTitle}>
                      Login as Service Provider
                    </div>
                    <div className={styles.optionSubtitle}>
                      Manage your services
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${
          isMobileMenuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <ul className={styles.mobileMenuList}>
          <li onClick={() => setIsMobileMenuOpen(false)}>Home</li>
          <li onClick={() => setIsMobileMenuOpen(false)}>FAQ</li>
          <li onClick={() => setIsMobileMenuOpen(false)}>Contact Us</li>
          <li onClick={() => setIsMobileMenuOpen(false)}>Testimonials</li>
          <li onClick={() => setIsMobileMenuOpen(false)}>Shop</li>
          <li onClick={() => setIsMobileMenuOpen(false)}>Gallery</li>
        </ul>
      </div>
    </header>
  );
}

export { Navbar };
