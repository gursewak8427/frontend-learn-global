import React from "react";
import Med from "../images/med.png";
import Mediaslide from "./Mediaslide";
import { useSelector, useDispatch } from 'react-redux'

export default function Media({data}) {
  const landingPage = useSelector((state) => state.landingPage)

  return (
    <div>
      <div className="about-part   lg:mt-0 px-4 lg:px-0  lg:pb-10 mt-10 lg:mt-0">
        <div className="container mx-auto">
          <div className="lg:grid lg:grid-cols-2 items-center">
            <div className="lg:pr-10">
              <h2 className="text-right text-6xl pb-5  relative">Media</h2>
              <p className="text-black tracking-widest text-right">
               {landingPage.media.text}
              </p>
            </div>
            <div>
              <div className="img-part">
                <Mediaslide/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
