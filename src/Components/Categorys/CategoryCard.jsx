import React from "react";
import classes from "./Category.module.css";
import { Link } from "react-router-dom";


function CategoryCard({ data }) {
  return (
    <div className={classes.categorySection}>
      <Link to={`/category/${data.title}`} className={classes.categoryCard}>
        <span>
          <h2>{data.title}</h2>
        </span>
        <img src={data.image} alt={data.title} />
        <p>Shop Now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;
