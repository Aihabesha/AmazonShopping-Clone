import React from "react";
import classes from "./Category.module.css";

function CategoryCard({ data }) {
  return (
    <div className={classes.categorySection}>
      <a href="#">
        <span>
          <h2>{data.title}</h2>
        </span>
        <img src={data.image} alt={data.title} />
        <p>Shop Now</p>
      </a>
    </div>
  );
}

export default CategoryCard;
