import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Lg1 from "../images/lg1.jpg";
import Lg2 from "../images/lg2.jpg";
import Lg3 from "../images/lg3.png";
import Lg4 from "../images/lg4.png";
import Lg5 from "../images/lg5.jpg";
import { useSelector, useDispatch } from 'react-redux'

export default function SimpleSlider() {
  const landingPage = useSelector((state) => state.landingPage)

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  let baseUrl = "http://learn-global-backend.onrender.com/uploads/agent/"
  return (
    <div className="partner container mx-auto py-20">
      <Slider {...settings}>
        {
          landingPage.schoolsLogo.map((el) => {
            return (<div>
              <img src={baseUrl + el.schoolLogo} alt="" />
            </div>)
          })
        }


      </Slider>
    </div>
  );
}
