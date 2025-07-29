import { ArrowLeft, Menu, X } from "lucide-react";
import styles from "./booking.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

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
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/booking-flow/service-type"}>Services</Link>
          </li>
          <li>
            <Link to={"/myBookings"}>My Bookings</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export { Bookingheader };
