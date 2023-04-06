import React from "react";
import Student from "../../website/images/student.jpg";

export default function Aboutuniversity() {
  return (
    <div>
      <div className="container mx-auto px-4 lg:px-0 py-20">
        <div className="lg:flex gap-6">
          <div className="lg:w-1/2">
            <img src={Student} />
          </div>
          <div className="lg:w-1/2">
            <h4 className="text-left text-4xl mb-8">
              How we help universities
            </h4>
            <p className="mb-6 lg:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>

            <p className="mb-6 lg:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="mb-6 lg:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
