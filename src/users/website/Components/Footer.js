import React from "react";
import { Link } from "react-router-dom";
import Ft_logo from "../images/ft_logo.png";
import Uni_1 from "../images/uni_1.jpg";
import Uni_2 from "../images/uni_2.gif";
import Uni_3 from "../images/uni_3.png";

import { useSelector, useDispatch } from "react-redux";

export default function Footer() {
  const landingPage = useSelector((state) => state.landingPage);

  let baseUrl = "http://learn-global-backend.onrender.com/uploads/agent/";
  return (
    <div>
      <div className="footer-content bg-black py-20 px-4">
        <div class="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-4">
            <div>
              <img src={landingPage.main_logo} />
              <p className="text-white text-sm text-left my-5">
                {landingPage.footer_description}
              </p>
              <a
                className="text-white mb-5 inline-block text-xl"
                href="mailto:info@learnglobal.com"
              >
                <i className="fa fa-envelope mr-2" aria-hidden="true"></i>
                {landingPage.main_email}
              </a>
              <ul className="social-list flex gap-4 items-center">
                <li>
                  <a href={landingPage.social_links.linked_in}>
                    <i
                      className="text-white fa fa-linkedin"
                      aria-hidden="true"
                    ></i>
                  </a>
                </li>

                <li>
                  <a href={landingPage.social_links.twitter}>
                    <i
                      className="text-white fa fa-pinterest-p"
                      aria-hidden="true"
                    ></i>
                  </a>
                </li>

                <li>
                  <a href={landingPage.social_links.instagram}>
                    <i
                      className="text-white fa fa-youtube-play"
                      aria-hidden="true"
                    ></i>
                  </a>
                </li>

                <li>
                  <a href={landingPage.social_links.facebook}>
                    <i
                      className="text-white fa fa-facebook"
                      aria-hidden="true"
                    ></i>
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-white font-bold text-2xl  mb-5 pb-5  border-b inline-block">
                Quick Links
              </h2>
              <ul>
                <li className="mb-3">
                  <Link className="text-white" to={"/eligible"}>
                    <i
                      className="text-white fa fa-caret-right mr-3"
                      aria-hidden="true"
                    ></i>
                    Apply Now
                  </Link>
                </li>
                <li className="mb-3">
                  <Link className="text-white" to={"/discover"}>
                    <i
                      className="text-white fa fa-caret-right mr-3"
                      aria-hidden="true"
                    ></i>
                    Discover School
                  </Link>
                </li>
                <li className="mb-3">
                  <Link className="text-white" to={"/d/"}>
                    <i
                      className="text-white fa fa-caret-right mr-3"
                      aria-hidden="true"
                    ></i>
                    Agent/Signup
                  </Link>
                </li>
                <li className="mb-3">
                  <Link className="text-white" to={"/d/"}>
                    <i
                      className="text-white fa fa-caret-right mr-3"
                      aria-hidden="true"
                    ></i>
                    Login/Signup
                  </Link>
                </li>
                <li className="mb-3">
                  <Link className="text-white" to={"/about"}>
                    <i
                      className="text-white fa fa-caret-right mr-3"
                      aria-hidden="true"
                    ></i>
                    About
                  </Link>
                </li>
                <li>
                  <Link className="text-white" to={"/contact"}>
                    <i
                      className="text-white fa fa-caret-right mr-3"
                      aria-hidden="true"
                    ></i>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-white font-bold text-2xl mb-5 pb-5  border-b inline-block">
                Top Universities
              </h2>
              <ul className="">
                {landingPage.topSchools.map((el) => {
                  return (
                    <li className="mb-5">
                      <Link
                        to={`/specificSchool/${el._id}`}
                        className="flex items-center"
                      >
                        <img
                          className="rounded-full w-14 mr-3"
                          src={baseUrl + el.schoolLogo}
                        />
                        <p className="mb-0 text-sm text-white capitalize">
                          {el.schoolName}
                        </p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="lower-content py-5 px-4 bg-gray-700">
        <div class="container mx-auto">
          <div className="grid lg:grid-cols-2">
            <div>
              <p className="text-white text-sm mb-0 text-center lg:text-left mb-5 lg:mb-0">
                Copyright © 2019 Learn Global All Right Reserved
              </p>
            </div>

            <ul className="flex gap-4 lg:gap-8 justify-center lg:justify-end">
              <li className="text-center">
                <a className="text-white text-sm text-center" href="#">
                  FAQ
                </a>
              </li>

              <li className="text-center">
                <a className="text-white text-sm" href="#">
                  Privacy Policy
                </a>
              </li>

              <li className="text-center">
                <a className="text-white text-sm" href="#">
                  Terms & Conditions
                </a>
              </li>

              <li className="text-center">
                <a href="#" className="text-white text-sm">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
