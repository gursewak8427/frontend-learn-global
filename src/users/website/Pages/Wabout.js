import React from "react";
import Aboutcont from "../Components/Aboutcont";
import Aboutcont2 from "../Components/Aboutcont2";
import Aboutcont3 from "../Components/Aboutcontent3";
import Abouthelp from "../Components/Abouthelp";
import Abouthero from "../Components/Abouthero";
import Aboutservice from "../Components/Aboutservice";
import Aboutuniversity from "../Components/Aboutuniversity";
import Aboutwork from "../Components/Aboutwork";
import Whocontent from "../Components/Whocontent";
import WebsiteHome from "../Screens/WebsiteHome";

export default function Wabout() {
  return (
    <div>
      <div page={"about"}>
        {/* <Abouthero /> */}
        <Whocontent />
        <Aboutcont />
        <Aboutcont2 />
        <Aboutcont3 />
        <Aboutservice />
        <Aboutwork />
        <Abouthelp />
        <Aboutuniversity />
      </div>
    </div>
  );
}
