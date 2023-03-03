import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./common/ProtectedRoute";
import { getToken } from "./helper/auth";
import Home from "./Home";
import AddSchools from "./users/admin/Pages/AddSchools";
import AdminSubStudents from "./users/admin/Pages/AdminSubStudents";
import DashboardPage from "./users/admin/Pages/DashboardPage";
import Login from "./users/admin/Pages/Login";
import Manage from "./users/admin/Pages/Manage";
import ProgramsList from "./users/admin/Pages/ProgramsList";
import SchoolList from "./users/admin/Pages/SchoolList";
import StudentList from "./users/admin/Pages/StudentList";
import AgentAddStudent from "./users/agent/Pages/AgentAddStudent";
import AgentGetStudent from "./users/agent/Pages/AgentGetStudent";
import AgentLogin from "./users/agent/Pages/AgentLogin";
import AgentProfile from "./users/agent/Pages/AgentProfile";
import AgentRegister from "./users/agent/Pages/AgentRegister";
import AgentDashboard from "./users/agent/Screens/Dashboard/AgentDashboard";
import StudentConfirm from "./users/student/common/StudentConfirm";
import StudentLogin from "./users/student/Pages/StudentLogin";
import StudentRegister from "./users/student/Pages/StudentRegister";
import StudentDashboard from "./users/student/Screens/Dashboard/StudentDashboard";
import AddCountry from "./users/admin/Pages/AddCountry";
import AddSchoolsName from "./users/admin/Pages/AddSchoolName";
import Notifications from "./users/admin/Pages/Notifications";

// import WebsiteHome from "./users/website/screens/WebsiteMain";
import WHome from "./users/website/Pages/WHome";
import WEligible from "./users/website/Pages/WEligible";
import WSearch from "./users/website/Pages/WSearch";
import axios from "axios";
import AdminAgentProfile from "./users/admin/Pages/AdminAgentProfile";
import AgentNotifications from "./users/agent/Pages/AgentNotifications";
import CreateEmployee from "./users/admin/Pages/CreateEmployee";
import EmployeeList from "./users/admin/Pages/EmployeeList";
import Header from "./users/admin/common/Header/Header";
import Navbar from "./users/admin/common/Header/Navbar";
import Dashboard from "./users/admin/Screens/Dashboard/Dashboard";
import { requestForToken } from "./firebase";
import Notification from "./common/Notifications";
import StudentForgot from "./users/student/common/StudentForgot";
import IntakesManagement from "./users/admin/Pages/IntakesManagement";
// import DataTable from "./users/admin/Pages/DataTable";
import SchoolUpdate from "./users/admin/Pages/SchoolUpdate";
import AssessmentForms from "./users/admin/Pages/AssessmentForms";
import SearchQueryForms from "./users/admin/Pages/SearchQueryForms";
import StudentEnrolled from "./users/student/Pages/StudentEnrolled";
import StudentDocuments from "./users/student/Pages/StudentDocuments";
import AdminStudentProfile from "./users/admin/Pages/AdminStudentProfile";
import StudentNotifications from "./users/student/Pages/StudentNotifications";
import StudentHistory from "./users/student/Pages/StudentHistory";
import StudentRemarks from "./users/student/Pages/StudentRemarks";

// web-socket
// import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://127.0.0.1:3006";
// console.log("COnnecting")
// const socket = socketIOClient(ENDPOINT);

