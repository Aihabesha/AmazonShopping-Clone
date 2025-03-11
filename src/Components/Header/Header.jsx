import React, { useContext } from "react";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl";
import { Link } from "react-router-dom"; // Import Link
import classes from "./Header.module.css";
import LowerHeader from "./LowerHeader";
import { DataContext } from "../DataProvider/DataProvider"; // ✅ Import DataContext

function Header() {
  const contextValue = useContext(DataContext);

  if (!contextValue) {
    console.error("🚨 Error: DataContext is undefined. Ensure DataProvider wraps App.");
    return <p>Error: DataContext not found!</p>;
  }

  const { state, dispatch } = contextValue; // ✅ Safe destructuring

  if (!state) {
    console.error("🚨 Error: state is undefined.");
    return <p>Error: State not available!</p>;
  }

  const { basket } = state || { basket: [] }; // ✅ Safe fallback for basket

  return (
    <section className={classes.fixed}>
      <header className={classes.header}>
        <div className={classes.header_top}>
          <div className={classes.header_logo}>
            {/* Logo */}
            <Link to="/" aria-label="Amazon Home">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="Amazon Logo"
                className={classes.header_logo_image}
              />
            </Link>
            {/* Delivery */}
            <span className={classes.header_location_icon} aria-label="Location">
              <SlLocationPin />
            </span>
            <div className={classes.header_delivery}>
              <p>Delivered to Nesru</p>
              <span>Portland 97230</span>
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
              placeholder="Search Amazon"
              className={classes.header_search_input}
              aria-label="Search Amazon"
            />
            <BsSearch className={classes.header_search_icon} aria-label="Search" />
          </div>

          {/* Right Side Links */}
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

            {/* Sign In */}
            <Link to="/auth" className={classes.header_account} aria-label="Account and Lists">
              <div>
                <p>Sign In</p>
                <p>Account & Lists</p>
              </div>
            </Link>

            {/* Orders */}
            <Link to="/orders" className={classes.header_orders} aria-label="Returns and Orders">
              <p>Returns</p>
              <p>& Orders</p>
            </Link>

            {/* Cart */}
            <div className={classes.header_cart}>
              <Link to="/cart" className={classes.cart} aria-label="Shopping Cart">
                <BiCart size={35} />
                <span> {basket?.length || 0} </span>
              </Link>
            </div>
          </nav>
        </div>
      </header>
      <LowerHeader />
    </section>
  );
}

export default Header;
