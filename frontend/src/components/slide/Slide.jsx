import React from "react";
import "./Slide.scss";
import Slider from "infinite-react-carousel";
import { useMediaQuery } from "@chakra-ui/react";


const Slide = ({ children, slidesToShow, arrowsScroll }) => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  let mobileSlidesToShow = 1;
  let mobileArrowsScroll = 1;

  if (isMobile) {
    slidesToShow = mobileSlidesToShow;
    arrowsScroll = mobileArrowsScroll;
  }
  return (
    <div className="slide">
      <div className="container">
        <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
          {children}
        </Slider>
      </div>
    </div>
  );
};

export default Slide;
