import React, { useEffect, useState } from "react"; // ✅ Added useState import
import classes from "./ProductDetail.module.css";
import Layout from "../../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../Components/Products/ProductCard";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null); // ✅ Initialized with null

  useEffect(() => {
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
      });
  }, [productId]); 

  if (!product) return <p>Loading product details...</p>; 

  return (
    <Layout>
      <div className={classes.productDetailContainer}>
        <h1>Product Detail</h1>
        <p>Product ID: {productId}</p>
        <ProductCard product={product} />{" "}
        {/* ✅ Displaying ProductCard if data is available */}
      </div>
    </Layout>
  );
}

export default ProductDetail;
