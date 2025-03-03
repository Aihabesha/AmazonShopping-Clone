import React from "react";
import { Carousel } from "react-responsive-carousel";
import { data } from "./img/data.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from './Carousel.module.css'; // Adjust the path as necessary

function CarouselComp() {
  return (
    <div>
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
      >
        {data.map((imgSrc, index) => (
          <img src={imgSrc} key={index} alt={`Slide ${index}`} />
        ))}
      </Carousel>
      <div className={classes.hero__img}></div>
    </div>
  );
}

export default CarouselComp;
