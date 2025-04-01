import React from "react";
import LayOut from "../../Components/Layout/Layout";
import Carousel from "../../Components/Carousel/Carousel";
import Category from "../../Components/Categorys/Category";
import Product from "../../Components/Products/Product";

function Landing() {
  return (
    <LayOut>
      <Carousel />
      <Category />
      <Product />
    </LayOut>
  );
}

export default Landing;
