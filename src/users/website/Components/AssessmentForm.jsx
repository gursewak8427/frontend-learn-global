import React, { Component, useEffect, useState } from "react";
import { Accordion, Icon } from "semantic-ui-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AssessmentForm.css";
import { setLocalStorage } from "../../../helper/auth";

const AssessmentForm = ({ popup, closeForm }) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    activeIndex: 0,
  });

  const [formdata, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    destination_country: "",
    aggree_to_privacy_policy: false,
  });

  const handleFormData = (e) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const getErrors = () => {
    var isError = false;
    document.getElementById("firstName").style.borderColor = "grey";
    document.getElementById("lastName").style.borderColor = "grey";
    document.getElementById("email").style.borderColor = "grey";
    document.getElementById("phone").style.borderColor = "grey";
    document.getElementById("destination_country").style.borderColor = "grey";
    document.getElementById("aggree_to_privacy_policy").innerText = "";

    if (formdata.firstName == "") {
      isError = true;
      document.getElementById("firstName").style.borderWidth = "2px";
      document.getElementById("firstName").style.borderColor = "red";
    }
    if (formdata.lastName == "") {
      isError = true;
      document.getElementById("lastName").style.borderWidth = "2px";
      document.getElementById("lastName").style.borderColor = "red";
    }
    if (formdata.email == "") {
      isError = true;
      document.getElementById("email").style.borderWidth = "2px";
      document.getElementById("email").style.borderColor = "red";
    }
    if (formdata.phone == "") {
      isError = true;
      document.getElementById("phone").style.borderWidth = "2px";
      document.getElementById("phone").style.borderColor = "red";
    }
    if (formdata.destination_country == "") {
      isError = true;
      document.getElementById("destination_country").style.borderWidth = "2px";
      document.getElementById("destination_country").style.borderColor = "red";
    }
    if (formdata.aggree_to_privacy_policy == false) {
      isError = true;
      document.getElementById("aggree_to_privacy_policy").innerText =
        "*Please aggree to the Privacy Policy";
      document.getElementById("aggree_to_privacy_policy").style.color = "red";
    }
    return isError;
  };

  const submitForm = () => {
    if (getErrors()) return;

    axios
      .post(
        `${process.env.REACT_APP_NODE_URL}/student/fillassessmentform`,
        formdata
      )
      .then((response) => {
        alert(response.data.message);
        closeForm();
        // setLocalStorage("assessmentform", { visited: true })
      });
  };

  return (
    <>
      <div className={`${popup ? "popup" : ""} pop-form`}>
        <h4 className="bg-[#333333] text-white flex items-center justify-between p-[10px]">
          <span>
            <small>Visa Assessment Form</small>
          </span>
          <span onClick={closeForm} className="cursor-pointer">
            X
          </span>
        </h4>
        <p className="mb-0 mx-[10px]">
          Learn Global, Please fill the below visa enquiry form to help us
          assist you better.
        </p>
        <div className="flex">
          <input
            type="text"
            placeholder="First Name*"
            onChange={handleFormData}
            value={formdata.firstName}
            id="firstName"
            name="firstName"
            className="w-6/12"
          />
          <input
            type="text"
            placeholder="Last Name*"
            onChange={handleFormData}
            value={formdata.lastName}
            id="lastName"
            name="lastName"
            className="w-6/12"
          />
        </div>
        <input
          type="email"
          placeholder="Email*"
          onChange={handleFormData}
          value={formdata.email}
          id="email"
          name="email"
        />
        <input
          type="text"
          placeholder="Phone*"
          onChange={handleFormData}
          value={formdata.phone}
          id="phone"
          name="phone"
        />
        <p className="mb-0 mx-[10px]">Your preferred study destination</p>
        <select
          onChange={handleFormData}
          value={formdata.destination_country}
          id="destination_country"
          name="destination_country"
        >
          <option value="">--Select--</option>
          <option value="Australia">Australia</option>
          <option value="New Zealand">New Zealand</option>
          <option value="Canada">Canada</option>
          <option value="Usa">Usa</option>
        </select>
        <p className="mb-0 mx-[10px]">
          Learn Global is that institution that remove rough edges from the way
          of your success.
        </p>
        <p className="global-text p-0 normal">
          <input
            type="checkbox"
            onChange={() =>
              setFormData({
                ...formdata,
                aggree_to_privacy_policy: !formdata.aggree_to_privacy_policy,
              })
            }
          />{" "}
          I agree to Learn Global&nbsp;
          <a href="#">Terms</a>&nbsp;and<a href="#">&nbsp;Privacy Policy </a>
        </p>
        <p className="mx-[10px]" id="aggree_to_privacy_policy"></p>
        <button type="button" onClick={submitForm}>
          Register Now
        </button>
      </div>
    </>
  );
};

export default AssessmentForm;
