import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector, useDispatch } from 'react-redux'

export default function Heroslider(props) {
  const landingPage = useSelector((state) => state.landingPage)

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider className="mt-14" {...settings}>
      {
      landingPage.countryList.map((el)=>{
          return ( <div className="inner-content">
          <img src={landingPage.baseUrl+el.countryLogo} />
          <p className="text-center w-full text-2xl">{el.countryDetails.countryName}</p>
        </div>)
        })
      }
    </Slider>
  );
}
