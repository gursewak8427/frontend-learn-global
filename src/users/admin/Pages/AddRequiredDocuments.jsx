import { Switch } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, Navigate, redirect } from "react-router-dom";
import { getCookie, getToken, setCookie } from "../../../helper/auth";
import Papa from "papaparse";
import Dashboard from "../Screens/Dashboard/Dashboard";
// import "./Addschoolname.css";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import ButtonPrimary from "../../../common/Buttons/ButtonPrimary";
const countryToCurrency = require('country-to-currency');
const { MultiSelect } = require("react-multi-select-component");

// web-socket
// import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://127.0.0.1:3006";
// console.log("COnnecting")
// var socket = socketIOClient(ENDPOINT);

const AddRequiredDocuments = () => {
  const [countrySelected, setCountrySelected] = useState([]);
  const [updateIndex, setUpdate] = useState(-1)
  const [state, setState] = useState({
    countryList: [],
    list: [],

    showPopup: false,
    showPopup2: false,
    showPopup3: false,
    isWait: true,
  });

  useEffect(() => {
    // get country list
    axios
      .get(process.env.REACT_APP_NODE_URL + "/admin/getUniqueCountries")
      .then(async (response) => {
        console.log({ response })
        setState({
          ...state,
          countryList: response.data.details.countries,
          isWait: false,
        })
      });
  }, []);

  if (state.isWait) {
    return "Loading..."
  }

  const updateData = (data) => {
    let { docType,
      countriesList,
      title,
      isRequired
    } = data;

    axios
      .post(process.env.REACT_APP_NODE_URL + "/docsrequired/", data)
      .then((response) => {
        axios
          .get(process.env.REACT_APP_NODE_URL + "/admin/getUniqueCountries")
          .then(async (response) => {
            console.log({ response })
            setState({
              ...state,
              showPopup: false,
              countryList: response.data.details.countries,
              isWait: false,
            })
          });
        // alert(response.data.message)
        // let arr = state.countryList.map(country => {
        //   if (countriesList.includes(country.countryName.toLowerCase())) {
        //     if (docType == "EMB") {
        //       country.embassyDocuments.push({ title, isRequired: isRequired == "T" ? true : false })
        //     } else {
        //       country.documents.push({ title, isRequired: isRequired == "T" ? true : false })
        //     }
        //   }
        //   return country;
        // })
        // console.log("arr", arr)

        setCountrySelected([])
        document.getElementById("newDoc").value = ""
        document.getElementById("docType").value = ""
      });
  }

  const handleChange = () => { }
  const uploadData = () => { }

  const deleteOfferLetterDocument = (index) => {
    if (!window.confirm("Are you sure ?")) {
      return;
    }

    let documentIndex = index;
    let country = state.countryList[updateIndex]
    let data = {
      documentIndex,
      countryName: country.countryName.toLowerCase(),
      type: "OL"
    }
    console.log({ data })
    axios
      .post(process.env.REACT_APP_NODE_URL + "/docsrequired/delete", data)
      .then((response) => {
        let allCountries = state.countryList;
        allCountries[updateIndex].documents.splice(documentIndex, 1)
        setState({
          ...state,
          countryList: allCountries
        })
      })
  }

  const deleteEmbassyDocument = (index) => {
    if (!window.confirm("Are you sure ?")) {
      return;
    }
    let documentIndex = index;
    let country = state.countryList[updateIndex]
    let data = {
      documentIndex,
      countryName: country.countryName.toLowerCase(),
      type: "EMB"
    }
    console.log({ data })
    axios
      .post(process.env.REACT_APP_NODE_URL + "/docsrequired/delete", data)
      .then((response) => {
        let allCountries = state.countryList;
        allCountries[updateIndex].embassyDocuments.splice(documentIndex, 1)
        setState({
          ...state,
          countryList: allCountries
        })
      })
  }

  const removeUpdate = () => { }


  return (
    <>
      <div heading_title={"Add School Detail"}>
        <>
          <div className="row addCountryPage flex flex-row">

            {/* popup start */}
            <div
              className={`px-[20px] w-5/12 mx-auto my-4 createSchoolNamePopup documents ${state.showPopup && "active"
                }`}
            >
              <label htmlFor="">Add Document</label>
              <ul>
                {/* {
                  state?.countryList[updateIndex]?.documents.map((doc, index) => {
                    return <li className="flex justify-between py-[10px]">
                      <span>{doc}</span>
                      <span className="cursor-pointer text-[red]" onClick={() => {
                        let oldDocs = state.countryList;
                        oldDocs[updateIndex].documents.splice(index, 1)
                        setState({
                          ...state,
                          countryList: oldDocs
                        })
                      }}>Delete</span>
                    </li>
                  })
                } */}

                <div className="flex flex-col justify-between my-2">
                  <input type="text"
                    className="block w-full flex-1 border-gray-300 focus:border-black border-2 border-gray p-2 w-full focus:ring-indigo-500 sm:text-sm my-2"
                    id="newDoc" placeholder="Document Name" />
                  <MultiSelect
                    options={state.countryList.map(country => {
                      return { label: country.countryName, value: country.countryName.toLowerCase() }
                    })}
                    value={countrySelected}
                    onChange={setCountrySelected}
                    labelledBy="Country"
                  />
                  <select name="" id="docType"
                    className="block w-full flex-1 border-gray-300 focus:border-black border-2 border-gray p-2 w-full focus:ring-indigo-500 sm:text-sm my-2">
                    <option value="">Select Document Type</option>
                    <option value="OL">Offer Letter Document</option>
                    <option value="EMB">Embassy Document</option>
                  </select>
                  <select name="" id="isRequired"
                    className="block w-full flex-1 border-gray-300 focus:border-black border-2 border-gray p-2 w-full focus:ring-indigo-500 sm:text-sm my-2">
                    <option value="T">Required</option>
                    <option value="F">Optionally</option>
                  </select>
                  <div className="flex justify-end">
                    <ButtonPrimary title={"Add New"} onclick={() => {
                      let countriesList = countrySelected.map(i => i.value)
                      let value = document.getElementById("newDoc").value
                      let docType = document.getElementById("docType").value
                      let isRequired = document.getElementById("isRequired").value

                      if (value == "") {
                        alert("Document Name is Required")
                        return;
                      }

                      if (docType == "") {
                        alert("Document Type is Required")
                        return;
                      }

                      if (countriesList.length == 0) {
                        alert("Choose Atleast one country")
                        return;
                      }
                      let data = {
                        docType,
                        countriesList,
                        title: value,
                        isRequired
                      }
                      updateData(data)
                      let oldDocs = state.countryList;
                      oldDocs[updateIndex].documents.push(value)
                      setState({
                        ...state,
                        countryList: oldDocs
                      })
                      document.getElementById("newDoc").value = ""
                      console.log({ oldDocs })
                    }} />
                    <div className="ml-2">
                      <ButtonPrimary theme="danger" title={"Cancel"} onclick={() => {
                        setState({
                          ...state,
                          showPopup: false,
                        })
                      }} />
                    </div>
                  </div>
                </div>
              </ul>
            </div>
            {/* popup end */}

            {/* popup2 start */}
            <div
              className={`px-[20px] w-5/12 mx-auto my-4 createSchoolNamePopup ${state.showPopup2 && "active"
                }`}
            >
              <label htmlFor="">OL Documents</label>
              <ul>
                {
                  state?.countryList[updateIndex]?.documents.length == 0 && <>No Documents</>
                }
                {
                  state?.countryList[updateIndex]?.documents.map((doc, index) => {
                    return <li className="flex justify-between py-[10px]">
                      <span>{doc.title}</span>
                      <span>{doc.isRequired ? "REQUIRED" : "OPTIONALLY"}</span>
                      <span className="p-[5px] bg-[red] text-[white] cursor-pointer" onClick={() => {
                        deleteOfferLetterDocument(index)
                      }}>X</span>
                    </li>
                  })
                }

                <div className="flex justify-end">
                  <div className="ml-2">
                    <ButtonPrimary title={"Close"} onclick={() => {
                      setState({
                        ...state,
                        showPopup2: false,
                      })
                    }} />
                  </div>
                </div>
              </ul>
            </div>
            {/* popup2 end */}


            {/* popup2 start */}
            <div
              className={`px-[20px] w-5/12 mx-auto my-4 createSchoolNamePopup ${state.showPopup3 && "active"
                }`}
            >
              <label htmlFor="">Embassy Documents</label>
              <ul>
                {
                  state?.countryList[updateIndex]?.embassyDocuments.length == 0 && <>No Documents</>
                }
                {
                  state?.countryList[updateIndex]?.embassyDocuments.map((doc, index) => {
                    console.log("doc", doc)
                    return <li className="flex justify-between py-[10px]">
                      <span>{doc.title}</span>
                      <span>{doc.isRequired ? "REQUIRED" : "OPTIONALLY"}</span>
                      <span className="p-[5px] bg-[red] text-[white] cursor-pointer" onClick={() => {
                        deleteEmbassyDocument(index)
                      }}>X</span>
                    </li>
                  })
                }

                <div className="flex justify-end">
                  <div className="ml-2">
                    <ButtonPrimary title={"Close"} onclick={() => {
                      setState({
                        ...state,
                        showPopup3: false,
                      })
                    }} />
                  </div>
                </div>
              </ul>
            </div>
            {/* popup2 end */}


            <div className="mx-auto w-full my-4 p-45">
              <div className="flex justify-end">
                <button
                  className="addNewBtn"
                  onClick={() => {
                    setState({
                      ...state,
                      showPopup: true,
                    });
                  }}
                >
                  Add New
                </button>
              </div>
              <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-hidden shadow-lg border">
                      <table class="min-w-full agent-table">
                        <thead class="">
                          <tr>
                            <th class="text-sm font-medium text-gray-900 px-2 py-4 text-left font-bold">
                              Sr.
                            </th>
                            <th class="capitalize text-sm font-medium text-gray-900 px-2 py-4 text-left font-bold">
                              country name
                            </th>
                            <th class="capitalize text-sm font-medium text-gray-900 px-2 py-4 text-left font-bold">
                              Documents
                            </th>
                            <th class="capitalize text-sm font-medium text-gray-900 px-2 py-4 text-left font-bold">
                              Embassy Documents
                            </th>
                            {/* <th class="capitalize text-sm font-medium text-gray-900 px-2 py-4 text-left font-bold">
                              Actions
                            </th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {state.countryList.map((country, index) => {
                            return (
                              <tr class="bg-gray-100 border-b">
                                <td className="p-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {index + 1}
                                </td>
                                <td className="text-sm text-gray-900 font-light p-2 whitespace-nowrap capitalize">
                                  {country.countryName || "--"}
                                </td>
                                <td className="text-sm text-gray-900 font-light p-2 whitespace-nowrap capitalize">
                                  <ButtonPrimary title={"Documents"} onclick={() => {
                                    setUpdate(index)
                                    setState({
                                      ...state,
                                      showPopup2: true,
                                    });
                                  }} />
                                </td>
                                <td className="text-sm text-gray-900 font-light p-2 whitespace-nowrap capitalize">
                                  <ButtonPrimary title={"E. Docs"} onclick={() => {
                                    setUpdate(index)
                                    setState({
                                      ...state,
                                      showPopup3: true,
                                    });
                                  }} />
                                </td>
                                {/* <td className="text-sm text-gray-900 font-light p-2 whitespace-nowrap">
                                  <div className="action-icons-list">
                                    <i
                                      className="action-icon fa-solid fa-pen-to-square cursor-pointer"
                                      onClick={() => setUpdate(index)}
                                    ></i>
                                  </div>
                                </td> */}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      {state.isWait ? (
                        <div>
                          <center className="w-full my-10">
                            <img
                              width={100}
                              src="https://i.gifer.com/ZZ5H.gif"
                              alt=""
                            />
                          </center>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </>
      </div>
    </>
  );
};

export default AddRequiredDocuments;
