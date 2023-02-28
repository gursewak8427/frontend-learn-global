import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import { authenticate, getToken } from "../../../helper/auth";
import StudentDashboard from "../Screens/Dashboard/StudentDashboard";

// firebase
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "../../../firebase";
const provider = new GoogleAuthProvider();

const StudentDocuments = (props) => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    isWait: true,
    documentsList: [],
    document: "",
    title: "",
    baseUrl: "",
    popup: false,
    student: null,
  });

  useEffect(() => {
    // get docs list
    const config = {
      headers: { Authorization: `Bearer ${getToken("student")}` },
    };
    axios
      .post(
        process.env.REACT_APP_NODE_URL + "/student/getdocuments",
        {},
        config
      )
      .then((res) => {
        console.log(res);
        setState({
          ...state,
          documentsList: res.data.details.documents,
          student: res.data.details.student,
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

  // add document to database with axios and form data, get doc detail from state.documents array
  const addDocument = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("document", state.document);
    formData.append("title", state.title);

    const config = {
      headers: { Authorization: `Bearer ${getToken("student")}` },
    };
    axios
      .post(
        process.env.REACT_APP_NODE_URL + "/student/uploaddocument",
        formData,
        config
      )
      .then((res) => {
        console.log(res);
        setState({
          ...state,
          documentsList: [...state.documentsList, res.data.details.document],
          popup: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFile = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.files[0],
    });
  };
  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submitNow = () => {
    console.log(state);
  };

  const submitAllDocs = () => {
    const config = {
      headers: { Authorization: `Bearer ${getToken("student")}` },
    };
    axios
      .post(
        process.env.REACT_APP_NODE_URL + "/student/submitAllDocs",
        {},
        config
      )
      .then((res) => {
        alert(res.data.details.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <>
        {state.isWait ? (
          <center className="w-full mt-20">
            <img width={80} src="https://i.gifer.com/ZZ5H.gif" alt="" />
          </center>
        ) : (
          <>
            <div
              className={`overlay ${state.popup == true ? "active" : ""}`}
              onClick={() => setState({ ...state, popup: false })}
            ></div>
            <div
              className={`pendingDocAlert popup  ${
                state.popup == true ? "active" : ""
              }`}
            >
              <div class="w-full">
                <h1 class="text-3xl font-bold mb-5">Upload Student Document</h1>
                <div class="mb-5">
                  <label for="document-type" class="block font-medium mb-2">
                    Document Name:
                  </label>
                  <input
                    className="border px-4 py-2 w-full"
                    type="text"
                    name="title"
                    placeholder="Document Name"
                    onChange={handleInput}
                  />
                </div>
                <div class="mb-5">
                  <label for="document-file" class="block font-medium mb-2">
                    Document File:
                  </label>
                  <input
                    type="file"
                    id="document-file"
                    name="document"
                    className="border px-4 py-2 w-full"
                    onChange={handleFile}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={addDocument}
                    type="submit"
                    class="px-4 py-2 bg-gradient-primary text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
            <div className="flex align-end w-full justify-end p-[10px]">
              {state?.student?.status == "IN_PROCESS" ? (
                <>
                  <button
                    onClick={() => {
                      setState({
                        ...state,
                        popup: true,
                      });
                    }}
                    className="px-4 py-2 bg-gradient-primary text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    Add New
                  </button>
                  <button
                    onClick={submitAllDocs}
                    className="ml-[10px] px-4 py-2 bg-[green] text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    Submit Documents
                  </button>
                </>
              ) : (
                <span className="text-[green] m-10 font-bold text-xl">
                  Profile Approved
                </span>
              )}
            </div>
            <div id="uploadStudentDocuments" className="flex">
              <div class="w-7/12 mx-auto">
                {/* create table with document name, view button and status */}

                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="border-b border-gray-200 px-4 py-2 text-left">
                        Document Name
                      </th>
                      <th className="border-b border-gray-200 px-4 py-2 text-left">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.documentsList.map((document, index) => {
                      return (
                        <tr key={index}>
                          <td className="border-b border-gray-200 px-4 py-2">
                            {document.document_title}
                          </td>
                          <td className="border-b border-gray-200 px-4 py-2">
                            {document.document_status || "--"}
                          </td>
                          <td className="border-b border-gray-200 px-4 py-2">
                            <Link
                              target={"_blank"}
                              to={`${state.baseUrl}${document.document_url}`}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div class="py-10 w-4/12 m-2 rounded border-2 p-3">
                <h1 class="text-xl font-bold mb-5">
                  Required Certificate List
                </h1>
                <ul class="w-full">
                  <li class="py-2 border-b border-gray-200">
                    <div class="flex justify-between items-center">
                      <h2 class="text-md font-medium">10th Certificate</h2>
                      {/* <span class="text-gray-500">1</span> */}
                    </div>
                    {/* <p class="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                  </li>
                  <li class="py-2 border-b border-gray-200">
                    <div class="flex justify-between items-center">
                      <h2 class="text-md font-medium">12th Certificate</h2>
                      {/* <span class="text-gray-500">1</span> */}
                    </div>
                    {/* <p class="text-gray-500">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}
                  </li>
                  <li class="py-2 border-b border-gray-200">
                    <div class="flex justify-between items-center">
                      <h2 class="text-md font-medium">
                        Higher Education Certificates
                      </h2>
                      {/* <span class="text-gray-500">1</span> */}
                    </div>
                    {/* <p class="text-gray-500">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}
                  </li>
                  <li class="py-2 border-b border-gray-200">
                    <div class="flex justify-between items-center">
                      <h2 class="text-md font-medium">IELTS/PTE/etc.</h2>
                      {/* <span class="text-gray-500">1</span> */}
                    </div>
                    {/* <p class="text-gray-500">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}
                  </li>
                  <li class="py-2 border-b border-gray-200">
                    <div class="flex justify-between items-center">
                      <h2 class="text-md font-medium">Passport</h2>
                      {/* <span class="text-gray-500">1</span> */}
                    </div>
                    {/* <p class="text-gray-500">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}
                  </li>
                  <li class="py-2 border-b border-gray-200">
                    <div class="flex justify-between items-center">
                      <h2 class="text-md font-medium">Marriage Certificate</h2>
                      {/* <span class="text-gray-500">1</span> */}
                    </div>
                    {/* <p class="text-gray-500">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </>
    </>
  );
};

export default StudentDocuments;
