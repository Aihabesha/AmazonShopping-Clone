import React, { useContext, useEffect, useState } from "react";
import classes from "./Orders.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Products/ProductCard";

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          console.log(snapshot);
          setOrders(
            snapshot?.docs?.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>
          {orders?.length === 0 && (
            <div style={{ padding: "20px" }}>you don't have orders yet.</div>
          )}
          {/* ordered items */}
          {/* <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order Id: {eachOrder?.id}</p>
                  {eachOrder?.data?.basket?.map((order) => (
                    <ProductCard flex={true} product={order} key={order.id} />
                  ))}
                </div>
              );
            })}
          </div> */}

<div>
            {orders?.map((eachOrder, i) => (
              <div key={eachOrder.id || i}>
                <hr />
                <div className={classes.order_header}>
                  <p>Order ID: {eachOrder?.id}</p>
                  <p>Date: {new Date(eachOrder?.data?.created * 1000).toLocaleDateString()}</p>
                </div>
                
                {eachOrder?.data?.basket?.map((order) => (
                  <div className={classes.order_item} key={order.id}>
                    <ProductCard
                      flex={true}
                      product={order}
                      key={order.id}
                    />
                    {/* <button 
                      className={classes.reorder_btn}
                      onClick={() => handleReorder(order)}
                    >
                       Reorder
                    </button> */}
                  </div>
                ))}
              </div>
            ))}
          </div>


        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
