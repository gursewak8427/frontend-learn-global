import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Abt from "../images/abt.png";
import Aus from "../images/aus.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

export default function Courses({ }) {
  const landingPage = useSelector((state) => state.landingPage)
  const [ind, setInd] = useState(0);

  // const [courses,setCourses]=useState([landingPage.top_courses.programs[ind].totalData]);
  // let courses=landingPage.top_courses.programs[0].totalData

  // const handleTab = (e, index) => {
  //   console.log(index)
  //   setInd(index)
  //   console.log(index);
  //   console.log(landingPage.top_courses.programs[ind], "landingPage")
  // }

  return (
    <div>
      <div className="courses-part px-4 lg:px-0 py-20 lg:py-24">
        <div className="container mx-auto">
          <h3 className="text-left  text-black  relative pb-10 text-6xl">
            <span>Browse</span> Our Top Courses
          </h3>
          <Tabs>
            <TabList>
              {
                landingPage.top_courses.streams.map((el, index) => {
                  return (
                    <Tab onClick={() => setInd(index)}>{el}</Tab>
                  )
                })
              }
            </TabList>


            <div className="flex-auto">
              <div className="lg:flex items-center gap-4">
                {
                  landingPage.top_courses.programs[ind].totalData.map((el, index) => {
                    return (

                      <div className="box border p-8 my-5 shadow-xl">
                        <div className="flex gap-4">
                          <div className="border">
                            <img className="w-28" src={Abt} />
                          </div>
                          <div className="course-title">
                            <Link to="#">
                              <h3 className="text-black">
                                {el.school_programs.program_name}
                              </h3>
                            </Link>
                            <Link
                              className="my-4 block country-text text-xl  font-bold"
                              to="#"
                            >
                              {el.school_name}
                            </Link>
                            <Link
                              className="flex items-center text-black font-bold"
                              to="#"
                            >
                              <img className="w-12 mr-2" src={Aus} />
                              {el.country}
                            </Link>
                          </div>
                        </div>
                        <div className="btm-row mt-8 mb-2 flex items-center">
                          <div className="flex gap-8 mb-10 w-full">
                            <div className="part1-row flex items-center gap-2">
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
                              <p>
                                <b className="country-text">Total Students</b>
                                <br />
                                {el.total_student}
                              </p>
                            </div>

                            <div className="part2-row flex ml-auto items-center gap-2">
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
                                  d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
                                />
                              </svg>

                              <p>
                                <b className="country-text">Type</b>
                                <br />
                                {el.type}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="btm-row  mb-2 flex items-center">
                          <div className="flex gap-8 mb-10 w-full">
                            <div className="part1-row flex items-center gap-2">
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
                                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                />
                              </svg>

                              <p>
                                <b className="country-text">Founded</b>
                                <br />
                                {el.founded}
                              </p>
                            </div>

                            <div className="part2-row flex ml-auto items-center gap-2">
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
                                  d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                                />
                              </svg>

                              <p>
                                <b className="country-text">Tuition Fee</b>
                                <br />
                                {el.school_programs.currency} ${el.school_programs.min_tution_fee_per_semester}- ${el.school_programs.max_tution_fee} per annum
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="btm-row  mb-2 flex items-center">
                          <div className="flex gap-8  w-full">
                            <div className="part1-row flex items-center gap-2">
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
                                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>

                              <p>
                                <b className="country-text">1 Year</b>
                                <br />
                                2015
                              </p>
                            </div>

                            <div className="part2-row btn-groups flex items-center ml-auto border rounded-full">
                              <button class="text-black font-bold py-2 px-4">
                                Application fee :  ${el.school_programs.application_fee}
                              </button>
                              <button class="check-btn  text-white font-bold py-2 px-4">
                                Check Eligibility
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>




                    )
                  })
                }
              </div>
            </div>

          </Tabs>
        </div>
      </div>
    </div>
  );
}
