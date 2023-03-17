import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import { authenticate, getToken } from "../../../helper/auth";
import Dashboard from "../Screens/Dashboard/Dashboard";
import { MultiSelect } from "react-multi-select-component";
import { Switch } from "@mui/material";
import { GrClose } from "react-icons/gr";
const SchoolList = () => {
  const [ModalCode, setModalCode] = useState(false);
  const [state, setState] = useState({
    isWaiting: false,
    schools: [],
    schoolNamesList: [],
    adminToken: getToken("admin"),
    totalPages: 0,
    currentPage: 1,
    country: "",
    searchItem: "",
    first: true,
    baseUrl: "",

    countryNamesList: [],
    stateNamesList: [],
    cityNamesList: [],
  });

  const [tableColumns, setTableColumns] = useState([
    {
      label: "Sr.",
      value: "Sr.",
    },
    {
      label: "Country Logo",
      value: "Country Logo",
    },
    {
      label: "School Logo",
      value: "School Logo",
    },
    {
      label: "School Name",
      value: "School Name",
    },
    {
      label: "Country",
      value: "Country",
    },
    {
      label: "State",
      value: "State",
    },
    {
      label: "City",
      value: "City",
    },
    {
      label: "Total Programs",
      value: "Total Programs",
    },
    {
      label: "Type",
      value: "Type",
    },
    {
      label: "Total Students",
      value: "Total Students",
    },
    {
      label: "Founded",
      value: "Founded",
    },
    {
      label: "Top Status",
      value: "Top Status",
    },
    // {
    //   label: "Actions",
    //   value: "Actions",
    // },
  ]);

  const [selectedColumns, setSelectedColumns] = useState([
    {
      label: "Sr.",
      value: "Sr.",
    },
    {
      label: "Country Logo",
      value: "Country Logo",
    },
    {
      label: "School Logo",
      value: "School Logo",
    },
    {
      label: "School Name",
      value: "School Name",
    },
    {
      label: "Country",
      value: "Country",
    },
    {
      label: "Total Programs",
      value: "Total Programs",
    },
    {
      label: "Top Status",
      value: "Top Status",
    },
    {
      label: "Actions",
      value: "Actions",
    },
  ]);

  const [selectedColumnsTable, setSelectedColumnsTable] = useState([
    "Sr.",
    "Country Logo",
    "School Logo",
    "School Name",
    "Country",
    "Total Programs",
    "Top Status",
    "Actions",
  ]);

  const navigate = useNavigate();
  useEffect(() => {
    // get school name and id list
    axios
      .post(
        process.env.REACT_APP_NODE_URL +
        "/admin/getschoolnameidandcountrieslist",
        {}
      )
      .then((res) => {
        console.log({ responseSchools: res });
        getPaginationData(
          1,
          res.data.schoolNamesList,
          res.data.countryNameList,
          res.data.cityNameList,
          res.data.stateNameList
        );
        setState({
          ...state,
          isWaiting: false,
        });
      })
      .catch((err) => {
        console.log(err);
        // alert(err.response.data.message)
      });
  }, []);

  const getPaginationData = (
    page,
    schoolsList,
    countryList,
    cityList,
    stateList
  ) => {
    setState({
      ...state,
      isWaiting: true,
    });

    let countryId = document.getElementById("countryId").value;
    let stateId = document.getElementById("stateId").value;
    let cityId = document.getElementById("cityId").value;
    let searchItem = document.getElementById("searchItem").value;

    const config = { headers: { Authorization: `Bearer ${state.adminToken}` } };
    let data = { currentPage: page, countryId, stateId, cityId, searchItem };
    axios
      .post(process.env.REACT_APP_NODE_URL + "/admin/getschools", data, config)
      .then((res) => {
        console.log(res);
        state.first
          ? setState({
            ...state,
            schools: res.data.details.schools,
            totalPages: res.data.details.totalPages,
            currentPage: res.data.details.currentPage,
            schoolNamesList: schoolsList,
            countryNamesList: countryList,
            cityNamesList: cityList,
            stateNamesList: stateList,
            isWaiting: false,
            first: false,
            baseUrl: res.data.details.baseUrl,
          })
          : setState({
            ...state,
            schools: res.data.details.schools,
            totalPages: res.data.details.totalPages,
            currentPage: res.data.details.currentPage,
            isWaiting: false,
          });
      })
      .catch((err) => {
        console.log(err.response.data);
        // alert(err.response.data.message)
      });
  };

  const handleChange = (e) => {
    if (e.target.name == "countryId") {
      getStates(e.target.value);
    } else if (e.target.name == "stateId") {
      getCities(e.target.value);
    } else {
      // getPaginationData(1)
    }
  };

  const getStates = (countryId) => {
    if (countryId == "") {
      setState({
        ...state,
        stateNamesList: [],
        cityNamesList: [],
      });
      return;
    }
    axios
      .get(process.env.REACT_APP_NODE_URL + "/address/state/" + countryId)
      .then((stateResponse) => {
        console.log({ stateResponse });
        if (stateResponse.data.status == "1") {
          setState({
            ...state,
            countryId,
            stateNamesList: stateResponse.data.details.state,
          });
        }
      });
  };

  const getCities = (stateId) => {
    if (stateId == "") {
      setState({
        ...state,
        cityNamesList: [],
      });
      return;
    }
    axios
      .get(process.env.REACT_APP_NODE_URL + "/address/city/" + stateId)
      .then((cityResponse) => {
        console.log({ cityResponse });
        if (cityResponse.data.status == "1") {
          setState({
            ...state,
            stateId,
            cityNamesList: cityResponse.data.details.city,
          });
        }
      });
  };

  const toggleTopStatus = (sId) => {
    const config = { headers: { Authorization: `Bearer ${state.adminToken}` } };
    let data = { sId };
    axios
      .post(
        process.env.REACT_APP_NODE_URL + "/admin/toggletopstatusschool",
        data,
        config
      )
      .then((res) => {
        console.log({ res });
      })
      .catch((err) => {
        console.log(err.response.data);
        // alert(err.response.data.message)
      });
  };
  return (
    <>
      <div heading_title={"Schools List"}>
        <>
          <div className="row min-height-vh-100">
            <div className="row p-45">
              <div className="col-12 mt-4">
                <div className="headerr d-flex align-items-end justify-content-end">
                  {/* <button className="btn AddDataBtn">Add</button> */}
                  {/* <button className="btn AddDataBtn" onClick={()=>navigate("/admin/addschools")}>Import</button> */}
                </div>
                <div className="flex p-2 items-end justify-end">
                  {/* <div className="filter-group w-[200px]">
                    <MultiSelect
                      id=""
                      options={tableColumns}
                      value={selectedColumns}
                      onChange={(value, b) => {
                        setSelectedColumns(value);
                        let newVal = value.map((val) => val.label);
                        setSelectedColumnsTable(newVal);
                      }}
                      labelledBy="Advance"
                    />
                  </div> */}
                </div>
                <div className="schoolFilters mb-4">
                  <div className="left">
                    <div className="filter-group  m-2">
                      <label htmlFor="" className="">
                        Country
                      </label>
                      <select
                        className="uppercase rounded border-2 border-black form-control p-2"
                        name="countryId"
                        id="countryId"
                        onChange={handleChange}
                      >
                        <option value="" selected>
                          -- Select Country --
                        </option>
                        <option value="">All</option>
                        {state.countryNamesList.map((country) => {
                          return (
                            <option
                              className="uppercase"
                              value={country.countryId}
                            >
                              {country.countryName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="filter-group  m-2">
                      <label htmlFor="" className="">
                        State
                      </label>
                      <select
                        className="uppercase rounded border-2 border-black form-control p-2"
                        name="stateId"
                        id="stateId"
                        onChange={handleChange}
                      >
                        <option value="" selected>
                          -- Select State --
                        </option>
                        <option value="">All</option>
                        {state.stateNamesList.map((state) => {
                          return (
                            <option className="uppercase" value={state.stateId}>
                              {state.stateName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="filter-group  m-2">
                      <label htmlFor="" className="">
                        City
                      </label>
                      <select
                        className="uppercase rounded border-2 border-black form-control p-2"
                        name="cityId"
                        id="cityId"
                        onChange={handleChange}
                      >
                        <option value="" selected>
                          -- Select City --
                        </option>
                        <option value="">All</option>
                        {state.cityNamesList.map((city) => {
                          return (
                            <option className="uppercase" value={city.cityId}>
                              {city.cityName}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="btn_outerxx">
                      <button
                        onClick={() => setModalCode(!ModalCode)}
                        className="bg-gradient-primary px-6 py-2 text-white rounded  adcol-btn"
                      >
                        Columns
                      </button>
                      {ModalCode ? (
                        <div className="modal_cover">
                          <div className="modal_inner select-col-popup">
                            <div className="header_modal">
                              <h1 className="capitalize font-bold text-lg mb-2">
                                select columns
                              </h1>
                              <p className="border-b pb-2 mb-2">
                                Select the column you want to show or hide in
                                option chain.
                              </p>
                              <div className="flex" style={{ justifyContent: 'space-between' }}>
                                <div className="mb-3 pb-3  gap-16">
                                  <div>
                                    <p className="mb-0 gap-2">
                                      <input type="checkbox" />
                                      Select All
                                    </p>
                                  </div>
                                  <div>
                                    <p className="mb-0 gap-2">
                                      <input type="checkbox" />
                                      Sr.
                                    </p>
                                  </div>
                                  <div>
                                    <p className="mb-0 gap-2">
                                      <input type="checkbox" />
                                      Country Logo
                                    </p>
                                  </div>
                                  <div>
                                    <p className="mb-0 gap-2">
                                      <input type="checkbox" />
                                      School Logo
                                    </p>
                                  </div>
                                  <div>
                                    <p className="mb-0 gap-2">
                                      <input type="checkbox" />
                                      School Name
                                    </p>
                                  </div>
                                </div>
                                <div className="mb-3 pb-3  gap-16">
                                  <div>
                                    <p className="mb-0 gap-2">
                                      <input type="checkbox" />
                                      Country
                                    </p>
                                  </div>
                                  <div>
                                    <p className="mb-0 gap-2">
                                      <input type="checkbox" />
                                      State
                                    </p>
                                  </div>
                                  <div>
                                    <p className="mb-0 gap-2">
                                      <input type="checkbox" />
                                      City
                                    </p>
                                  </div>
                                  <div>
                                    <p className="mb-0 gap-2">
                                      <input type="checkbox" />
                                      Total Programs
                                    </p>
                                  </div>
                                </div>
                                <div className="mb-3 pb-3  gap-16">
                                  <div>
                                    <p className="mb-0 gap-2">
                                      <input type="checkbox" />
                                      Type
                                    </p>
                                  </div>
                                  <div>
                                    <p className="mb-0 gap-2">
                                      <input type="checkbox" />
                                      Total Students
                                    </p>
                                  </div>
                                  <div>
                                    <p className="mb-0 gap-2">
                                      <input type="checkbox" />
                                      Founded
                                    </p>
                                  </div>
                                  <div>
                                    <p className="mb-0 gap-2">
                                      <input type="checkbox" />
                                      Top Status
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="button-part flex justify-end items-center gap-4">
                                <button className="py-2 px-6" type="btn">
                                  Reset all
                                </button>
                                <button className="py-2 px-6" type="btn">
                                  Ok
                                </button>
                              </div>
                              <GrClose onClick={() => setModalCode(false)} />
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="right">
                    <div className="filter-group wid-label">
                      <input
                        className="form-control rounded border-2 border-black p-2"
                        type="text"
                        placeholder="SEARCH"
                        id="searchItem"
                        name="searchItem"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-[dark] flex justify-end">
                  <button
                    className="bg-gradient-primary px-4 py-2 text-white rounded mb-2"
                    onClick={() => getPaginationData(1)}
                  >
                    Find
                  </button>
                </div>

                {state.isWaiting ? (
                  <>
                    <center className="mt-4">
                      <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </center>
                  </>
                ) : (
                  <div className="card mb-4 shadow-lg border border-2 p-4">
                    <div className="card-body px-0 pt-0 pb-2">
                      <div className="table-responsive p-0">
                        <table className="table mb-0 w-full designedTable">
                          <thead>
                            <tr>
                              {tableColumns.map((col) => {
                                for (
                                  let index = 0;
                                  index < selectedColumns.length;
                                  index++
                                ) {
                                  const element = selectedColumns[index];
                                  if (element.label == col.label) {
                                    return (
                                      <th className="p-2 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-left">
                                        {col.label}
                                      </th>
                                    );
                                  }
                                }
                              })}
                            </tr>
                          </thead>
                          <tbody>
                            {state.schools.map((school, index) => {
                              console.log({ school });
                              return (
                                <tr>
                                  {selectedColumnsTable.includes("Sr.") && (
                                    <td className="p-2">
                                      <p className="text-xs font-weight-bold mb-0">
                                        {index + 1}
                                      </p>
                                    </td>
                                  )}
                                  {selectedColumnsTable.includes(
                                    "Country Logo"
                                  ) && (
                                      <td className="p-2">
                                        <div className="mr-2">
                                          <img
                                            width={60}
                                            src={
                                              state.baseUrl +
                                              school?.school_meta_details
                                                .schoolLogo
                                            }
                                            className="avatar avatar-sm me-3"
                                            alt="user1"
                                          />
                                        </div>
                                      </td>
                                    )}
                                  {selectedColumnsTable.includes(
                                    "School Logo"
                                  ) && (
                                      <td className="p-2">
                                        <div className="mr-2">
                                          <img
                                            width={60}
                                            src={
                                              state.baseUrl +
                                              school?.school_meta_details
                                                .countryLogo
                                            }
                                            className="avatar avatar-sm me-3"
                                            alt="user1"
                                          />
                                        </div>
                                      </td>
                                    )}
                                  {selectedColumnsTable.includes(
                                    "School Name"
                                  ) && (
                                      <td className="p-2">
                                        <div className="d-flex flex-column justify-content-center">
                                          <h6
                                            className="mb-0 text-sm hover-underline"
                                            onClick={() =>
                                              navigate(
                                                "/d/admin/programs/" + school._id
                                              )
                                            }
                                          >
                                            {school.school_name}
                                          </h6>
                                          <p className="text-xs text-secondary mb-0">
                                            {school.school_location}
                                          </p>
                                        </div>
                                      </td>
                                    )}
                                  {selectedColumnsTable.includes("Country") && (
                                    <td className="p-2 capitalize">
                                      {school.country}
                                    </td>
                                  )}
                                  {selectedColumnsTable.includes("State") && (
                                    <td className="p-2 capitalize">
                                      {school.state}
                                    </td>
                                  )}
                                  {selectedColumnsTable.includes("City") && (
                                    <td className="p-2 capitalize">
                                      {school.city}
                                    </td>
                                  )}
                                  {selectedColumnsTable.includes(
                                    "Total Programs"
                                  ) && (
                                      <td className="p-2  align-middle text-center">
                                        <span className="text-secondary text-xs font-weight-bold">
                                          {school.school_programs.length}
                                        </span>
                                      </td>
                                    )}
                                  {selectedColumnsTable.includes("Type") && (
                                    <td className="p-2  align-middle text-center">
                                      <span className="text-secondary text-xs font-weight-bold">
                                        {school.type}
                                      </span>
                                    </td>
                                  )}
                                  {selectedColumnsTable.includes(
                                    "Total Students"
                                  ) && (
                                      <td className="p-2  align-middle text-center">
                                        <span className="text-secondary text-xs font-weight-bold">
                                          {school.total_student}
                                        </span>
                                      </td>
                                    )}
                                  {selectedColumnsTable.includes("Founded") && (
                                    <td className="p-2  align-middle text-center">
                                      <span className="text-secondary text-xs font-weight-bold">
                                        {school.founded}
                                      </span>
                                    </td>
                                  )}
                                  {selectedColumnsTable.includes(
                                    "Top Status"
                                  ) && (
                                      <td className="p-2 text-center">
                                        {Boolean(school.top_status) != false ? (
                                          <Switch
                                            color="primary"
                                            defaultChecked
                                            onClick={(e) => {
                                              if (
                                                window.confirm("Are you sure ?")
                                              ) {
                                                toggleTopStatus(school._id);
                                              } else {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                return false;
                                              }
                                            }}
                                          />
                                        ) : (
                                          <Switch
                                            color="primary"
                                            onClick={(e) => {
                                              if (
                                                window.confirm("Are you sure ?")
                                              ) {
                                                toggleTopStatus(school._id);
                                              } else {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                return false;
                                              }
                                            }}
                                          />
                                        )}
                                      </td>
                                    )}
                                  {/* {
                                                                            selectedColumnsTable.includes("Actions") &&
                                                                            <td className="p-2 border-2 align-middle text-center">
                                                                                <Link to={"/d/admin/schoolupdate/" + school._id}>Edit</Link>
                                                                            </td>
                                                                        } */}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
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
                )}
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default SchoolList;
