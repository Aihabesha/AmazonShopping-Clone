import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import classes from "./Product.module.css";
import { Link } from "react-router-dom"; // ✅ fixed import
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

function ProductCard({ product, flex, renderDesc, renderAdd }) {
  const { image, title, id, rating, price, description } = product;
  const [, dispatch] = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        image,
        title,
        id,
        rating,
        price,
        description,
      },
    });
  };

  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} className={classes.product_img} />
      </Link>

      <div>
        <h4>{title}</h4>
        {renderDesc && (
          <div style={{ maxWidth: "700px", margin: "10px 0" }}>
            {description}
          </div>
        )}

        <div className={classes.rating}>
          <Rating value={rating?.rate || 0} precision={0.1} readOnly />
          <small>({rating?.count || 0})</small>
        </div>

        <div>
          <CurrencyFormat amount={price} />
        </div>

        {renderAdd && (
          <button className={classes.button} onClick={addToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
