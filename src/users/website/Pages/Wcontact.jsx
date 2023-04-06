import React from "react";
import Contact_text from "../Components/Contact_text";
import WebsiteHome from "../Screens/WebsiteHome";

export default function Wcontact() {
  return (
    <div>
      <div page={"discover"}>
        <div className="contact-banr relative mx-auto py-40">
          <h1 className="text-center text-4xl text-white relative">
            Contact us
          </h1>
        </div>
        <Contact_text />
      </div>
    </div>
  );
}
