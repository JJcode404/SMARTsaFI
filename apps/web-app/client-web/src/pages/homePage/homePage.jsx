import { Outlet } from "react-router-dom";
import { HomeSiderBar } from "../../components/homePage/sidebar/sidebar";
import styles from "./homePage.module.css"; // you'll create this file
import { HeaderNav } from "../../components/homePage/headerNav/headerNav";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <HomeSiderBar />
      <div className={styles.mainContent}>
        <HeaderNav />
        <Outlet />
      </div>
    </div>
  );
};

export { HomePage };
