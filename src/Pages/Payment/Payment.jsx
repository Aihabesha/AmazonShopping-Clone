import React, { useContext, useState, useEffect } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Products/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();

  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
  const total = basket?.reduce((amount, item) => item.price * item.amount + amount, 0);

  const [clientSecret, setClientSecret] = useState("");
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  // Generate clientSecret from the backend
  useEffect(() => {
    if (basket.length === 0) return;

    const getClientSecret = async () => {
      try {
        const res = await axiosInstance.post(`/payment/create?total=${total * 100}`);
        setClientSecret(res.data.clientSecret);
        console.log("Client Secret:", res.data.clientSecret); // Log the clientSecret
      } catch (err) {
        console.error("Error creating payment intent:", err);
      }
    };

    getClientSecret();
  }, [basket, total]);

  // Handle form change
  const handleChange = (e) => {
    setCardError(e.error ? e.error.message : "");
  };

  // Handle payment
  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);

    if (!stripe || !elements || !clientSecret) {
      console.error("Stripe or Elements not initialized or clientSecret is missing.");
      setProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    console.log("Confirming payment with Stripe...");

    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      console.error("Error confirming payment:", error.message);
      setCardError(error.message);
      setProcessing(false);
      return; // Exit early if there’s an error
    }

    console.log("Payment Intent Confirmed:", paymentIntent);

    // Step 3: Save order to Firestore
    try {
      const sanitizedBasket = basket.map(item => ({
        id: item.id,
        amount: item.amount,
        price: item.price,
      }));

      console.log("Saving Order to Firestore with the following data:", {
        basket: sanitizedBasket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      await db.collection("users").doc(user.uid).collection("orders").doc(paymentIntent.id).set({
        basket: sanitizedBasket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      console.log("Order saved successfully!");

      // Clear basket and redirect
      dispatch({ type: "EMPTY_BASKET" });
      setProcessing(false);
      navigate("/orders", { state: { msg: "You have placed a new Order" } });
    } catch (error) {
      console.error("Error saving order to Firestore:", error.code, error.message);
      setCardError("Failed to save your order. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      <div className={classes.payment_header}>Checkout {totalItem} items</div>
      <section className={classes.Payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex />
            ))}
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Payment method</h3>
          <div className={classes.payment_card_container}>
            <form onSubmit={handlePayment} className={classes.payment_details}>
              {cardError && <small style={{ color: "red" }}>{cardError}</small>}
              <CardElement onChange={handleChange} />
              <div className={classes.payment_price}>
                <div>
                  <span style={{ display: "flex", gap: "10px" }}>
                    <p>Total Order |</p> <CurrencyFormat amount={total} />
                  </span>
                </div>
                <button type="submit" disabled={!stripe || processing || !clientSecret}>
                  {processing ? (
                    <div className={classes.loading}>
                      <ClipLoader color="gray" size={12} />
                      <p>Please wait ....</p>
                    </div>
                  ) : (
                    "Pay Now"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
