import { useState } from "react";
import styles from "./header.module.css";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.topNotice}>
        📯 Sign up to our email list and become a member today! 🕊️
      </div>
      <nav className={styles.navbar}>
        <img
          src="/logo.png"
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
          <span>
            <img src="./icons/user.svg" alt="user icon" />
          </span>
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
