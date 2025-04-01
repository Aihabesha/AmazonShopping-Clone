import React from "react";
import { FaSearch } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import classes from "./Header.module.css";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom"; // Updated to react-router-dom
import { useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";

function Header() {
  const [{ user, basket }] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  return (
    <section className={classes.fixed}>
      <div className={classes.header_container}>
        <div className={classes.logo_container}>
          <Link to="/">
            <img
              src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
              alt="amazon logo"
            />
          </Link>
          <Link to="" className={classes.delivery}>
            <span>
              <SlLocationPin />
            </span>
            <div>
              <p>Delivered to</p>
              <span>Portland, OR</span>
            </div>
          </Link>
        </div>

        <div className={classes.search}>
          <select name="" id="">
            <option value="">All</option>
          </select>
          <input type="text" name="" placeholder="search product" />
          <FaSearch size={38} />
        </div>

        <div className={classes.order_container}>
          <Link to="" className={classes.language}>
            <img
              src="https://image.shutterstock.com/image-vector/american-flag-usa-design-united-260nw-2477519645.jpg"
              alt="American Flag"
            />
            <select>
              <option value="">EN</option>
            </select>
          </Link>

          <Link to={!user && "/auth"}>
            <div>
              {user ? (
                <>
                  <p>Hello {user?.email?.split("@")[0]}</p>
                  <span
                    onClick={() => {
                      auth.signOut();
                    }}
                  >
                    Sign Out
                  </span>
                </>
              ) : (
                <>
                  <p>Sign In</p>
                  <span>Account & Lists</span>
                </>
              )}
            </div>
          </Link>

          <Link to="/orders">
            <p>Returns</p>
            <span>& Orders</span>
          </Link>

          <Link to="/cart" className={classes.cart}>
            <BiCart size={38} />
            {totalItem > 0 && (
              <span className={classes.orders}>{totalItem}</span>
            )}
            <span>Cart</span>
          </Link>
        </div>
      </div>
      <LowerHeader />
    </section>
  );
}

export default Header;
