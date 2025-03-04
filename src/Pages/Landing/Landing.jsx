import React from "react";
import Layout from "../../Components/Layout/Layout";
import CarouselComp from "../../Components/Carousel/Carousel";
import Category from "../../Components/Categorys/Category";
import Product from "../../Components/Products/Product";

function Landing() {
  return (
    <Layout>
      <CarouselComp />
      <Category />
      <Product />
    </Layout>
  );
}

export default Landing;
