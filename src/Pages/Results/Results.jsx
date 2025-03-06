import React, { useState, useEffect } from "react";
import classes from "./Results.module.css";
import Layout from "../../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../Components/Products/ProductCard";

function Results() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  const validCategories = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];

  useEffect(() => {
    const lowerCaseCategoryName = categoryName.toLowerCase();

    if (!validCategories.includes(lowerCaseCategoryName)) {
      console.log("Invalid category:", lowerCaseCategoryName);
      return;
    }

    console.log(
      `Fetching: ${productUrl}/products/category/${lowerCaseCategoryName}`
    );

    axios
      .get(`${productUrl}/products/category/${lowerCaseCategoryName}`)
      .then((res) => {
        console.log("Fetched products:", res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(
          "Error fetching products:",
          err.response ? err.response.data : err.message
        );
      });
  }, [categoryName]);

  return (
    <Layout>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category / {categoryName} </p>
        <hr />
        <div className={classes.products__container}>
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p style={{ padding: "30px" }}>No products found.</p>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default Results;
