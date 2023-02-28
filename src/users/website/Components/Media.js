import React from "react";
import Med from "../images/med.png";
import Mediaslide from "./Mediaslide";

export default function Media() {
  return (
    <div>
      <div className="about-part   lg:mt-0 px-4 lg:px-0  lg:pb-10 mt-10 lg:mt-0">
        <div className="container mx-auto">
          <div className="lg:grid lg:grid-cols-2 items-center">
            <div className="lg:pr-10">
              <h2 className="text-right text-6xl pb-5  relative">Media</h2>
              <p className="text-black tracking-widest text-right">
                Our awareness and expertise will boost your probability of
                admissions accomplishment when studying abroad. We are the No. 1
                education service provider for students to apply to the best
                institutions in the world. Our miscellaneous team is fueled by a
                passion for culture and innovation. Our team of experts connects
                with students univer, supporting them with our platform and
                services.
              </p>
            </div>
            <div>
              <div className="img-part">
                <Mediaslide />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
