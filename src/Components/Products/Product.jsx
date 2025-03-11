import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import styles from "./Product.module.css"; 

function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  return (
    <section className={styles.productContainer}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} renderAdd={true}   />
      ))}
    </section>
  );
}

export default Product;
