import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Md1 from "../images/md1.png";
import Md2 from "../images/md2.png";
import Md3 from "../images/md3.png";
import Lw_arw from "../images/lw_arw.png";
import { useSelector, useDispatch } from 'react-redux'

export default function Mediaslide() {
  const landingPage = useSelector((state) => state.landingPage)
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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
  return (
    <div className="container mx-auto">
      <Slider {...settings}>
      {
      landingPage.media.images.map((el)=>{
          return ( <div className="mdslides relative">
          <img src={el} alt="" />
          <img className="crl-img absolute" src={Lw_arw} />
        </div>)
        })
      }
        
        {/* <div className="mdslides relative">
          <img src={Md2} alt="" />
          <img className="crl-img absolute" src={Lw_arw} />
        </div>
        <div className="mdslides relative">
          <img src={Md3} alt="" />
          <img className="crl-img absolute" src={Lw_arw} />
        </div> */}
      </Slider>
    </div>
  );
}
