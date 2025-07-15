import { ArrowLeft, Menu, X } from "lucide-react";
import styles from "./booking.module.css";
import { useState } from "react";

const Bookingheader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <img src="/smart-safi(main-logo).jpg" className={styles.brandLogo} />

      {/* Mobile Toggle */}
      <button
        className={styles.mobileMenuToggle}
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
      >
        {isMobileMenuOpen ? <X /> : <Menu />}
      </button>

      <div
        className={`${styles.left} ${isMobileMenuOpen ? styles.showMenu : ""}`}
      >
        <ul className={styles.navbar}>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
          <li>
            <a href="#" role="button">
              My Bookings
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export { Bookingheader };
