import React from "react";
import About2 from "../images/about2.jpg";

export default function Aboutcont2() {
  return (
    <div>
      <div className="container mx-auto pt-20 px-4 lg:px-0">
        <div className="lg:flex gap-6">
          <div className="lg:w-1/2 mt-4 lg:mt-0">
            <h2 className="text-4xl mb-8 capitalize">our mission</h2>
            <p className="lg:text-base mb-6 leading-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="lg:text-base mb-6 leading-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>

            <p className="lg:text-base mb-6 leading-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>

            <strong className="text-xl text-[#059699]">
              Find our more about our purpose and mission
            </strong>
          </div>
          <div className="lg:w-1/2">
            <img className="w-full" src={About2} />
          </div>
        </div>
      </div>
    </div>
  );
}
