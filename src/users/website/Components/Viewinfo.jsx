import axios from "axios";
import React, { useEffect, useState } from "react";
import Aboutcont3 from "./Aboutcontent3";
import Schoolform from "./Schoolform";
import Abouthelp from "./Abouthelp";
import Aboutuniversity from "./Aboutuniversity";

export default function Viewinfo({ data }) {
  return (
    <>
      <div className="view-banr py-32">
        <div className="container mx-auto px-4">
          <div className="lg:flex gap-8">
            <div className="lg:w-3/5 mb-8 lg:mb-0">
              <h1 className="text-left text-4xl text-white capitalize mb-3">
                {data.schoolDetails.school_name}
              </h1>
              <p className="text-white text-left lg:text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
              <div className="flex gap-3 mt-8">
                <button className="bg-black hover:bg-[#059699]  rounded py-2 px-3 text-white">
                  Start application
                </button>
                <button className="bg-transparent border rounded py-2 px-3 text-white">
                  Find your program matches
                </button>
              </div>
            </div>
            <div className="lg:w-2/5">
              <div className="bg-white p-5 rounded">
                <h2 className="text-xl">Uni facts</h2>
                <p className="mb-1">New York, USA</p>
                <div className="flex gap-4 mb-2">
                  <input className="border rounded p-2 w-full" type="text" />
                  <input className="border rounded p-2 w-full" type="text" />
                </div>

                <div className="flex gap-4 mb-2">
                  <input className="border rounded p-2 w-full" type="text" />
                  <input className="border rounded p-2 w-full" type="text" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="info-grp">
          <div className="container mx-auto">
            <div className="lg:flex gap-8 items-center inner-main p-3 border-b mb-10">
              <div className="inn-main flex items-center gap-2">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xl">
                    <b>Founded</b>
                    <br />
                    {data.schoolDetails.founded}
                  </p>
                </div>
              </div>

              <div className="inn-main flex items-center gap-2">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xl">
                    <b>Type</b>
                    <br />
                    {data.schoolDetails.type}
                  </p>
                </div>
              </div>

              <div className="inn-main flex items-center gap-2">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xl">
                    <b>Total Students</b>
                    <br />
                    {data.schoolDetails.total_student}
                  </p>
                </div>
              </div>

              <div className="inn-main flex items-center gap-2">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xl">
                    <b>Int. Students</b>
                    <br />
                    1000
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Aboutcont3 />
        <Schoolform />
        <Abouthelp />
        <Aboutuniversity />
      </div>
    </>
  );
}
