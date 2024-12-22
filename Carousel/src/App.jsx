import { useEffect, useState } from "react";
import "./App.css";
import Carousel from "./components/carousel";


const imageLimit = 8;
function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  //  https://jsonplaceholder.typicode.com/photos?_limit=8

  const fetchImages = async (imageLimit) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_limit=${imageLimit}`
      );
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(imageLimit);
  }, []);

  return (
    <div className="carousel-container">
      <Carousel
        images={images}
        isLoading={loading}
        imageLimit={imageLimit}
        imgPerSlide={2}
        // inImgClick={(image, index) => {}}
        customPrevButton={(onClick) => {
          return <button className="btn prev" onClick={onClick}>
            Prev
          </button>;
        }}
        customNextButton={(onClick) => {
          return <button className="btn next" onClick={onClick}>
            Next
          </button>;
        }}
      />
    </div>
  );
}

export default App;
