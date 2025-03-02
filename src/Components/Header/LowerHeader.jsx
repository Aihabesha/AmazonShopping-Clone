import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import styles from "./Header.module.css"; // Import from Header.module.css

function LowerHeader() {
  return (
    <div className={styles.lower_header}>
      <ul className={styles.nav_list}>
        <li className={styles.nav_item}>
          <GiHamburgerMenu className={styles.menu_icon} />
          <p>All</p>
        </li>
        <li className={styles.nav_item}>Today's Deals</li>
        <li className={styles.nav_item}>Customer Service</li>
        <li className={styles.nav_item}>Registry</li>
        <li className={styles.nav_item}>Gift Cards</li>
        <li className={styles.nav_item}>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader;
