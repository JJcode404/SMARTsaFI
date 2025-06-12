import styles from "./header.module.css";
function Navbar() {
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
        <ul className={styles.menu}>
          <li>Home</li>
          <li>FAQ</li>
          <li>Contact Us</li>
          <li>Testimonials</li>
          <li>Shop</li>
          <li>Gallery</li>
        </ul>
        <div className={styles.icons}>
          <span>
            <img src="./icons/search.svg" alt="serach icon" />
          </span>
          <span>
            <img src="./icons/shopping-cart.svg" alt="shopping cart icon" />
          </span>
          <span>
            <img src="./icons/user.svg" alt="user icon" />
          </span>
        </div>
      </nav>
    </header>
  );
}

export { Navbar };
