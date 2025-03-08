import React, { useEffect, useState } from "react"; 
import classes from "./ProductDetail.module.css";
import Layout from "../../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../Components/Products/ProductCard";
import Loader from "../../Components/Loader/Loader";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return (
      <Layout>
        <div className={classes.loaderContainer}>
          <Loader />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={classes.productDetailContainer}>
        <h1 className={classes.productTitle}>{product.title}</h1>
        <img className={classes.productImage} src={product.image} alt={product.title} />
        <div className={classes.productInfo}>
          <span className={classes.productPrice}>${product.price}</span>
          <div className={classes.productRating}>
            <span>⭐ {product.rating?.rate} ({product.rating?.count} reviews)</span>
          </div>
        </div>
        <p className={classes.productDescription}>{product.description}</p>
        <button className={classes.addToCartButton}>
          Add to Cart
        </button>
      </div>
    </Layout>
  );
}

export default ProductDetail;
