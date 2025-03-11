import React, { useContext } from "react";
import Layout from "../../Components/Layout/Layout";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Products/ProductCard";
import { Link } from "react-router-dom";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import classes from "./Cart.module.css";
import { type } from "../../Utility/action.type";

function Cart() {
  const contextValue = useContext(DataContext);

  if (!contextValue) {
    console.error("🚨 Error: DataContext is undefined.");
    return <p>Error: DataContext not found!</p>;
  }

  const { state, dispatch } = contextValue; // Get dispatch from context
  const { basket } = state;

  console.log("🛒 Basket contents:", basket);

  const increment = (item) => {
    dispatch({
      type: type.ADD_TO_BASKET,
      item,
    });
  };

  const decrement = (id) => {
    dispatch({
      type: type.REMOVE_FROM_BASKET,
      id,
    });
  };

  const totalAmount = basket.reduce((amount, item) => {
    if (!item || typeof item.price !== "number") {
      console.error("❌ Error: Invalid item in basket", item);
      return amount;
    }
    return amount + item.price * (item.amount || 1);
  }, 0);

  return (
    <Layout>
      <section className={classes.container}>
        <div>
          <h3 className={classes.cart_container}>Your Shopping Basket</h3>
          <hr />

          {basket.length === 0 ? (
            <p>Oops! No items in your cart</p>
          ) : (
            <div>
              {basket.map((item) => (
                <section className={classes.cart_product} key={item.id}>
                  <ProductCard
                    product={item}
                    renderDescription={true}
                    renderAdd={false}
                    flex={true}
                  />
                  <div>
                    <button onClick={() => increment(item)}>+</button>
                    <span>{ item.amount}</span>
                    <button onClick={() => decrement(item.id)}>-</button>
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>

        {basket.length > 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal ({basket.length} items):</p>
              <CurrencyFormat value={totalAmount} />
            </div>
            <span>
              <input
                type="checkbox"
                id="gift-checkbox"
                aria-label="This order contains a gift"
              />
              <label htmlFor="gift-checkbox">
                <small>This order contains a gift</small>
              </label>
            </span>
            <Link to="/payment" className={classes.checkoutLink}>
              Continue to checkout
            </Link>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Cart;
