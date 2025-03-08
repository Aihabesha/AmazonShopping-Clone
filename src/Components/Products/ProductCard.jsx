import React from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import styles from "./Product.module.css"; // Import the module
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className={styles.productCard}>
      <Link to={`/products/${product.id}`}>
        <img
          className={styles.productImage}
          src={product.image}
          alt={product.title}
        />
      </Link>
      <h3 className={styles.productTitle}>{product.title}</h3>
      <div className={styles.rating}>
        <Rating value={product.rating.rate} precision={0.1} readOnly />
        <small>({product.rating.count} reviews)</small>
      </div>
      <div className={styles.price}>
        <CurrencyFormat value={product.price} />
      </div>
      <button
        className={styles.addToCartButton}
        onClick={() => console.log(`Added ${product.title} to cart`)}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
