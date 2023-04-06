import React, { useState } from "react";
import WebsiteHome from "../Screens/WebsiteHome";
import School from "../Components/School";
import Rightsideform from "../Components/Rightsideform";
import { useEffect } from "react";
import axios from "axios";

export default function Wdiscover() {
  return (
    <div>
      <div page={"discover"} >
        <div className="container mx-auto">
          <div className="lg:flex discover-cont py-20 gap-4 px-4 lg:px-0">
            <div className="lg:w-2/3 coverleft">
              <School />
            </div>
            <div className="lg:w-1/3">
              <Rightsideform />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
