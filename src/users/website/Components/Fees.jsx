import React from "react";
import About2 from "../../website/images/about2.jpg";

export default function Fees() {
  return (
    <div className="px-4 py-20">
      <div className="container mx-auto fees-part">
        <div className="lg:flex">
          <div className="lg:w-1/2">
            <h5 className="text-black font-bold text-3xl mb-8">
              Fees and Funding
            </h5>
            <ul>
              <li className="lg:text-base relative">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </li>
              <li className="lg:text-base relative">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </li>
              <li className="lg:text-base relative">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </li>
              <li className="lg:text-base relative">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </li>
              <li className="lg:text-base relative">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </li>
              <li className="lg:text-base relative">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </li>
              <li className="lg:text-base relative">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </li>
              <li className="lg:text-base relative">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </li>
              <li className="lg:text-base relative">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </li>
              <li className="lg:text-base relative">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </li>
            </ul>
          </div>

          <div className="lg:w-1/2">
            <img src={About2} />
          </div>
        </div>
      </div>
    </div>
  );
}
