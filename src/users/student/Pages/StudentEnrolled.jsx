import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import { authenticate, getToken } from "../../../helper/auth";
import StudentDashboard from "../Screens/Dashboard/StudentDashboard";

// firebase
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "../../../firebase";
const provider = new GoogleAuthProvider();

const StudentEnrolled = (props) => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    isWait: true,
    enrolledPrograms: [],
    baseUrl: "",
    pendingDocuments: true,
  });

  useEffect(() => {
    // get enrolled list data from api using axios
    const config = {
      headers: { Authorization: `Bearer ${getToken("student")}` },
    };
    axios
      .post(
        process.env.REACT_APP_NODE_URL + "/student/getEnrollPrograms",
        {},
        config
      )
      .then((res) => {
        console.log(res);
        setState({
          ...state,
          enrolledPrograms: res.data.details.enrolled_list,
          baseUrl: res.data.details.baseUrl,
          isWait: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // make array of months with small notiaions like Jan, Feb, etc
  const monthsArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <>
      <>
        <>
          {/* table and row */}

          <div className="card m-4">
            <div className="card-body px-0 pt-0 pb-2">
              <div className="table-responsive p-0 dashbord-table">
                <table className="table w-full">
                  <thead>
                    <tr>
                      {/*
                                Logo, File Id, Country, School Name, Course, Application Fees, ESL, Fees Paid, In Take, Payment, Action,  */}
                      <th
                        className="border-2 border-black p-2 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-left"
                        scope="col"
                      >
                        Logo
                      </th>
                      <th
                        className="border-2 border-black p-2 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-left"
                        scope="col"
                      >
                        File Id
                      </th>
                      <th
                        className="border-2 border-black p-2 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-left"
                        scope="col"
                      >
                        Country
                      </th>
                      <th
                        className="border-2 border-black p-2 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-left"
                        scope="col"
                      >
                        School Name
                      </th>
                      <th
                        className="border-2 border-black p-2 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-left"
                        scope="col"
                      >
                        Course
                      </th>
                      <th
                        className="border-2 border-black p-2 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-left"
                        scope="col"
                      >
                        Application Fees
                      </th>
                      <th
                        className="border-2 border-black p-2 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-left"
                        scope="col"
                      >
                        ESL
                      </th>
                      <th
                        className="border-2 border-black p-2 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-left"
                        scope="col"
                      >
                        Fees Paid
                      </th>
                      <th
                        className="border-2 border-black p-2 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-left"
                        scope="col"
                      >
                        In Take
                      </th>
                      <th
                        className="border-2 border-black p-2 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-left"
                        scope="col"
                      >
                        Payment
                      </th>
                      <th
                        className="border-2 border-black p-2 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-left"
                        scope="col"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.isWait ? (
                      <></>
                    ) : (
                      state.enrolledPrograms.map((enroll) => {
                        return (
                          <tr key={enroll._id}>
                            <td className="p-2 border-2">
                              <img
                                width={"100px"}
                                src={
                                  state.baseUrl +
                                  enroll.school_details.school_meta_details
                                    .schoolLogo
                                }
                                alt="logo"
                                className="img-fluid"
                              />
                            </td>
                            <td className="p-2 border-2">{enroll._id}</td>
                            <td className="p-2 border-2">
                              {enroll.school_details.country}
                            </td>
                            <td className="p-2 border-2">
                              {enroll.school_details.school_name}
                            </td>
                            <td className="p-2 border-2">
                              {enroll.school_details?.school_programs
                                ?.program_name || "--"}
                            </td>
                            <td className="p-2 border-2">
                              {enroll.school_details?.school_programs
                                ?.application_fee == 0
                                ? "Free"
                                : enroll.school_details?.school_programs
                                    ?.application_fee || "NaN"}
                            </td>
                            <td className="p-2 border-2">{"esl"}</td>
                            <td className="p-2 border-2">{"Pending"}</td>
                            <td className="p-2 border-2">
                              <select name="" id="" className="p-2">
                                <option value="">--Select--</option>
                                {
                                  // USE map to show intakes under school_details.school_programs.intakes_data
                                  enroll.school_details.school_programs.intakes_data.map(
                                    (intakes, IntakeIndex) => {
                                      return intakes.months.map(
                                        (month, monthIndex) => {
                                          if (month == true) {
                                            return (
                                              <option
                                                key={
                                                  IntakeIndex + "-" + monthIndex
                                                }
                                                value={
                                                  IntakeIndex + "-" + monthIndex
                                                }
                                              >
                                                {intakes.year +
                                                  " " +
                                                  monthsArr[monthIndex]}
                                              </option>
                                            );
                                          }
                                        }
                                      );
                                    }
                                  )
                                }
                              </select>
                            </td>
                            <td className="p-2 border-2">
                              <button>Pay Now</button>
                            </td>
                            <td className="p-2 border-2">
                              <button>Delete</button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
                {state.isWait ? (
                  <center className="w-full my-10">
                    <img width={80} src="https://i.gifer.com/ZZ5H.gif" alt="" />
                  </center>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </>
      </>
    </>
  );
};

export default StudentEnrolled;