const App = () => {
  const roleFromUrl = window.location.href.split("/")[4];
  const [state, setState] = useState({
    wait: true,
    tokenAdmin: false,
    tokenAgent: false,
    tokenStudent: false,
    currentPermissions: [],
  });

  // useEffect(() => {
  //   socket.on("FromAPI", data => {
  //     console.log(data)
  //   });
  // }, []);

  useEffect(() => {

    let tokenAdmin = getToken("admin");
    let tokenAgent = getToken("agent");
    let tokenStudent = getToken("student");

    // get Permissions
    var myToken;
    if (roleFromUrl == "admin") {
      myToken = tokenAdmin;
      const config = { headers: { Authorization: `Bearer ${myToken}` } };
      requestForToken().then((token) => {
        axios
          .post(
            process.env.REACT_APP_NODE_URL + "/admin/verifyToken",
            { token },
            config
          )
          .then((res) => {
            console.log({ res });
            if (res.data.status == "0") {
              setState({
                ...state,
                wait: false,
                currentPermissions: "ALLOW",
                tokenAdmin,
                tokenAgent,
                tokenStudent,
              });
              return;
            }
            if (res.data.details.userData.role != "ADMIN") {
              setState({
                ...state,
                currentPermissions: res.data.details.userData.permissions,
                wait: false,
                tokenAdmin,
                tokenAgent,
                tokenStudent,
              });
              return;
            }

            setState({
              ...state,
              currentPermissions: "ALLOW",
              wait: false,
              tokenAdmin,
              tokenAgent,
              tokenStudent,
            });
            return;
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      });
    } else if (roleFromUrl == "student") {
      myToken = tokenStudent;
      const config = { headers: { Authorization: `Bearer ${myToken}` } };
      requestForToken().then((token) => {
        axios
          .post(
            process.env.REACT_APP_NODE_URL + "/student/verifyToken",
            { token },
            config
          )
          .then((res) => {
            console.log({ res });
            setState({
              ...state,
              currentPermissions: "ALLOW",
              wait: false,
              tokenAdmin,
              tokenAgent,
              tokenStudent,
            });
            return;
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      });
    } else {
      setState({
        ...state,
        currentPermissions: "ALLOW",
        wait: false,
        tokenAdmin,
        tokenAgent,
        tokenStudent,
      });
    }
  }, []);

  if (state.wait) {
    return (
      <center className="bg-white flex h-screen items-center justify-center">
        <img
          width={"500px"}
          src="https://miro.medium.com/max/1400/1*Gvgic29bgoiGVLmI6AVbUg.gif"
        />
      </center>
    );
  }
  return (
    <>
      <Notification />
      <Routes>
        <Route path="/d/" element={<Home isAdmin={false} />} />
        <Route
          path="/d/adminlogin123"
          element={
            <Home isAdmin={true} role="ADMIN" token={state.tokenAdmin} />
          }
        />
        <Route path="/d/admin" element={<Dashboard />}>
          <Route
            index
            element={
              <ProtectedRoute token={state.tokenAdmin} role={"admin"}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute token={state.tokenAdmin} role={"admin"}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="students"
            element={
              <ProtectedRoute
                token={state.tokenAdmin}
                role={"admin"}
                permissions={state.currentPermissions}
                permission_name={"student_list"}
              >
                <StudentList />
              </ProtectedRoute>
            }
          />
          <Route
            path="manage"
            element={
              <ProtectedRoute
                token={state.tokenAdmin}
                role={"admin"}
                permissions={state.currentPermissions}
                permission_name={"csv_programs"}
              >
                <Manage />
              </ProtectedRoute>
            }
          />
          <Route
            path="agentprofile"
            element={
              <ProtectedRoute token={state.tokenAdmin} role={"admin"}>
                <AdminAgentProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="studentprofile"
            element={
              <ProtectedRoute token={state.tokenAdmin} role={"admin"}>
                <AdminStudentProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="studentprofile"
            element={
              <ProtectedRoute token={state.tokenAdmin} role={"admin"}>
                <AdminAgentProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="schools"
            element={
              <ProtectedRoute
                token={state.tokenAdmin}
                role={"admin"}
                permissions={state.currentPermissions}
                permission_name={"sp_list"}
              >
                <SchoolList />
              </ProtectedRoute>
            }
          />
          <Route
            path="programs/:id"
            element={
              <ProtectedRoute
                token={state.tokenAdmin}
                role={"admin"}
                permissions={state.currentPermissions}
                permission_name={"sp_list"}
              >
                <ProgramsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="addschools"
            element={
              <ProtectedRoute
                token={state.tokenAdmin}
                role={"admin"}
                permissions={state.currentPermissions}
                permission_name={"csv_programs"}
              >
                <AddSchools />
              </ProtectedRoute>
            }
          />
          <Route
            path="agent_students/:agentId"
            element={
              <ProtectedRoute
                token={state.tokenAdmin}
                role={"admin"}
                permissions={state.currentPermissions}
                permission_name={"csv_programs"}
              >
                <AdminSubStudents />
              </ProtectedRoute>
            }
          />
          <Route
            path="addcountry"
            element={
              <ProtectedRoute
                token={state.tokenAdmin}
                role={"admin"}
                permissions={state.currentPermissions}
                permission_name={"sp_country_names"}
              >
                <AddCountry />
              </ProtectedRoute>
            }
          />
          <Route
            path="addschoolname"
            element={
              <ProtectedRoute
                token={state.tokenAdmin}
                role={"admin"}
                permissions={state.currentPermissions}
                permission_name={"sp_school_names"}
              >
                <AddSchoolsName />
              </ProtectedRoute>
            }
          />
          <Route
            path="createemployee"
            element={
              <ProtectedRoute
                token={state.tokenAdmin}
                role={"admin"}
                permissions={state.currentPermissions}
                permission_name={"employee_create"}
              >
                <CreateEmployee />
              </ProtectedRoute>
            }
          />
          <Route
            path="listemployee"
            element={
              <ProtectedRoute
                token={state.tokenAdmin}
                role={"admin"}
                permissions={state.currentPermissions}
                permission_name={"employee_list"}
              >
                <EmployeeList />
              </ProtectedRoute>
            }
          />
          <Route
            path="notifications"
            element={
              <ProtectedRoute
                token={state.tokenAdmin}
                role={"admin"}
                permissions={state.currentPermissions}
              >
                <Notifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="assessmentforms"
            element={
              <ProtectedRoute
                token={state.tokenAdmin}
                role={"admin"}
                permissions={state.currentPermissions}
              >
                <AssessmentForms />
              </ProtectedRoute>
            }
          />
          <Route
            path="serachqueries"
            element={
              <ProtectedRoute
                token={state.tokenAdmin}
                role={"admin"}
                permissions={state.currentPermissions}
              >
                <SearchQueryForms />
              </ProtectedRoute>
            }
          />
          <Route
            path="intakes"
            element={
              <ProtectedRoute
                token={state.tokenAdmin}
                role={"admin"}
                permissions={state.currentPermissions}
              >
                <IntakesManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="intakes_program"
            element={
              <ProtectedRoute
                token={state.tokenAdmin}
                role={"admin"}
                permissions={state.currentPermissions}
              >
                <IntakesManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="schoolupdate/:schoolId"
            element={
              <ProtectedRoute
                token={state.tokenAdmin}
                role={"admin"}
                permissions={state.currentPermissions}
              >
                <SchoolUpdate />
              </ProtectedRoute>
            }
          />

          {/* demo */}
          {/* <Route path="demodatatable" element={<ProtectedRoute token={state.tokenAdmin} role={"admin"} permissions={state.currentPermissions}><DataTable /></ProtectedRoute>} /> */}
        </Route>

        {/* website routes */}
        <Route path="/" element={<WHome />} />
        <Route path="/eligible" element={<WEligible />} />
        <Route path="/search/:query" element={<WSearch />} />

        {/* <Route path="/" element={<Home />} /> */}

        {/* dashboard Routes */}
        {/* <Route path="/d/" element={<Home isAdmin={false} />} />
        <Route path="/d/adminlogin123" element={<Home isAdmin={true} role="ADMIN" token={state.tokenAdmin} />} /> */}

        {/* admin routes */}
        {/* <Route path="/d/admin/login" element={<Login />} /> */}

        {/* agent routes */}
        <Route path="/d/agent" element={<AgentDashboard />}>
          <Route index element={<>Dashbaord page</>} />
          <Route path="dashboard" element={<>Dashbaord page</>} />
          <Route path="login" element={<AgentLogin />} />
          <Route path="register" element={<AgentRegister />} />
          <Route path="addstudent" element={<AgentAddStudent />} />
          <Route path="getstudents" element={<AgentGetStudent />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute token={state.tokenAgent} role={"agent"}>
                <AgentProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="notifications"
            element={
              <ProtectedRoute token={state.tokenAgent} role={"agent"}>
                <AgentNotifications />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* student routes */}
        <Route path="/d/student/confirm/:token" element={<StudentConfirm />} />
        <Route path="/d/student" element={<StudentDashboard />}>
          <Route
            index
            element={
              <StudentEnrolled />
            }
          />
          {/* <Route
            path="dashboard"
            element={
              <ProtectedRoute token={state.tokenStudent} role={"student"}>
                {
                  <>
                    {" "}
                    <h1 className="text-xl m-3 font-black">Dashboard</h1>{" "}
                  </>
                }
              </ProtectedRoute>
            }
          /> */}
          <Route path="login" element={<StudentLogin />} />
          <Route path="register" element={<StudentRegister />} />
          <Route path="forgot/" element={<StudentForgot />} />
          <Route path="forgot/:token" element={<StudentForgot />} />
          <Route path="enrolled" element={<StudentEnrolled />} />
          <Route path="documents" element={<StudentDocuments />} />
          <Route path="notifications" element={<StudentNotifications />} />
          <Route path="history" element={<StudentHistory />} />
          <Route path="remarks" element={<StudentRemarks />} />
        </Route>

        {/* <Route path="*" element={<><center className="pt-5 text-danger text-bold text-decoration-underline">404 Not Found</center></>} /> */}
      </Routes>
    </>
  );
};

export default App;
