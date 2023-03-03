import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { authenticate, getToken } from "../../../helper/auth";
import Dashboard from "../Screens/Dashboard/Dashboard";

const StudentList = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    isWaiting: false,
    students: [],
    adminToken: getToken("admin"),
    totalPages: 0,
    currentPage: 1,
  });

  useEffect(() => {
    getPaginationData(1);
  }, []);

  const getPaginationData = (page) => {
    setState({
      ...state,
      isWaiting: true,
    });
    const config = { headers: { Authorization: `Bearer ${state.adminToken}` } };
    let data = { currentPage: page };
    axios
      .post(process.env.REACT_APP_NODE_URL + "/admin/getstudents", data, config)
      .then((res) => {
        console.log(res);
        setState({
          ...state,
          students: res.data.details.students,
          totalPages: res.data.details.totalPages,
          currentPage: res.data.details.currentPage,
          isWaiting: false,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        setState({
          isWaiting: false,
        });
        alert(err.response.data.message);
      });
  };

  return (
    <>
      <div heading_title={"Total Students"}>
        <>
          <div className="row min-height-vh-100">
            <div className="row p-45">
              <div className="w-full">
                <div className="shadow-lg mb-4 mt-4">
                  <div className="px-0 pt-0 pb-2">
                    <div className="table-responsive p-0">
                      <table className="table w-full mb-0">
                        <thead>
                          <tr>
                            <th className="border-2 p-2">Id</th>
                            <th className="border-2 p-2 text-left">Name</th>
                            <th className="border-2 p-2">Date</th>
                            <th className="text-secondary opacity-7" />
                          </tr>
                        </thead>
                        <tbody>
                          {state.isWaiting ? (
                            <></>
                          ) : (
                            state.students.map((student, index) => {
                              return (
                                <tr>
                                  <td className="p-1 border-2 text-center">
                                    <p className="text-xs font-weight-bold mb-0">
                                      {index + 1}
                                    </p>
                                  </td>
                                  <td className="p-1 border-2">
                                    <div className="flex align-end px-2 py-1">
                                      <div className="mx-2">
                                        <img
                                          width={"50px"}
                                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxLDEajEW8QIw_X_Zt5S-1rxj0-lhuljenolf6zjfThRco-WTZIlp_QU-BIFFBhjhp9uM&usqp=CAU"
                                          className="avatar avatar-sm me-3 rounded"
                                          alt="user1"
                                        />
                                      </div>
                                      <div className="d-flex flex-column justify-content-center">
                                        <h6
                                          className="mb-0 text-sm hover:underline cursor-pointer"
                                          onClick={() =>
                                            navigate(
                                              "/d/admin/studentprofile?id=" +
                                                student._id
                                            )
                                          }
                                        >
                                          {student.firstName} {student.lastName}
                                        </h6>
                                        <p className="text-xs text-secondary mb-0 pb-0">
                                          {student.email}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-1 border-2 text-center">
                                    <span className="text-secondary text-xs font-weight-bold">
                                      {(new Date(student.createdAt)).toLocaleString()}
                                    </span>
                                  </td>
                                  <td className="p-1 border-2 text-center">
                                    {/* <a
                                      href="javascript:;"
                                      className="text-secondary font-weight-bold text-xs"
                                      data-toggle="tooltip"
                                      data-original-title="Edit user"
                                    >
                                      Edit
                                    </a> */}
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
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
                  <div className="card-footer pb-0">
                    {/* pagination is here */}
                    <div className="pagination">
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
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default StudentList;
