import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Footer from "../../common/Footer/StudentFooter";
import Header from "../../common/Header/StudentHeader";
import Navbar from "../../common/Header/StudentNavbar";
import { Helmet } from "react-helmet";
import StudentHeader from "../../common/Header/StudentHeader";
import StudentNavbar from "../../common/Header/StudentNavbar";
import StudentFooter from "../../common/Footer/StudentFooter";
import StudentEmailConfirmationReminder from "../../common/StudentEmailConfirmationReminder";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../../../helper/auth";

const StudentDashboard = ({ children }) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    isEmailVerified: true,
    isWait: true,
    token: getToken("student"),
    student: "",
  });

  useEffect(() => {
    const config = { headers: { Authorization: `Bearer ${state.token}` } };
    axios
      .get(
        process.env.REACT_APP_NODE_URL + "/student/get_email_verification",
        config
      )
      .then((res) => {
        // window.location.href = "/student/"
        console.log({ res });
        if (res.data.status == "1") {
          setState({
            ...state,
            isEmailVerified: true,
            isWait: false,
            student: res.data.details.student,
          });
        } else {
          alert("Not Verify");
          setState({
            ...state,
            isEmailVerified: false,
            isWait: false,
            student: res.data.details.student,
          });
        }
      })
      .catch((err) => {
        setState({
          ...state,
          isWait: false,
        });
        console.log(err.response.data);
      });
  }, []);

  if (state.isWait) {
    return "Loading...";
    console.log(state.isEmailVerified);
  }

  return (
    <>
      {!state.isEmailVerified ? (
        <>
          <StudentEmailConfirmationReminder />
        </>
      ) : (
        ""
      )}

      {state.student.status == "PENDING" &&
      (window.location.href.split("/")[5] == "" ||
        window.location.href.split("/")[5] == "dashboard") ? (
        <div className="overlay active">
          <div className="pendingDocAlert popup active">
            <div class="pending-documents">
              <i class="fas fa-exclamation-circle"></i>
              <h2>Pending Documents</h2>
              <p>
                Please Uploads required documents to approve your application.
              </p>
              <button onClick={() => navigate("/d/student/documents")}>
                Upload Documents
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <StudentHeader />
      <main className="ml-[255px]">
        <StudentNavbar />
        <div className="innerBox">
          <div style={{ minHeight: "85vh" }}>
            <Outlet />
          </div>
          
          <StudentFooter />
        </div>
      </main>
      <Helmet>
        <script src="/assets/js/core/popper.min.js"></script>
        <script src="/assets/js/core/bootstrap.min.js"></script>
        {/* <script src="/assets/js/plugins/perfect-scrollbar.min.js"></script> */}
        <script src="/assets/js/plugins/smooth-scrollbar.min.js"></script>
        <script src="/assets/js/plugins/chartjs.min.js"></script>
        <script src="/assets/js/soft-ui-dashboard.js" type="text/javascript" />
      </Helmet>
    </>
  );
};

export default StudentDashboard;
