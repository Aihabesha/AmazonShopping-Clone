import React from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import styles from "./Product.module.css"; // Import the module
import { Link } from "react-router-dom";

function ProductCard({ product, renderDescription = false }) { // ✅ Added renderDescription as a prop
  const { id, title, image, price, rating, description } = product; // ✅ Added description from product

  return (
    <div className={styles.productCard}>
      <Link to={`/products/${id}`}>
        <img className={styles.productImage} src={image} alt={title} />
      </Link>
      <h3 className={styles.productTitle}>{title}</h3>

      {renderDescription && <div className={styles.description}>{description}</div>} 
      {/* ✅ Fixed the description rendering */}

      <div className={styles.rating}>
        <Rating value={rating?.rate} precision={0.1} readOnly />
        <small>({rating?.count} reviews)</small>
      </div>
      <div className={styles.price}>
        <CurrencyFormat value={price} />
      </div>
      <button
        className={styles.addToCartButton}
        onClick={() => console.log(`Added ${title} to cart`)}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
