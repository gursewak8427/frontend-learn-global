import React from "react";
import Heroslider from "./Heroslider";
import Plane from "../images/plane.png";
import { useSelector, useDispatch } from 'react-redux'

export default function Homebanner(props) {
  const landingPage = useSelector((state) => state.landingPage)

  return (
    <div>
      <div className="home-hero  px-4 lg:px-0 py-24  lg:pt-48 relative">
        <div className="container mx-auto">
          <h1 className="text-center text-white text-2xl lg:text-5xl  relative">
            {landingPage.titleLine}
          </h1>
          <Heroslider/>
          <ul className="lg:flex items-center justify-center relative lg:gap-44 mt-24">
            <li className="text-white text-lg font-light tracking-widest text-center">
              <span className="numb-text">{landingPage.total_students}+</span> Total Students
            </li>
            <li className="text-white  text-lg font-light tracking-widest text-center my-3 lg:my-0">
              Scholarships Upto ${landingPage.scholarships}*
            </li>
            <li className="text-white  text-lg font-light tracking-widest text-center">
              <span className="numb-text">{landingPage.total_courses}+</span> Total Courses
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
