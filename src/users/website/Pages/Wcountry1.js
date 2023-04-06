import React, { useEffect, useState } from "react";
import WebsiteHome from "../Screens/WebsiteHome";
import "./Wcountry1.css";
import Countryinfo from "../Components/Countryinfo";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Wcountry1() {
  // useEffect(() => {
  //   document.getElementById("header_menu").classList.remove("header-part");
  //   document.getElementById("header_menu").classList.add("static-header");
  // }, []);
 
  
  const {id} = useParams();

  return (
    <div>
      <div id="countryPage">
        <Countryinfo id={id} />
      </div>
    </div>
  );
}
