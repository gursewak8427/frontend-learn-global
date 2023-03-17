/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Logo from "../../website/images/logo.png";
import Gogl from "../../website/images/gogl.png";
import Fbk from "../../website/images/fbk.png";
import Mail from "../../website/images/mail.png";
import Key from "../../website/images/key.png";
import Eye from "../../website/images/eye.png";
import { Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import axios from "axios";
import { Navigate, redirect } from "react-router-dom";
import { authenticate } from "../../../helper/auth";
import AuthScreen from "../Screens/Authentication/AuthScreen";
import Dashboard from "../Screens/Dashboard/Dashboard";
import { setCookie, getCookie } from "../../../helper/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GrClose } from "react-icons/gr";
export default function Login2(props) {
  const [ModalCode, setModalCode] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
    submitProcessing: false,
    isShowPassword: false,
    isCodeSend: false,
    code: "",
    tokenPreserve: "",
    isSave: false,
  });

  const LoginNow = async (e) => {
    e.preventDefault();

    const { email, password } = state;
    const data = { email, password, tokenPreserve: getCookie("admin-2fa") };
    const config = { "content-type": "application/json" };
    console.log({
      method: "POST",
      headers: config,
      data: data,
      url: process.env.REACT_APP_NODE_URL + "/admin/login",
    });

    setState({
      ...state,
      submitProcessing: true,
    });

    axios
      .post(process.env.REACT_APP_NODE_URL + "/admin/login", data)
      .then((res) => {
        console.log(res);

        if (res.data.status == "0") {
          toast(res.data.message);
          setState({
            ...state,
            submitProcessing: false,
          });
          return;
        }

        let mode = res.data.details.mode;
        if (mode == "LOGIN") {
          authenticate(res, "admin", () => {
            console.log("Login Successfully without 2FA");
            window.location.href =
              props.role == "ADMIN" ? "/d/admin/" : "/d/admin/";
          });
        } else if (mode == "2FA") {
          // code send to email
          // Show code input at frontend
          toast("Verification Code Send Successfully");
          setModalCode(!ModalCode);
          setState({
            ...state,
            isCodeSend: true,
            submitProcessing: false,
            tokenPreserve: res.data.details.token,
          });
        } else {
          console.log("Login mode not received from server");
        }

        // authenticate(res, "admin", () => {
        //     // toast(res.data.message)
        //     console.log("Token added as admin_token")
        //     window.location.href = "/d/admin/"
        // })
        // authenticate with token
        // redirect
      })
      .catch((err) => {
        console.log(err.response.data);
        toast(err.response.data.message);
        setState({
          ...state,
          submitProcessing: false,
        });
      });
  };
  const VerifyCode = async (e) => {
    if(e){
      e.preventDefault();
    }

    const { email } = state;
    const code = parseInt(otp.join(""));
    const data = { email, code };
    if (code === "") {
      toast("Verification code is required");
      return;
    }
    const config = { "content-type": "application/json" };
    setState({
      ...state,
      submitProcessing: true,
    });
    axios
      .post(process.env.REACT_APP_NODE_URL + "/admin/verifycode", data)
      .then((res) => {
        console.log(res.data);

        // Show code input at frontend

        if (res.data.status == "0") {
          toast(res.data.message);
          setState({
            ...state,
            submitProcessing: false,
          });
          return;
        }

        authenticate(res, "admin", () => {
          // toast(res.data.message)
          console.log({ state });
          if (state.isSave) {
            setCookie("admin-2fa", state.tokenPreserve);
          }

          console.log("Token added as admin_token");
          window.location.href =
            props.role == "ADMIN" ? "/d/admin/" : "/d/admin/";
        });
        // authenticate with token
        // redirect
      })
      .catch((err) => {
        console.log(err.response.data);
        setState({
          ...state,
          submitProcessing: false,
        });
        toast(err.response.data.message);
      });
  };
  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // password eye
  const [typeConfirm, setTypeConfirm] = useState("password");
  const [iconConfirm, setIconConfirm] = useState(eye);
  const handleToggleConfirm = () => {
    if (typeConfirm === "password") {
      setIconConfirm(eyeOff);
      setTypeConfirm("text");
    } else {
      setIconConfirm(eye);
      setTypeConfirm("password");
    }
  };
  const [otp, setOtp] = useState(new Array(5).fill(""));

  const handleChange = (e, index) => {
    if (isNaN(e.value)) return false;

    let oldotp = otp;
    oldotp[index] = e.value
    console.log({ val: e.value, index })
    setOtp(oldotp);

    //Focus next input
    if (e.nextSibling && e.value != "") {
      e.nextSibling.focus();
    }
    if(e.value === ""){
      e.previousSibling.focus();
    }

    if (index + 1 == otp.length && e.value != "") {
      VerifyCode()
    }
  };
  return (
    <>
      <AuthScreen>
        <>
          <div className="new-main">
            <div className="lg:flex items-center">
              <div className="lg:w-1/2 flex items-center justify-center new-left  py-10 lg:py-0 px-4 lg:px-0">
                <img className="w-40 lg:w-96" src={Logo} alt="" />
              </div>
              <div className="lg:w-1/2  new-right flex items-center">
                <div className="rt-inner w-full">
                  <div className="inner-form-data rounded-lg border border-2 bg-white p-10">
                    <form key={"1234"} onSubmit={LoginNow}>
                      <h2>
                        Welcome to
                        <br />
                        <b>Learn Global</b>
                      </h2>
                      <div className="part-cont relative uppercase text-center my-6">
                        <p>
                          <span className="relative bg-white py-2 px-10">Login</span>
                        </p>
                      </div>
                      <div className="input-content py-2 px-4 rounded-lg">
                        <div className="flex items-center gap-4 w-full">
                          <div>
                            <img src={Mail} alt="" />
                          </div>
                          <div className="w-full">
                            <label className="custom-field one w-full">
                              <input
                                className="w-full"
                                type="text"
                                name="email"
                                value={state.email}
                                onChange={handleInput}
                                placeholder=" "
                              />
                              <span className="placeholder">Email</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="input-content py-2 px-4 mt-4 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div>
                            <img src={Key} alt="" />
                          </div>
                          <div className="w-full">
                            <label className="custom-field one w-full">
                              <input
                                name="password"
                                value={state.password}
                                onChange={handleInput}
                                className="w-full"
                                type={typeConfirm}
                                placeholder=" "
                              />
                              <span className="placeholder">Password</span>
                            </label>
                            <div className="field_eye_view">
                              <div
                                className="icon icon-eye"
                                onClick={handleToggleConfirm}
                              >
                                <Icon icon={iconConfirm} size={20} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="py-2  mt-4 rounded-lg">
                        <div className="flex  gap-2">
                          {/* <div>
                            <input type="checkbox" />
                          </div> */}
                          {/* <div className="">
                            <label>Remember me</label>
                          </div> */}
                          <div className="ml-auto">
                            <Link to="#" className="text-primary forgot-link">
                              Forgot Password?
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3 text-right sm:px-6">
                        <button
                          type="submit"
                          // onClick={state.submitProcessing ? null : LoginNow}
                          className="log-btn w-full py-4 text-white mt-4 rounded-lg"
                        >
                          Login
                        </button>
                      </div>
                      {ModalCode ? (
                        <div className="modal_cover">
                          <div className="modal_inner">
                            <div className="header_modal login-part-modal">
                              {/* <GrClose onClick={() => setModalCode(false)} /> */}
                              <h4 className="my-2 text-center font-bold text-xl mb-10">
                                Please enter the One Time Password
                                <br /> for verify your account
                              </h4>
                              <div className="form-login">
                                <form key={"123"} onSubmit={VerifyCode}>
                                  <div className="flex items-center justify-center gap-2 my-2">
                                    {otp.map((_, index) => {
                                      return (
                                        <input
                                          className="p-2 border"
                                          type="text"
                                          name="code"
                                          maxLength="1"
                                          key={index}
                                          onChange={e => handleChange(e.target, index)}
                                          onFocus={e => e.target.select()}
                                        />
                                      );
                                    })}
                                  </div>
                                  {/* <div className="flex items-center justify-center">
                                    <span
                                      className="text-[#475569] hover:text-black hover:underline cursor-pointer"
                                      onClick={LoginNow}
                                    >
                                      Resend
                                    </span>
                                  </div> */}
                                  {/* <div className="bg-gray-50 px-4 py-3 sm:px-6">
                                    <input
                                      type="checkbox"
                                      name="isSave"
                                      onChange={() => {
                                        setState({
                                          ...state,
                                          isSave: !state.isSave,
                                        });
                                      }}
                                      id="isSave"
                                    />
                                    <label htmlFor="isSave" className="p-2">
                                      Save for this device
                                    </label>
                                  </div> */}
                                  <div
                                    className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                    <button
                                      type="submit"
                                      onClick={state.submitProcessing ? null : VerifyCode}
                                    >
                                      {
                                        state.submitProcessing ? "Verifing..." : "Verify"
                                      }
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {/* <p className="mt-10 text-center">
                        Don’t have an account ?{" "}
                        <Link to="#" className="forgot-link">
                          Register
                        </Link>
                      </p> */}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </AuthScreen>
    </>
  );
}
