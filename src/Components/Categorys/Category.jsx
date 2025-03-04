import React from "react";
import { CategoryFulllnfos } from "./CategoryFulllnfos"; 
import CategoryCard from "./CategoryCard"; 
import classes from "./Category.module.css"; 

function Category() {
  return (
    <section className={classes.category__container}>
      {CategoryFulllnfos.map((infos) => (
        <CategoryCard key={infos.id} data={infos} /> 
      ))}
    </section>
  );
}

export default Category;
