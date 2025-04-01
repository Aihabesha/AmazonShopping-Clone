import React from "react";
import { Carousel } from "react-responsive-carousel";
import { data as img } from "./img/data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./Carousel.module.css";

function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        // dynamicHeight={false}
      >
        {img?.map((imageItemLink, i) => {
          return <img key={i} src={imageItemLink} alt="" />;
        })}
      </Carousel>
      <div className={styles.hero_img}></div>
    </div>
  );
}

export default CarouselEffect;
