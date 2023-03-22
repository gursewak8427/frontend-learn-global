import React from "react";
import About2 from "../images/about2.jpg";

export default function Aboutcont() {
  return (
    <div>
      <div className="container mx-auto py-20 px-4 lg:px-0">
        <div className="lg:flex gap-6">
          <div className="lg:w-1/2">
            <img className="w-full" src={About2} />
          </div>
          <div className="lg:w-1/2 mt-4 lg:mt-0">
            <h2 className="text-5xl mb-8">About</h2>
            <p className="lg:text-base mb-6 leading-6">
              Learn Global means learn anywhere in the world and we provide you
              the best platform to study abroad and make your future bright. We
              offer exact information for students interested in school/college
              and courses. We help you classify the best universities that match
              your profile.
            </p>
            <p className="lg:text-base mb-6 leading-6">
              Our awareness and expertise will boost your probability of
              admissions accomplishment when studying abroad. We are the No. 1
              education service provider for students to apply to the best
              institutions in the world. Our miscellaneous team is fueled by a
              passion for culture and innovation. Our team of experts connects
              with students universal, supporting them with our platform and
              services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
