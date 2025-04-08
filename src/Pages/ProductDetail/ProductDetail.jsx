import React, { useEffect, useState } from "react";
import classes from "./ProductDetail.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import axios from "axios";
import ProductCard from "../../Components/Products/ProductCard";
import { useParams } from "react-router-dom";
import { productUrl } from "../../Api/endPoints";
import Loader from "../../Components/Loader/Loader";

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { productId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top on product change
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setIsLoading(false);
      });
  }, [productId]);

  return (
    <LayOut>
      {isLoading ? (
        <div className={classes.loader_wrapper}>
          <Loader />
        </div>
      ) : product ? (
        <ProductCard
          product={product}
          flex={true}
          renderDesc={true}
          renderAdd={true}
        />
      ) : (
        <p className={classes.not_found}>Product not found or failed to load.</p>
      )}
    </LayOut>
  );
}

export default ProductDetail;
