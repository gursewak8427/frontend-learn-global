import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "../../../helper/auth";
import Eligibleform from "../Components/Eligibleform";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import AssessmentForm from "../Components/AssessmentForm";
import { useState } from "react";

<<<<<<< HEAD
export default function WebsiteHome({ children, page }) {
    const [state, setState] = useState({
        isShowForm: false,
    })

    useEffect(() => {
        if(page != "home"){
            document.getElementById("header_menu").classList.remove('header-part')
        }
    },
    [window.location.href])

    useEffect(() => {
        if(page != "home") return
=======
export default function WebsiteHome({ children }) {
    const [state, setState] = useState({
        isShowForm: false,
    })
    useEffect(() => {
>>>>>>> 1364d015a9aa03628ea1ad4108e88de5fd5c486d
        // get from localstorage
        var form = getLocalStorage("assessmentform")
        if (!form) {
            setTimeout(() => {
                setState({
                    ...state,
                    isShowForm: true,
                })
            }, 2000);
            // setLocalStorage("assessmentform", { visited: true })
        }
        console.log({ form })
    }, [])

    const closeForm = () => {
        setState({
            ...state,
            isShowForm: false,
        })
    }

    return (<>
        <div className="app">
            {state.isShowForm && <AssessmentForm popup={true} closeForm={closeForm}/>}
<<<<<<< HEAD
            <Header page={page}/>
=======
            <Header />
>>>>>>> 1364d015a9aa03628ea1ad4108e88de5fd5c486d
            {children}
            <Footer />
        </div >
    </>
    );
}