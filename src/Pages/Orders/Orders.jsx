import React, { useContext, useEffect, useState } from "react";
import classes from "./Orders.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Products/ProductCard";
import Loader from "../../Components/Loader/Loader";

function Orders() {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot?.docs?.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
          setIsLoading(false);
        });
    } else {
      setOrders([]);
      setIsLoading(false);
    }
  }, [user]);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>

          {isLoading ? (
            <div className={classes.loader_wrapper}>
              <Loader />
            </div>
          ) : orders.length === 0 ? (
            <div className={classes.no_orders}>You don't have any orders yet.</div>
          ) : (
            orders.map((eachOrder) => (
              <div key={eachOrder.id} className={classes.order_block}>
                <div className={classes.order_header}>
                  <p><strong>Order ID:</strong> {eachOrder.id}</p>
                  <p><strong>Date:</strong> {new Date(eachOrder.data.created * 1000).toLocaleDateString()}</p>
                </div>

                {eachOrder.data.basket?.map((item, index) => (
                  <div key={item.id || index} className={classes.order_item}>
                    <ProductCard
                      product={item}
                      flex={true}
                      renderDesc={false}
                      renderAdd={false}
                    />
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
