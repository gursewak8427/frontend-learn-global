import React, { useEffect } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../../../../helper/auth";
import axios from "axios";

const StudentHeader = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("Dashboard");
  const [permissions, setPermissions] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [firstName, setFirstName] = useState("User");
  const [role, setRole] = useState("");
  const [isWait, setIsWait] = useState(true);
  useEffect(() => {
    setActive(window.location.pathname.split("/")[3]);
    const config = {
      headers: { Authorization: `Bearer ${getToken("student")}` },
    };
    axios
      .post(process.env.REACT_APP_NODE_URL + "/student/verifyToken", {}, config)
      .then((res) => {
        console.log({ studentVerifyTokenResponse: res });
        document.getElementById("notificationCountSpan").innerText =
          res.data.details.userData.notificationsCount > 99
            ? "99+"
            : res.data.details.userData.notificationsCount;
        setFirstName(res.data.details.userData.firstName);
        setIsWait(false);
        return;
      })
      .catch((err) => {
        setIsWait(false);
        console.log(err);
      });
  }, [window.location.href]);

  const [state, setState] = useState({
    menu: -1,
  });

  const sidebarItems = [
    // {
    //   label: "Dashboard",
    //   icon: (
    //     <>
    //       <i class="fa-solid fa-chart-line"></i>
    //     </>
    //   ),
    //   path: "/d/student/dashboard",
    //   matchings: [""],
    // },
    {
      label: "Enrolled Programs",
      icon: <i class="fa-solid fa-file-csv"></i>,
      path: "/d/student/enrolled",
    },
    // {
    //   label: "Documents",
    //   icon: <i class="fa-solid fa-file-csv"></i>,
    //   path: "/d/student/documents",
    // },
    // {
    //   label: "History",
    //   icon: <i class="fa-solid fa-file-csv"></i>,
    //   path: "/d/student/history",
    // },
    // {
    //   label: "Remarks",
    //   icon: <i class="fa-solid fa-file-csv"></i>,
    //   path: "/d/student/remarks",
    // },
    // {
    //     label: "Schools",
    //     permissions: "school_main",
    //     icon: <i class="fa-solid fa-school"></i>,
    //     items: [
    //         {
    //             label: "Add Country",
    //             icon: <i class="fa-solid fa-earth-americas"></i>,
    //             permissions: "sp_country_names",
    //             path: "/d/admin/addcountry",
    //         },
    //         {
    //             label: "Add School Names",
    //             icon: <i class="fa-solid fa-school-lock"></i>,
    //             permissions: "sp_school_names",
    //             path: "/d/admin/addschoolname",
    //         },
    //         {
    //             label: "All Schools",
    //             icon: <i class="fa-solid fa-school"></i>,
    //             permissions: "sp_list",
    //             path: "/d/admin/schools",
    //         },
    //     ]
    // },
    // {
    //     label: "Sub Admin",
    //     permissions: "subadmin_main",
    //     icon: <i class="fa-solid fa-school"></i>,
    //     items: [
    //         {
    //             label: "Create",
    //             icon: <i class="fa-solid fa-user-tie"></i>,
    //             permissions: "subadmin_create",
    //             path: "/d/admin/createsubadmin",
    //         },
    //         {
    //             label: "List",
    //             icon: <i class="fa-solid fa-list"></i>,
    //             permissions: "subadmin_list",
    //             path: "/d/admin/listsubadmin",
    //         },
    //     ]
    // },
    // {
    //     label: "Counselor",
    //     permissions: "counselor_main",
    //     icon: <i class="fa-solid fa-school"></i>,
    //     items: [
    //         {
    //             label: "Create",
    //             icon: <i class="fa-solid fa-user-tie"></i>,
    //             permissions: "counselor_create",
    //             path: "/d/admin/createcounselor",
    //         },
    //         {
    //             label: "List",
    //             icon: <i class="fa-solid fa-list"></i>,
    //             permissions: "counselor_list",
    //             path: "/d/admin/listcounselor",
    //         },
    //     ]
    // },
    // // {
    // //     label: "Add Country Name",
    // //     icon: <i class="fa-solid fa-earth-americas"></i>,
    // //     path: "/d/admin/addcountry",
    // // },
    // // {
    // //     label: "Add School Name",
    // //     icon: <i class="fa-solid fa-school-lock"></i>,
    // //     path: "/d/admin/addschoolname",
    // // },
    // {
    //     label: "Agents",
    //     icon: <i class="fa-solid fa-person-rays"></i>,
    //     items: [
    //         {
    //             label: "All Agents",
    //             icon: <i class="fa-solid fa-person-rays"></i>,
    //             path: "/d/admin/manage",
    //             matchings: ["agent_students"],
    //         },
    //         {
    //             label: "Unapproved Agents",
    //             icon: <i class="fa-solid fa-user-minus"></i>,
    //             path: "/d/admin/manage?status=unapproved",
    //         }
    //     ]
    // },
    // // {
    // //     label: "Students",
    // //     icon: <i class="fa-solid fa-graduation-cap"></i>,
    // //     path: "/d/admin/students",
    // // },
  ];

  const openMenu = (menuNumber) => {
    setState({
      ...state,
      menu: state.menu == menuNumber ? -1 : menuNumber,
    });
  };

  return (
    <>
      <div className="xl:fixed top-0 h-screen">
        {/* component */}
        {isWait ? (
          <></>
        ) : (
          <>
            <div className="bg-gray-900 xl:hidden flex justify-between w-full p-6 items-center ">
              {/*- more free and premium Tailwind CSS components at https://tailwinduikit.com/ -*/}
              <div className="flex justify-between  items-center space-x-3">
                <svg
                  width={34}
                  height={34}
                  viewBox="0 0 34 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 17H0H1ZM7 17H6H7ZM17 27V28V27ZM27 17H28H27ZM17 0C12.4913 0 8.1673 1.79107 4.97918 4.97918L6.3934 6.3934C9.20644 3.58035 13.0218 2 17 2V0ZM4.97918 4.97918C1.79107 8.1673 0 12.4913 0 17H2C2 13.0218 3.58035 9.20644 6.3934 6.3934L4.97918 4.97918ZM0 17C0 21.5087 1.79107 25.8327 4.97918 29.0208L6.3934 27.6066C3.58035 24.7936 2 20.9782 2 17H0ZM4.97918 29.0208C8.1673 32.2089 12.4913 34 17 34V32C13.0218 32 9.20644 30.4196 6.3934 27.6066L4.97918 29.0208ZM17 34C21.5087 34 25.8327 32.2089 29.0208 29.0208L27.6066 27.6066C24.7936 30.4196 20.9782 32 17 32V34ZM29.0208 29.0208C32.2089 25.8327 34 21.5087 34 17H32C32 20.9782 30.4196 24.7936 27.6066 27.6066L29.0208 29.0208ZM34 17C34 12.4913 32.2089 8.1673 29.0208 4.97918L27.6066 6.3934C30.4196 9.20644 32 13.0218 32 17H34ZM29.0208 4.97918C25.8327 1.79107 21.5087 0 17 0V2C20.9782 2 24.7936 3.58035 27.6066 6.3934L29.0208 4.97918ZM17 6C14.0826 6 11.2847 7.15893 9.22183 9.22183L10.636 10.636C12.3239 8.94821 14.6131 8 17 8V6ZM9.22183 9.22183C7.15893 11.2847 6 14.0826 6 17H8C8 14.6131 8.94821 12.3239 10.636 10.636L9.22183 9.22183ZM6 17C6 19.9174 7.15893 22.7153 9.22183 24.7782L10.636 23.364C8.94821 21.6761 8 19.3869 8 17H6ZM9.22183 24.7782C11.2847 26.8411 14.0826 28 17 28V26C14.6131 26 12.3239 25.0518 10.636 23.364L9.22183 24.7782ZM17 28C19.9174 28 22.7153 26.8411 24.7782 24.7782L23.364 23.364C21.6761 25.0518 19.3869 26 17 26V28ZM24.7782 24.7782C26.8411 22.7153 28 19.9174 28 17H26C26 19.3869 25.0518 21.6761 23.364 23.364L24.7782 24.7782ZM28 17C28 14.0826 26.8411 11.2847 24.7782 9.22183L23.364 10.636C25.0518 12.3239 26 14.6131 26 17H28ZM24.7782 9.22183C22.7153 7.15893 19.9174 6 17 6V8C19.3869 8 21.6761 8.94821 23.364 10.636L24.7782 9.22183ZM10.3753 8.21913C6.86634 11.0263 4.86605 14.4281 4.50411 18.4095C4.14549 22.3543 5.40799 26.7295 8.13176 31.4961L9.86824 30.5039C7.25868 25.9371 6.18785 21.9791 6.49589 18.5905C6.80061 15.2386 8.46699 12.307 11.6247 9.78087L10.3753 8.21913ZM23.6247 25.7809C27.1294 22.9771 29.1332 19.6127 29.4958 15.6632C29.8549 11.7516 28.5904 7.41119 25.8682 2.64741L24.1318 3.63969C26.7429 8.20923 27.8117 12.1304 27.5042 15.4803C27.2001 18.7924 25.5372 21.6896 22.3753 24.2191L23.6247 25.7809Z"
                    fill="white"
                  />
                </svg>
                <p className="text-2xl leading-6 text-white">Learn Global</p>
              </div>
              <div
                aria-label="toggler"
                className="flex justify-center items-center"
              >
                <button
                  aria-label="open"
                  id="open"
                  onClick="showNav(true)"
                  className="hidden focus:outline-none focus:ring-2"
                >
                  <svg
                    className
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 6H20"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 12H20"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 18H20"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  aria-label="close"
                  id="close"
                  onClick="showNav(true)"
                  className=" focus:outline-none focus:ring-2"
                >
                  <svg
                    className
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 6L18 18"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div
              id="aside"
              className="h-screen transform  xl:translate-x-0 md:-translate-x-full  ease-in-out transition duration-500 flex justify-start items-start h-full  w-full sm:w-64 bg-gray-900 flex-col"
            >
              {/*- more free and premium Tailwind CSS components at https://tailwinduikit.com/ -*/}
              <div className="bg-[#e2e8f0] xl:flex justify-center p-3 items-center space-x-3">
                <img
                  src="/assets/img/logo-main.png"
                  className="w-10/12"
                  alt=""
                />
                {/* <svg width={34} height={34} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 17H0H1ZM7 17H6H7ZM17 27V28V27ZM27 17H28H27ZM17 0C12.4913 0 8.1673 1.79107 4.97918 4.97918L6.3934 6.3934C9.20644 3.58035 13.0218 2 17 2V0ZM4.97918 4.97918C1.79107 8.1673 0 12.4913 0 17H2C2 13.0218 3.58035 9.20644 6.3934 6.3934L4.97918 4.97918ZM0 17C0 21.5087 1.79107 25.8327 4.97918 29.0208L6.3934 27.6066C3.58035 24.7936 2 20.9782 2 17H0ZM4.97918 29.0208C8.1673 32.2089 12.4913 34 17 34V32C13.0218 32 9.20644 30.4196 6.3934 27.6066L4.97918 29.0208ZM17 34C21.5087 34 25.8327 32.2089 29.0208 29.0208L27.6066 27.6066C24.7936 30.4196 20.9782 32 17 32V34ZM29.0208 29.0208C32.2089 25.8327 34 21.5087 34 17H32C32 20.9782 30.4196 24.7936 27.6066 27.6066L29.0208 29.0208ZM34 17C34 12.4913 32.2089 8.1673 29.0208 4.97918L27.6066 6.3934C30.4196 9.20644 32 13.0218 32 17H34ZM29.0208 4.97918C25.8327 1.79107 21.5087 0 17 0V2C20.9782 2 24.7936 3.58035 27.6066 6.3934L29.0208 4.97918ZM17 6C14.0826 6 11.2847 7.15893 9.22183 9.22183L10.636 10.636C12.3239 8.94821 14.6131 8 17 8V6ZM9.22183 9.22183C7.15893 11.2847 6 14.0826 6 17H8C8 14.6131 8.94821 12.3239 10.636 10.636L9.22183 9.22183ZM6 17C6 19.9174 7.15893 22.7153 9.22183 24.7782L10.636 23.364C8.94821 21.6761 8 19.3869 8 17H6ZM9.22183 24.7782C11.2847 26.8411 14.0826 28 17 28V26C14.6131 26 12.3239 25.0518 10.636 23.364L9.22183 24.7782ZM17 28C19.9174 28 22.7153 26.8411 24.7782 24.7782L23.364 23.364C21.6761 25.0518 19.3869 26 17 26V28ZM24.7782 24.7782C26.8411 22.7153 28 19.9174 28 17H26C26 19.3869 25.0518 21.6761 23.364 23.364L24.7782 24.7782ZM28 17C28 14.0826 26.8411 11.2847 24.7782 9.22183L23.364 10.636C25.0518 12.3239 26 14.6131 26 17H28ZM24.7782 9.22183C22.7153 7.15893 19.9174 6 17 6V8C19.3869 8 21.6761 8.94821 23.364 10.636L24.7782 9.22183ZM10.3753 8.21913C6.86634 11.0263 4.86605 14.4281 4.50411 18.4095C4.14549 22.3543 5.40799 26.7295 8.13176 31.4961L9.86824 30.5039C7.25868 25.9371 6.18785 21.9791 6.49589 18.5905C6.80061 15.2386 8.46699 12.307 11.6247 9.78087L10.3753 8.21913ZM23.6247 25.7809C27.1294 22.9771 29.1332 19.6127 29.4958 15.6632C29.8549 11.7516 28.5904 7.41119 25.8682 2.64741L24.1318 3.63969C26.7429 8.20923 27.8117 12.1304 27.5042 15.4803C27.2001 18.7924 25.5372 21.6896 22.3753 24.2191L23.6247 25.7809Z" fill="white" />
                        </svg> */}
                {/* <p className="text-2xl leading-6 text-white">OvonRueden</p> */}
              </div>
              <p className="roleStyle">
                {firstName ? (
                  <span>Welcome, {firstName}</span>
                ) : (
                  <span>Welcome</span>
                )}
              </p>
              {sidebarItems.map((singleItem, index) => {
                if (singleItem?.items) {
                  // multi level sidebar
                  if (!permissions.includes(singleItem.permissions) && !isAdmin)
                    return;

                  return (
                    <div className="flex flex-col justify-start items-center   px-6 border-b border-gray-600 w-full  ">
                      <button
                        onClick={() => openMenu(index)}
                        className="focus:outline-none focus:text-indigo-400 text-left  text-white flex justify-between items-center w-full py-5 space-x-14  "
                      >
                        <p className="text-left text-sm leading-5 uppercase">
                          {singleItem.label}
                        </p>
                        <svg
                          id="icon1"
                          className={`${
                            state.menu != index ? "rotate-180" : "rotate-0"
                          } "transform"`}
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 15L12 9L6 15"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <div
                        id="menu1"
                        className={`${
                          state.menu != index ? "hidden" : ""
                        } flex justify-start flex-col w-full md:w-auto items-start pb-1 `}
                      >
                        {singleItem.items.map((subItem) => {
                          if (
                            !permissions.includes(subItem.permissions) &&
                            !isAdmin
                          )
                            return;
                          return (
                            <button
                              onClick={() => navigate(subItem.path)}
                              className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52"
                            >
                              <div className="w-4">{subItem.icon}</div>
                              <p
                                className="text-left text-base leading-4"
                                style={{ marginLeft: "15px" }}
                              >
                                {subItem.label}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                } else {
                  // single sidebar
                  if (
                    !permissions.includes(singleItem.permissions) &&
                    !isAdmin &&
                    singleItem.permissions
                  )
                    return;
                  return (
                    <>
                      <div className="mt-6 flex flex-col justify-start items-center pl-8 w-full border-gray-600 border-b space-y-3 pb-5 ">
                        <button
                          onClick={() => navigate(singleItem.path)}
                          className="flex jusitfy-start items-center space-x-6 w-full  focus:outline-none  focus:text-indigo-400  text-white rounded "
                        >
                          <span className="">{singleItem.icon}</span>
                          <p className="text-base leading-4">
                            {singleItem.label}
                          </p>
                        </button>
                      </div>
                    </>
                  );
                }
              })}
            </div>
          </>
        )}
      </div>
    </>
  );

  return (
    <>
      <aside
        className="sidenav navbar navbar-vertical navbar-expand-xs fixed-start"
        id="sidenav-main"
      >
        <div className="sidenav-header">
          <i
            className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
            aria-hidden="true"
            id="iconSidenav"
          />
          <a
            className="navbar-brand m-0"
            href=" https://demos.creative-tim.com/soft-ui-dashboard/pages/dashboard.html "
            target="_blank"
          >
            <img
              src="/assets/img/logo-main.png"
              className="navbar-brand-img h-100"
              alt="main_logo"
            />
          </a>
          {/* <span className="font-weight-bold">
                        <center><span>ADMIN</span></center>
                    </span> */}
        </div>
        <hr className="horizontal dark mt-0" />
        <div className="w-auto " id="sidenav-collapse-main">
          <ul className="navbar-nav">
            {sidebarItems.map((item) => {
              // if (item?.items) {
              //     item?.items.map(subItem => {
              //         console.log("subItem")
              //         console.log(subItem)
              //         return <li className="nav-item">
              //             <Link className={active == subItem.path.split("/")[2] || subItem?.matchings?.includes(active) ? "nav-link active" : "nav-link"} to={subItem.path}>
              //                 <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
              //                     {subItem.icon}
              //                 </div>
              //                 <span className="nav-link-text ms-1">{subItem.label}</span>
              //             </Link>
              //         </li>
              //     })
              //     return;
              // }
              return (
                <li className="nav-item">
                  <Link
                    className={
                      active == item?.path?.split("/")[3] ||
                      item?.matchings?.includes(active)
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={item?.path}
                  >
                    <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                      {item.icon}
                    </div>
                    <span className="nav-link-text ms-1">{item.label}</span>
                  </Link>
                </li>
              );
            })}
            {/* header line */}
            {/* <li className="nav-item mt-3">
                            <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Account pages</h6>
                        </li> */}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default StudentHeader;
