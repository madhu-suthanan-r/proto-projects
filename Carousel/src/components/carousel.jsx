import { useEffect, useRef, useState } from "react";

const Carousel = ({
  images = [],
  isLoading = false,
  imageLimit = images.length,
  customPrevButton,
  customNextButton,
  imgPerSlide = 1,
  onImgClick = () => {}
}) => {
  const imageRef = useRef();
  const [imgWidth, setImgWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length > 0) {
      setCurrentIndex(0);
    }
  }, [images]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageLimit - imgPerSlide : prev - 1));
  };
  const goToNext = () => {
    setCurrentIndex((prev) => (prev === imageLimit - imgPerSlide ? 0 : prev + 1));
  };

  console.log(currentIndex);
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="carousel" style={{ width: imgPerSlide * imgWidth }}>
      <div
        className="image-container"
        style={{ transform: `translateX(-${currentIndex * imgWidth}px)` }}
      >
        {images
          .slice(0, imageLimit > images.length ? images.length : imageLimit)
          .map((image, index) => {
            return (
              <img
                onLoad={() => setImgWidth(imageRef?.current?.offsetWidth)} //L: onLoad
                ref={imageRef}
                key={image.id}
                src={image.url}
                alt={image.title}
                className="image"
                onClick={() => onImgClick(image, index)}
              />
            );
          })}
      </div>
      {customPrevButton instanceof Function ? (
        customPrevButton(goToPrev)
      ) : (
        <button className="btn prev" onClick={goToPrev}>
          Prev
        </button>
      )}
      {customNextButton instanceof Function ? (
        customNextButton(goToPrev)
      ) : (
        <button className="btn next" onClick={goToNext}>
          Next
        </button>
      )}
    </div>
  );
};

export default Carousel;
