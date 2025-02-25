import React from "react";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl";
import classes from "./Header.module.css";

function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.header_top}>
        <div className={classes.header_logo}>
          {/* logo */}
          <a href="#" aria-label="Amazon Home">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="Amazon Logo"
              className={classes.header_logo_image}
            />
          </a>
          {/* delivery */}
          <span className={classes.header_location_icon} aria-label="Location">
            <SlLocationPin />
          </span>
          <div className={classes.header_delivery}>
            <p>Delivered to</p>
            <span>USA</span>
          </div>
        </div>
        <div className={classes.header_search}>
          <select name="categories" id="categories" className={classes.header_search_dropdown}>
            <option value="All">All</option>
          </select>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search product"
            className={classes.header_search_input}
            aria-label="Search products"
          />
          <BsSearch className={classes.header_search_icon} aria-label="Search" />
        </div>
        {/* right side link */}
        <nav className={classes.header_links}>
          <div className={classes.header_language}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_the_United_States.png/800px-Flag_of_the_United_States.png"
              alt="US Flag"
              className={classes.header_language_flag}
            />
            <select className={classes.header_language_dropdown} aria-label="Language">
              <option value="EN">EN</option>
            </select>
          </div>
          {/* three components */}
          <a href="#" className={classes.header_account} aria-label="Account and Lists">
            <div>
              <p>Sign In</p>
              <p>Account & Lists</p>
            </div>
          </a>
          {/* order */}
          <a href="#" className={classes.header_orders} aria-label="Returns and Orders">
            <p>Returns</p>
            <p>& Orders</p>
          </a>
          <div className={classes.header_cart}>
            <BiCart className={classes.header_cart_icon} aria-label="Cart" />
            <a href="/cart" className={classes.header_cart_link}>
              <span className={classes.header_cart_count}>0</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;