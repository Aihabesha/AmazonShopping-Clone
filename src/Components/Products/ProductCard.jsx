import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import styles from "./Product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { type } from "../../Utility/action.type";

function ProductCard({ product, flex, renderDescription, renderAdd }) {
  const { id, title, image, price, rating, description } = product;

  const { state, dispatch } = useContext(DataContext);
  const { basket } = state;
  const addTocart = () => {
    if (!basket.some((item) => item.id === id)) {
      dispatch({
        type: type.ADD_TO_BASKET,
        item: { id, title, image, price, rating, description },
      });
    }
  };
  

  return (
    <div className={`${styles.productCard} ${flex ? styles.product_flexed : ""}`}
>
      <Link to={`/products/${id}`}>
        <img className={styles.productImage} src={image} alt={title} />
      </Link>
      <h3 className={styles.productTitle}>{title}</h3>

      {renderDescription && <div className={styles.productDescription}>{description}</div>}

   
      

      <div className={styles.rating}>
        <Rating value={rating?.rate} precision={0.1} readOnly />
        <small>({rating?.count} reviews)</small>
      </div>
      <div className={styles.price}>
        <CurrencyFormat value={price} />
      </div>

      {renderAdd && 
        <button className={styles.addToCartButton} onClick={addTocart}>
        Add to Cart
      </button>
      }

      
    </div>
  );
}

export default ProductCard;
