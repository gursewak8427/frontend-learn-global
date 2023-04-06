import axios from "axios";
import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import ReactPaginate from "react-paginate";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import ButtonPrimary from "../../../common/Buttons/ButtonPrimary";
import { authenticate, getToken } from "../../../helper/auth";
import Dashboard from "../Screens/Dashboard/Dashboard";
import AdminStudentProfile from "./AdminStudentProfile";
import StudentDocumentsPopup from "./StudentDocumentsPopup";
import { toast } from "react-toastify";
import StudentEmbassyDocumentsPopup from "./StudentEmbassyDocumentsPopup";

const FilesList = ({ type }) => {
  const navigate = useNavigate();

  const [EmbassyDocsModal, setEmbassyDocsModal] = useState(false);
  const [ModalCode, setModalCode] = useState(false);
  const [activeStudentId, setActiveStudentId] = useState(-1)
  const [activeFileId, setActiveFileId] = useState(-1)
  const [activeFileIndex, setActiveFileIndex] = useState(-1)

  const [state, setState] = useState({
    isWaiting: false,
    files: [],
    baseUrl: "",
    adminToken: getToken("admin"),
    totalPages: 0,
    currentPage: 1,
    remark: "",
    approveFileLoading: -1,

    activeFileIndex: -1,
    popup: false,
  });

  // const [tab, setTab] = useState(0)

  useEffect(() => {
    getPaginationData(1);
  }, [window.location.href]);

  const getPaginationData = (page) => {
    setState({
      ...state,
      isWaiting: true,
    });
    const config = { headers: { Authorization: `Bearer ${state.adminToken}` } };
    var data = { currentPage: page, type };
    axios
      .post(
        process.env.REACT_APP_NODE_URL + "/admin/getEnrollPrograms",
        data,
        config
      )
      .then((res) => {
        console.log(res);
        setState({
          ...state,
          files: res.data.details.files,
          baseUrl: res.data.details.baseUrl,
          isWaiting: false,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        setState({
          ...state,
          isWaiting: false,
        });
        alert(err);
      });
  };

  const sendRemark = (fileId, index) => {
    let content = document.getElementById("remark_" + index).value;
    if (content == "") return false;

    let data = {
      content,
      fileId,
    };

    const config = {
      headers: { Authorization: `Bearer ${getToken("admin")}` },
    };
    axios
      .post(process.env.REACT_APP_NODE_URL + "/admin/sendRemark", data, config)
      .then((res) => {
        console.log(res);
        alert("Remark updated successfully");
        document.getElementById("remark_" + index).value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const udateFileStatus = (status, index) => {
    if (window.confirm("Are you sure ?")) {
      let fileData = state.files[index]
      // now update
      setState({
        ...state,
        approveFileLoading: index,
      });

      const config = {
        headers: {
          Authorization: `Bearer ${state.adminToken}`,
        },
      };

      const data = {
        fileId: fileData._id,
        status: status,
      };

      axios
        .patch(
          process.env.REACT_APP_NODE_URL + "/admin/updateEnrollStatus",
          data,
          config
        )
        .then((res) => {
          let OldFiles = state.files;
          // splice that index
          OldFiles[index].enroll_status = status
          // if (type == "UNDER_VERIFICATION" && ["IN_PROCESSING", "DOCUMENTS_REJECT"].includes(status)) {
          if (type == "UNDER_VERIFICATION") {
            let myRow = document.getElementById(`file_${index}`)
            console.log({ myRow })
            myRow.classList.add("row-remove")
            setTimeout(() => {
              myRow.remove()
            }, 500)
          }
          if (type == "IN_PROCESSING" && ![
            "IN_PROCESSING",
            "OL_RECEIVED",
            "TUTION_FEES_PROCESSING",
            "FILE_LODGED",
            "FILE_LODGED_DOCS_PROCESSING",
            "VISA_AWAITED",
          ].includes(status)) {
            let myRow = document.getElementById(`file_${index}`)
            console.log({ myRow })
            myRow.classList.add("row-remove")
            setTimeout(() => {
              myRow.remove()
            }, 500)
          }
          if (type == "CLOSED" && !["VISA_APPROVED",].includes(status)) {
            let myRow = document.getElementById(`file_${index}`)
            console.log({ myRow })
            myRow.classList.add("row-remove")
            setTimeout(() => {
              myRow.remove()
            }, 500)
          }
          if (type == "DOC_REJECTED" && !["OL_REJECTED",
            "DOCUMENTS_REJECT",
            "TUTION_FEES_REJECTED",
            "FILE_LODGED_DOCS_REJECTED",].includes(status)) {
            let myRow = document.getElementById(`file_${index}`)
            console.log({ myRow })
            myRow.classList.add("row-remove")
            setTimeout(() => {
              myRow.remove()
            }, 500)
          }
          if (type == "PERMANENT_REJECTED" && !["VISA_REJECTED",].includes(status)) {
            let myRow = document.getElementById(`file_${index}`)
            console.log({ myRow })
            myRow.classList.add("row-remove")
            setTimeout(() => {
              myRow.remove()
            }, 500)
          }
          if (type == "PENDING" && !["FEES_AND_DOC_PENDING",
            "FEES_PENDING",
            "DOCUMENTS_PENDING",].includes(status)) {
            let myRow = document.getElementById(`file_${index}`)
            console.log({ myRow })
            myRow.classList.add("row-remove")
            setTimeout(() => {
              myRow.remove()
            }, 500)
          }
          setState({
            ...state,
            files: OldFiles,
            approveFileLoading: -1,
          });
          toast(res.data.message);

          // setState({
          //     ...state,
          //     agentProfile: res.data.details.agent,
          //     isWaiting: false,
          // })
        })
        .catch((err) => {
          console.log({ updateEnrollStatus_Error: err });
          setState({
            ...state,
            approveFileLoading: -1,
          });
        });
    }
  };


  // const updateStudentStatus = (status, index) => {
  //   if (window.confirm("Are you sure ?")) {
  //     let fileData = state.files[index]
  //     // now update
  //     setState({
  //       ...state,
  //       approveFileLoading: index,
  //     });

  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${state.adminToken}`,
  //       },
  //     };

  //     const data = {
  //       fileId: fileData._id,
  //       status: status,
  //     };

  //     axios
  //       .patch(
  //         process.env.REACT_APP_NODE_URL + "/admin/updateStudentRemark",
  //         data,
  //         config
  //       )
  //       .then((res) => {
  //         let OldFiles = state.files;
  //         // splice that index
  //         OldFiles[index].enroll_status = status
  //         setState({
  //           ...state,
  //           files: OldFiles,
  //           approveFileLoading: -1,
  //         });
  //         toast("Student Remark Update");

  //         // setState({
  //         //     ...state,
  //         //     agentProfile: res.data.details.agent,
  //         //     isWaiting: false,
  //         // })
  //       })
  //       .catch((err) => {
  //         console.log({ updateEnrollStatus_Error: err });
  //         setState({
  //           ...state,
  //           approveFileLoading: -1,
  //         });
  //       });
  //   }
  // };

  const closeFile = (fileId, index) => {
    if (window.confirm("Are you sure ?")) {
      // now update
      setState({
        ...state,
        approveFileLoading: index,
      });

      const config = {
        headers: {
          Authorization: `Bearer ${state.adminToken}`,
        },
      };

      const data = {
        fileId: fileId,
        status: "CLOSED",
      };

      axios
        .patch(
          process.env.REACT_APP_NODE_URL + "/admin/updateEnrollStatus",
          data,
          config
        )
        .then((res) => {
          let OldFiles = state.files;
          // splice that index
          OldFiles.splice(index, 1);
          setState({
            ...state,
            files: OldFiles,
            approveFileLoading: -1,
          });
          alert(res.data.message);

          // setState({
          //     ...state,
          //     agentProfile: res.data.details.agent,
          //     isWaiting: false,
          // })
        })
        .catch((err) => {
          console.log({ updateEnrollStatus_Error: err });
          setState({
            ...state,
            approveFileLoading: -1,
          });
        });
    }
  };



  const OL_PROCESSING = (e, fileId, index) => {
    if (window.confirm("Are you sure ?")) {
      // change status here
      // now update
      // setState({
      //   ...state,
      //   approveFileLoading: index,
      // });

      const config = {
        headers: {
          Authorization: `Bearer ${state.adminToken}`,
        },
      };

      const data = {
        fileId: fileId,
        status: e.target.value == "T" ? "OL_RECEIVED" : "OL_REJECTED",
      };

      axios
        .patch(
          process.env.REACT_APP_NODE_URL + "/admin/updateEnrollStatus",
          data,
          config
        )
        .then((res) => {
          alert(res.data.message);
          if (res.data.details.status == 0) {
            return;
          }
          let OldFiles = state.files;
          // splice that index
          OldFiles[index].enroll_status = e.target.value == "T" ? "OL_RECEIVED" : "OL_REJECTED"

          if (e.target.value == "F") {
            navigate("/d/admin/rejected-files")
          }
          setState({
            ...state,
            files: OldFiles,
            approveFileLoading: -1,
          });

          // setState({
          //     ...state,
          //     agentProfile: res.data.details.agent,
          //     isWaiting: false,
          // })
        })
        .catch((err) => {
          console.log({ updateEnrollStatus_Error: err });
          setState({
            ...state,
            approveFileLoading: -1,
          });
        });
    } else {
      document.getElementById("OL_AWAIT_SELECT").value = "a"
      e.stopPropagation();
      e.preventDefault();
    }

  };


  const VISA_PROCESSING = (e, fileId, index) => {
    if (window.confirm("Are you sure ?")) {
      // change status here
      // now update
      // setState({
      //   ...state,
      //   approveFileLoading: index,
      // });

      const config = {
        headers: {
          Authorization: `Bearer ${state.adminToken}`,
        },
      };

      const data = {
        fileId: fileId,
        status: e.target.value == "T" ? "VISA_APPROVED" : "VISA_REJECTED",
      };

      axios
        .patch(
          process.env.REACT_APP_NODE_URL + "/admin/updateEnrollStatus",
          data,
          config
        )
        .then((res) => {
          alert(res.data.message);
          if (res.data.details.status == 0) {
            return;
          }
          let OldFiles = state.files;
          // splice that index
          OldFiles[index].enroll_status = e.target.value == "T" ? "VISA_APPROVED" : "VISA_REJECTED"

          if (e.target.value == "F") {
            navigate("/d/admin/rejected-files")
          }
          if (e.target.value == "T") {
            navigate("/d/admin/closed-files")
          }

          setState({
            ...state,
            files: OldFiles,
            approveFileLoading: -1,
          });

          // setState({
          //     ...state,
          //     agentProfile: res.data.details.agent,
          //     isWaiting: false,
          // })
        })
        .catch((err) => {
          console.log({ updateEnrollStatus_Error: err });
          setState({
            ...state,
            approveFileLoading: -1,
          });
        });
    } else {
      document.getElementById("VISA_AWAIT_SELECT").value = "a"
      e.stopPropagation();
      e.preventDefault();
    }

  };


  const ProcessTutionReceipt = (status) => {
    if (window.confirm("Are you sure ?")) {
      let fileId = state.files[state.activeFileIndex]._id;

      const config = {
        headers: {
          Authorization: `Bearer ${state.adminToken}`,
        },
      };

      const data = {
        fileId: fileId,
        status,
      };

      axios
        .patch(
          process.env.REACT_APP_NODE_URL + "/admin/updateEnrollStatus",
          data,
          config
        )
        .then((res) => {
          if (res.data.status == "0") {
            toast.error(res.data.message)
            return;
          }
          let OldFiles = state.files;
          // splice that index
          OldFiles[state.activeFileIndex].enroll_status = status;
          setState({
            ...state,
            files: OldFiles,
            popup: false,
            activeFileIndex: -1,
          });
          if (status == "FILE_LODGED") {
            toast("File Lodged Successfully");
          } else if (status == "TUTION_FEES_REJECTED") {
            toast("Receipt Rejected Successfully");
          }

          // setState({
          //     ...state,
          //     agentProfile: res.data.details.agent,
          //     isWaiting: false,
          // })
        })
        .catch((err) => {
          console.log({ updateEnrollStatus_Error: err });
          setState({
            ...state,
            approveFileLoading: -1,
          });
        });
    }
  };

  return (
    <>
      <div heading_title={"Total Students"}>

        <>
          <div className={
            `overlay ${state.popup == true ? "active" : ""
            }`
          }
            onClick={
              () => setState({
                ...state,
                popup: false,
                activeFileIndex: -1,
              })
            }></div>
          <div className={
            `pendingDocAlert popup  ${state.popup == true ? "active" : ""
            }`
          }>
            {
              (state?.activeFileIndex != -1) &&
              <div class="w-full">
                <h1 class="text-3xl font-bold mb-5">Fees Receipt (Swift Copy)</h1>
                <div class="mb-5">
                  Fee Receipt : {["TUTION_FEES_PROCESSING", "TUTION_FEES_REJECTED", "FILE_LODGED", "FILE_LODGED_DOCS_PROCESSING", "FILE_LODGED_DOCS_REJECTED", "VISA_AWAITED", "VISA_APPROVED", "VISA_REJECTED", "CLOSE"].includes(state?.files[state?.activeFileIndex]?.enroll_status) &&
                    <a className="text-[blue] mx-2 px-2 py-1 border-[blue] hover:bg-[blue] hover:text-white border" href={"https://learnglobal.co.in:3006/uploads/student/" + state?.files[state.activeFileIndex]?.tution_fees_recepit} target="_blank" rel="noopener noreferrer">View</a>
                  }
                  {/* {
                    !["FILE_LODGED", "FILE_LODGED_DOCS_PROCESSING", "FILE_LODGED_DOCS_REJECTED", "VISA_AWAITED", "VISA_APPROVED", "VISA_REJECTED", "CLOSE"].includes(state?.files[state?.activeFileIndex]?.enroll_status) &&
                    <div className="my-5">
                      <button
                        onClick={() => {
                          ProcessTutionReceipt("FILE_LODGED")
                        }}
                        className="px-4 py-2 bg-[green] hover:bg-[yellowgreen] hover:text-black rounded mr-2 text-white">Approve</button>
                      <button
                        onClick={() => {
                          ProcessTutionReceipt("TUTION_FEES_REJECTED")
                        }}
                        className="px-4 py-2 bg-[red] hover:bg-[pink] hover:text-black rounded text-white">Declined</button>
                    </div>
                  } */}
                </div>
                {/* {
                  !["FILE_LODGED", "FILE_LODGED_DOCS_PROCESSING", "FILE_LODGED_DOCS_REJECTED", "VISA_AWAITED", "VISA_APPROVED", "VISA_REJECTED", "CLOSE"].includes(state?.files[state?.activeFileIndex]?.enroll_status) &&
                  <div className="flex justify-end">
                    <button onClick={() => {
                      setState({
                        ...state,
                        popup: false,
                        activeFileIndex: -1,
                      })
                    }}
                      type="button"
                      class="px-4 py-2 bg-gradient-primary text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200">
                      Cancel
                    </button>
                  </div>
                } */}
              </div>
            }
          </div>

          {ModalCode && (
            <div className="modal_cover">
              <div className="modal_inner select-col-popup">
                <div className="header_modal files_documents">
                  <StudentDocumentsPopup setModalCode={setModalCode} sId={activeStudentId} fId={activeFileId} documents={true} />


                  <GrClose
                    className="close"
                    onClick={() => setModalCode(false)}
                  />
                </div>
              </div>
            </div>
          )}
          {EmbassyDocsModal && (
            <div className="modal_cover">
              <div className="modal_inner select-col-popup">
                <div className="header_modal files_documents">
                  <StudentEmbassyDocumentsPopup setEmbassyDocsModal={setEmbassyDocsModal}
                    state={state} setState={setState} fId={activeFileId} documents={true}
                    activeFileIndex={activeFileIndex} />


                  <GrClose
                    className="close"
                    onClick={() => setEmbassyDocsModal(false)}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="files row min-height-vh-100 mt-10">
            <div className="card mb-4 mt-2">
              <div className="card-body px-0 pt-0 pb-2">
                <div className="overflow-auto card shadow-lg m-4 col-12 px-0 pt-0 pb-2 agent-table border">
                  {
                    !state.isWaiting &&
                    <table className="table-auto overflow-scroll w-full files-table">
                      <thead>
                        <tr>
                          <th
                            className="border-black p-2 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-left"
                            scope="col"
                          >
                            Logo
                          </th>
                          <th
                            className="border-black p-2 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-left"
                            scope="col"
                          >
                            File Id
                          </th>
                          <th
                            className="border-black p-2 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-left"
                            scope="col"
                          >
                            Student Name
                          </th>
                          <th
                            className="border-black p-2 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-left"
                            scope="col"
                          >
                            Country
                          </th>
                          <th
                            className="border-black p-2 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-left"
                            scope="col"
                          >
                            School Name
                          </th>
                          <th
                            className="border-black p-2 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-left"
                            scope="col"
                          >
                            Course
                          </th>
                          <th
                            className="border-black p-2 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-left"
                            scope="col"
                          >
                            Application Fees
                          </th>
                          <th
                            className="border-black p-2 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-left"
                            scope="col"
                          >
                            ESL
                          </th>
                          <th
                            className="border-black p-2 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-left"
                            scope="col"
                          >
                            Fees Paid
                          </th>
                          {(type == "IN_PROCESSING" || type == "CLOSED") && (
                            <th
                              className="border-black p-2 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-left"
                              scope="col"
                            >
                              Payment Id
                            </th>
                          )}
                          {(type == "IN_PROCESSING" || type == "CLOSED") && (
                            <th
                              className="border-black p-2 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-left"
                              scope="col"
                            >
                              Intake
                            </th>
                          )}
                          {/* {type == "UNDER_VERIFICATION" && (
                          <th
                            className="border-black p-2 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-left"
                            scope="col"
                          >
                            Payment
                          </th>
                        )} */}
                          <th
                            className="border-black p-2 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-left"
                            scope="col"
                          >
                            Date
                          </th>
                          {/* {true && (
                            <th
                              className="border-black p-2 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-left"
                              scope="col"
                            >
                              Remark
                            </th>
                          )}
                          {true && (
                            <th
                              className="border-black p-2 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-left"
                              scope="col"
                            >
                              Action
                            </th>
                          )} */}
                          {/* {type == "IN_PROCESSING" && (
                            <th
                              className="border-black p-2 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-left"
                              scope="col"
                            >
                              Completed
                            </th>
                          )} */}
                          {
                            (type != "PENDING" && type != "FEES_PENDING") &&
                            <th>Documents</th>
                          }
                          <th>Remarks</th>
                          <th>Status</th>
                          {/* <th>Student Remark</th> */}
                          <th>Tution Fees</th>
                          <th className="text-left">Embassy Documents</th>
                        </tr>
                      </thead>
                      <tbody>
                        {state.files.map((enroll, index) => {
                          // if (type == "REJECTED") {
                          //   if (
                          //     enroll.student_details.status != "DOC_REJECTED"
                          //   )
                          //     return <></>;
                          // }
                          // if (type == "UNDER_VERIFICATION") {
                          //   if (
                          //     enroll.student_details.status == "DOC_REJECTED"
                          //   )
                          //     return <></>;
                          // }
                          return (
                            <tr id={`file_${index}`}>
                              <td
                                className="border-2 p-2 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-left"
                                scope="col"
                              >
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
                              <td className="p-2 border-2">
                                {enroll.fileId}
                              </td>
                              <td
                                className="p-2 border-2"
                              >
                                <span className="capitalize">
                                  {enroll.student_details.firstName}{" "}
                                  {enroll.student_details.lastName}
                                </span>
                                {/* <br />
                                    {enroll.student_details.email} */}
                              </td>
                              <td className="p-2 border-2 capitalize">
                                {enroll.school_details.country}
                              </td>
                              <td className="p-2 border-2 capitalize">
                                {enroll.school_details.school_name}
                              </td>
                              <td
                                className="p-2 border-2 max-two-line-text hover-text"
                                title={
                                  enroll.school_details?.school_programs
                                    ?.program_name || "--"
                                }
                              >
                                {/* <span class="tooltip-text top">
                                      {enroll.school_details?.school_programs
                                        ?.program_name || "--"}
                                    </span> */}
                                {enroll.school_details?.school_programs
                                  ?.program_name || "--"}
                              </td>
                              <td className="p-2 border-2">
                                {enroll.school_details?.school_programs
                                  ?.application_fee == 0 ? (
                                  "Free"
                                ) : (
                                  <>
                                    {
                                      enroll.school_details?.school_programs
                                        ?.application_fee
                                    }{" "}
                                    {
                                      enroll.school_details?.school_programs
                                        ?.currency
                                    }
                                  </>
                                )}
                              </td>
                              <td className="p-2 border-2">{"--"}</td>
                              <td className="p-2 border-2 normal">
                                {enroll?.fees_status || "--"}
                              </td>
                              {(type == "IN_PROCESSING" ||
                                type == "CLOSED") && (
                                  <td className="p-2 border-2">
                                    {enroll?.payment_id || "--"}
                                  </td>
                                )}
                              {(type == "IN_PROCESSING" ||
                                type == "CLOSED") && (
                                  <td className="p-2 border-2">
                                    {`${enroll?.intake?.year}-${enroll?.intake?.month}` ||
                                      "--"}
                                  </td>
                                )}
                              {/* {type == "UNDER_VERIFICATION" && (
                              <td className="border-2">
                                <span className="flex align-center justify-center">
                                  <ButtonPrimary
                                    title={"Allow"}
                                    onclick={() =>
                                      approveFileNow(enroll._id, index)
                                    }
                                    loading={
                                      state.approveFileLoading == index
                                    }
                                  />
                                </span>
                              </td>
                            )} */}
                              <td className="p-2 border-2">
                                {" "}
                                {new Date(
                                  enroll.createdAt
                                ).toLocaleDateString()}
                              </td>
                              {/* {true && (
                                // {type == "IN_PROCESSING" && (
                                <td className="p-2 border-2">
                                  <input
                                    name="remark"
                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id={`remark_${index}`}
                                    type="text"
                                    placeholder="Remark.."
                                  />
                                </td>
                              )}
                              {true && (
                                // {type == "IN_PROCESSING" && (
                                <td className="border-2">
                                  <span className="flex justify-center w-full">
                                    <ButtonPrimary
                                      title={"Submit"}
                                      onclick={() =>
                                        sendRemark(enroll._id, index)
                                      }
                                      loading={
                                        state.approveFileLoading == index
                                      }
                                    />
                                  </span>
                                </td>
                              )} */}
                              {/* {type == "IN_PROCESSING" && (
                                <td className="border-2">
                                  <span className="flex justify-center w-full p-2">
                                    <ButtonPrimary
                                      title={"Complete"}
                                      onclick={() =>
                                        closeFile(enroll._id, index)
                                      }
                                      loading={
                                        state.approveFileLoading == index
                                      }
                                    />
                                  </span>
                                </td>
                              )} */}
                              {
                                (type != "PENDING" && type != "FEES_PENDING") && <td className="p-2 border-2">
                                  <ButtonPrimary
                                    title={"Documents"}
                                    onclick={() => {
                                      setActiveStudentId(enroll.student_id)
                                      setActiveFileId(enroll._id)
                                      setModalCode(!ModalCode)
                                    }}
                                    // onclick={() =>
                                    //   navigate(
                                    //     "/d/admin/studentprofile?tab=documents&id=" +
                                    //     enroll.student_details._id
                                    //   )
                                    // }
                                    loading={
                                      state.approveFileLoading == index
                                    }
                                  />


                                </td>
                              }
                              <td className="p-2 text-left">
                                <ButtonPrimary title={"Remarks"} onclick={() => {
                                  navigate("/d/admin/remarks/" + enroll._id)
                                }} />
                              </td>
                              {/* <td className="p-2 text-left">
                                <select name="" id="">
                                  <option value="">OL APPLIED</option>
                                  <option value="">OL RECEIVED</option>
                                  <option value="">OL APPLIED</option>
                                  <option value="">OL APPLIED</option>
                                </select>
                              </td> */}
                              {/* HIDDEN PART */}
                              <td className="p-2 text-left hidden">
                                {
                                  (enroll.enroll_status == "PENDING" ||
                                    enroll.enroll_status == "UNDER_VERIFICATION" ||
                                    enroll.enroll_status == "FEES_PENDING") ? <button className="cursor-not-allowed flex justify-start items-start flex-col text-left">
                                    {enroll.enroll_status == "PENDING" ? "DOCUMENTS_PENDING" : enroll.enroll_status}
                                    {/* <br /> */}
                                    {/* <small><b>OL Processing</b></small> */}
                                  </button> :
                                    enroll.enroll_status == "DOCUMENTS_REJECT" ? <button className="cursor-not-allowed">Documents Reject</button> :
                                      enroll.enroll_status == "IN_PROCESSING" ?
                                        <select id="OL_AWAIT_SELECT" className="cursor-pointer" onChange={(e) => OL_PROCESSING(e, enroll._id, index)}>
                                          <option value="a" selected>OL Awaited</option>
                                          <option value="T">OL Received</option>
                                          <option value="F">OL Rejected</option>
                                        </select> :
                                        enroll.enroll_status == "OL_RECEIVED" ? <button className="cursor-not-allowed">OL Received</button> :
                                          enroll.enroll_status == "OL_REJECTED" ? <button className="cursor-not-allowed">OL Rejected</button> :
                                            enroll.enroll_status == "TUTION_FEES_PROCESSING" ? <button className="cursor-pointer">Tution Fees Processing</button> :
                                              enroll.enroll_status == "TUTION_FEES_REJECTED" ? <button className="cursor-not-allowed">Tution Fees Rejected</button> :
                                                enroll.enroll_status == "FILE_LODGED" ? <button className="cursor-not-allowed">File Lodged</button> : // swift copy approved then lodged for await docs 
                                                  enroll.enroll_status == "FILE_LODGED_DOCS_PROCESSING" ? <button className="cursor-not-allowed">Embassy Documents Under Verification</button> : // Process documents from second documents button
                                                    enroll.enroll_status == "FILE_LODGED_DOCS_REJECTED" ? <button className="cursor-not-allowed">Embassy Docs Rejected</button> : // can see docs from documents button
                                                      enroll.enroll_status == "VISA_AWAITED" ? <button className="cursor-pointer">
                                                        <select id="VISA_AWAIT_SELECT" className="cursor-pointer" onChange={(e) => VISA_PROCESSING(e, enroll._id, index)}>
                                                          <option value="a" selected>VISA Awaited</option>
                                                          <option value="T">Visa Approved</option>
                                                          <option value="F">Visa Rejected</option>
                                                        </select>
                                                      </button> : // dosc approved then result awaited
                                                        enroll.enroll_status == "VISA_APPROVED" ? <button className="cursor-not-allowed">Visa Approved</button> :
                                                          enroll.enroll_status == "VISA_REJECTED" && <button className="cursor-not-allowed">Visa Rejected</button>
                                }
                              </td>
                              {/* END - HIDDEN PART */}
                              <td>
                                <select
                                  name=""
                                  id=""
                                  className="border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline mx-2"
                                  value={enroll.enroll_status}
                                  onChange={(e) => {
                                    udateFileStatus(e.target.value, index)
                                  }}
                                >
                                  <option value="FEES_AND_DOC_PENDING">Fees & Documents Pending</option>
                                  <option value="FEES_PENDING">Fees Pending</option>
                                  <option value="DOCUMENTS_PENDING">Documents Pending</option>
                                  <option value="UNDER_VERIFICATION">Documents Under-Verification</option>
                                  <option value="DOCUMENTS_REJECT">Documents Reject</option>
                                  <option value="IN_PROCESSING">File In-Processing</option>
                                  <option value="OL_RECEIVED">OL Received</option>
                                  <option value="OL_REJECTED">OL Rejected</option>
                                  <option value="TUTION_FEES_PROCESSING">Tution Fees Processing</option>
                                  <option value="TUTION_FEES_REJECTED">Tution Fees Rejected</option>
                                  <option value="FILE_LODGED">FILE_LODGED</option>
                                  <option value="FILE_LODGED_DOCS_PROCESSING">FILE_LODGED_DOCS_PROCESSING</option>
                                  <option value="FILE_LODGED_DOCS_REJECTED">FILE_LODGED_DOCS_REJECTED</option>
                                  <option value="VISA_PROCESSING">VISA_PROCESSING</option>
                                  <option value="VISA_AWAITED">VISA_AWAITED</option>
                                  <option value="VISA_APPROVED">VISA_APPROVED</option>
                                  <option value="VISA_REJECTED">VISA_REJECTED</option>
                                </select>
                              </td>
                              {/* <td>
                                <select
                                  name=""
                                  id=""
                                  className="border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline mx-2"
                                  value={enroll.student_remark}
                                  onChange={(e) => {
                                    updateStudentStatus(e.target.value, index)
                                  }}
                                >
                                  <option value="PENDING">PENDING</option>
                                  <option value="B">B</option>
                                  <option value="C">C</option>
                                  <option value="D">D</option>
                                  <option value="E">E</option>
                                </select>
                              </td> */}
                              <td className="p-2 text-left">
                                {
                                  ["TUTION_FEES_PROCESSING", "TUTION_FEES_REJECTED", "FILE_LODGED", "FILE_LODGED_DOCS_PROCESSING", "FILE_LODGED_DOCS_REJECTED", "VISA_AWAITED", "VISA_APPROVED", "VISA_REJECTED", "CLOSE"].includes(enroll?.enroll_status) ?
                                    <ButtonPrimary title={"Receipt"} onclick={
                                      () => setState({
                                        ...state,
                                        popup: true,
                                        activeFileIndex: index,
                                      })
                                    } /> : "--"
                                }
                              </td>
                              {
                                ["FILE_LODGED", "FILE_LODGED_DOCS_PROCESSING", "FILE_LODGED_DOCS_REJECTED", "VISA_AWAITED", "VISA_APPROVED", "VISA_REJECTED", "CLOSE"].includes(enroll?.enroll_status) ?
                                  <td className="p-2 border-2">
                                    <ButtonPrimary
                                      title={"E. Docs"}
                                      onclick={() => {
                                        setActiveStudentId(enroll.student_id)
                                        setActiveFileId(enroll._id)
                                        setActiveFileIndex(index)
                                        setEmbassyDocsModal(!EmbassyDocsModal)
                                      }}
                                      loading={
                                        state.approveFileLoading == index
                                      }
                                    />
                                  </td> : "--"
                              }
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  }
                  {state.isWaiting ? (
                    <center className="w-full my-10">
                      <img
                        width={80}
                        src="https://i.gifer.com/ZZ5H.gif"
                        alt=""
                      />
                    </center>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              {/* pagination is here */}
              <div className="pagination mt-2">
                <div className="pages">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="next"
                    onPageChange={(event) => {
                      getPaginationData(event.selected + 1);
                    }}
                    pageRangeDisplayed={2}
                    pageCount={state.totalPages}
                    previousLabel="prev"
                    renderOnZeroPageCount={null}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default FilesList;
