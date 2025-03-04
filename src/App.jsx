import "./App.css";
import Header from "./Components/Header/Header";
import CarouselComp from "./Components/Carousel/Carousel.jsx";
import Category from "./Components/Categorys/Category.jsx";
import Product from "./Components/Products/Product.jsx";

function App() {
  return (
    <div>
      <Header />
      <CarouselComp />
      <Category />
      <Product />
    </div>
  );
}

export default App;
