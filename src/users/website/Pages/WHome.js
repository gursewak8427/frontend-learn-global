import React, { useEffect, useState } from "react";
import axios from "axios";
import About from "../Components/About";
import Courses from "../Components/Courses";
import Homebanner from "../Components/Homebanner";
import Media from "../Components/Media";
import Possibilities from "../Components/Possibilities";
import Level from "../Components/level";
import Sliderpart from "../Components/Sliderpart";
// import Admission from "../Components/Admission";
import WebsiteHome from "../Screens/WebsiteHome";
import { BigLoading } from "../../../common/BigLoading";


export default function WHome() {
  

  return (
    <div page={"home"}>
      {/* hello */}
      <Homebanner />
      <About data={{}} />
      <Media data={{}} />
      <Courses data={{}} />
      {/* <Admission /> */}
      <Possibilities />
      <Level />
      <Sliderpart data={{}} />
    </div>
  );
}
