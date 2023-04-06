import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, redirect, useNavigate, useSearchParams } from "react-router-dom";
import { authenticate, getToken } from "../../../helper/auth";
import StudentDashboard from "../Screens/Dashboard/StudentDashboard";
import ButtonPrimary from "../../../common/Buttons/ButtonPrimary"

// firebase
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "../../../firebase";
import { toast } from "react-toastify";
const provider = new GoogleAuthProvider();

const StudentDocuments = (props) => {
    const navigate = useNavigate();
    // fileId
    const [searchParams, setSearchParams] = useSearchParams();
    const [addDocLoading, setAddDocLoading] = useState(false)

    const [state, setState] = useState({
        isWait: true,
        documentsList: [],
        document: "",
        title: "",
        baseUrl: "",
        popup: false,
        student: null,
        activeDocIndex: -1,
        fileId: searchParams.get("fileId"),
        enroll_status: '',
        submitDocsLoading: false,
        documentStatus: false,
    });

    useEffect(() => { // get docs list
        setState({
            ...state,
            fileId: searchParams.get("fileId")
        })
        const config = {
            headers: {
                Authorization: `Bearer ${getToken("student")
                    }`
            }
        };
        axios.post(process.env.REACT_APP_NODE_URL + "/student/getdocuments", { fileId: searchParams.get("fileId") }, config).then((res) => {
            console.log(res);
            setState({
                ...state,
                documentsList: res.data.details.documents,
                baseUrl: res.data.details.baseUrl,
                documentStatus: res.data.details.documentStatus,
                isWait: false,
            });
        }).catch((err) => {
            console.log(err);
        });
    }, [window.location.href]);

    // make array of months with small notiaions like Jan, Feb, etc
    const monthsArr = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    // add document to database with axios and form data, get doc detail from state.documents array
    const addDocument = async (e) => {
        if (state.enroll_status == "FEES_PENDING") {
            toast.error("Please pay fees before submit documents")
            return;
        }
        if (state.document == "") {
            toast.error("Please select a file")
            return;
        }
        setAddDocLoading(true)

        e.preventDefault();
        const formData = new FormData();
        formData.append("document", state.document);
        formData.append("title", state.title);

        const config = {
            headers: {
                Authorization: `Bearer ${getToken("student")
                    }`
            }
        };
        axios.post(process.env.REACT_APP_NODE_URL + "/student/uploaddocument", formData, config).then((res) => {
            console.log(res);
            setAddDocLoading(false)
            let oldDocs = state.documentsList
            oldDocs[state.activeDocIndex] = res.data.details.document
            setState({
                ...state,
                documentsList: oldDocs,
                popup: false,
                activeDocIndex: -1,
                document: "",
                title: ""
            })
            document.getElementById("document-file").value = ""
        }).catch((err) => {
            setAddDocLoading(false)
            document.getElementById("document-file").value = ""
            console.log(err);
        });
    };

    const handleFile = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.files[0]
        });
    };
    const handleInput = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const submitNow = () => {
        console.log(state);
    };

    const submitAllDocs = () => {
        if (state.enroll_status == "FEES_PENDING") {
            toast.error("Please pay fees before submit documents")
            return;
        }
        if (state.enroll_status == "UNDER_VERIFICATION" && state.student.status != "DOC_REJECTED") {
            toast.error("Documents are already under verification")
            return;
        }
        let pendingDocs = state.documentsList.filter(doc => doc.document_isRequired == true && doc.document_status == "PENDING" || doc.document_status == "UN_APPROVED")
        console.log({ pendingDocs })
        if (pendingDocs.length != 0) {
            toast.error("All Documents are required")
            return;
        }
        // get all docs verification

        const config = {
            headers: {
                Authorization: `Bearer ${getToken("student")
                    }`
            }
        };

        if (!window.confirm("Are you sure to submit all documents")) {
            return;
        }

        setState({
            ...state,
            submitDocsLoading: true,
        })

        axios.post(process.env.REACT_APP_NODE_URL + "/student/submitAllDocs", { fileId: state.fileId }, config).then((res) => {
            if (res.data.status == "1") {
                toast(res.data.message);
            } else {
                toast.error(res.data.message);
            }

            setState({
                ...state,
                submitDocsLoading: false,
            })

        }).catch((err) => {
            setState({
                ...state,
                submitDocsLoading: false,
            })
            console.log(err);
        });
    };

    return (
        <>
            <> {
                state.isWait ? (
                    <center className="w-full mt-20">
                        <img width={80}
                            src="https://i.gifer.com/ZZ5H.gif"
                            alt="" />
                    </center>
                ) : (
                    <>
                        <div className={
                            `overlay ${state.popup == true ? "active" : ""
                            }`
                        }
                            onClick={
                                () => setState({
                                    ...state,
                                    popup: false,
                                    activeDocIndex: -1
                                })
                            }></div>
                        {
                            state.enroll_status == "FEES_PENDING" &&
                            <div className="text-[white] m-[20px] bg-[#e5a11f] rounded p-2 text-xl font-bold capitalize">Your Documents are submitted, Please pay Application fees for further Processing!</div>
                        }
                        <div className={
                            `pendingDocAlert popup  ${state.popup == true ? "active" : ""
                            }`
                        }>
                            <div class="w-full">
                                <h1 class="text-3xl font-bold mb-5">Upload Student Document</h1>
                                <div class="mb-5">
                                    <label for="document-type" class="block font-medium mb-2">
                                        Document Name:
                                    </label>
                                    <input className="border px-4 py-2 w-full" type="text" name="title" placeholder="Document Name"
                                        value={
                                            state.title
                                        }
                                        disabled />
                                </div>
                                <div class="mb-5">
                                    <label for="document-file" class="block font-medium mb-2">
                                        Document File:
                                    </label>
                                    <input type="file" id="document-file" name="document" className="border px-4 py-2 w-full"
                                        onChange={handleFile}
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <ButtonPrimary onclick={addDocument}
                                        type="submit"
                                        loading={addDocLoading}
                                        title="Upload" />

                                </div>
                            </div>
                        </div>
                        <div className="flex align-end w-full justify-end p-[10px]">
                            {
                                state.documentsList.length != 0 && state.fileId &&
                                state.documentStatus &&
                                <ButtonPrimary
                                    title="Submit Documents"
                                    loading={state.submitDocsLoading}
                                    onclick={submitAllDocs}
                                />
                            }
                        </div>
                        <div id="uploadStudentDocuments" className="flex">
                            <div class="w-full p-4 dashbord-table">
                                {/* create table with document name, view button and status */}

                                <table className="w-full border">
                                    <thead>
                                        <tr>
                                            <th className="uppercase font-bold border-b border-gray-200 px-4 py-2 text-left">
                                                Document Name
                                            </th>
                                            <th className="uppercase font-bold border-b border-gray-200 px-4 py-2 text-left">
                                                Status
                                            </th>
                                            <th className="uppercase font-bold border-b border-gray-200 px-4 py-2 text-left">
                                                View
                                            </th>
                                            <th className="uppercase font-bold border-b border-gray-200 px-4 py-2 text-left">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody> {
                                        state.documentsList.map((document, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="border-b border-gray-200 px-4 py-2 font-bold">
                                                        {document.document_title} ({document.document_isRequired ? "Required" : "Optionally"})
                                                    </td>
                                                    <td className="border-b border-gray-200 px-4 py-2">
                                                        {
                                                            document.document_status == "UNDER_VERIFICATION" ? <span className="font-bold text-[blue]">{document.document_status}</span> :
                                                                document.document_status == "PENDING" ? <span className="font-bold text-[orange]">{document.document_status}</span> :
                                                                    document.document_status == "UN_APPROVED" ? <span className="font-bold text-[red]">{document.document_status}</span> :
                                                                        document.document_status == "APPROVED" ? <span className="font-bold text-[green]">{document.document_status}</span> :
                                                                            <span>{document.document_status}</span>
                                                        } </td>
                                                    <td className="border-b border-gray-200 px-4 py-2">
                                                        {
                                                            document.document_status == "PENDING" ? "--" : <Link target={"_blank"}
                                                                to={
                                                                    `${state.baseUrl
                                                                    }${document.document_url
                                                                    }`
                                                                }
                                                                className="text-blue-500 hover:text-blue-700">
                                                                <svg width={"15px"}
                                                                    className="mt-[3px]"
                                                                    fill="brown"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" /></svg>
                                                            </Link>
                                                        } </td>
                                                    <td className="border-b border-gray-200 px-4 py-2">
                                                        {
                                                            document.document_status == "APPROVED" ? <>--</> : <ButtonPrimary loading={false}
                                                                title={
                                                                    document.document_status == "PENDING" ? "Upload" : document.document_status == "UN_APPROVED" || document.document_status == "UNDER_VERIFICATION" ? "Change" : "Uploaded"
                                                                }
                                                                onclick={
                                                                    () => {

                                                                        if (state.enroll_status == "FEES_PENDING") {
                                                                            toast.error("Please pay the fees before upload the documents")
                                                                            return
                                                                        }
                                                                        setState({
                                                                            ...state,
                                                                            title: document.document_title,
                                                                            popup: true,
                                                                            activeDocIndex: index
                                                                        });
                                                                    }
                                                                } />
                                                        } </td>
                                                </tr>
                                            );
                                        })
                                    } </tbody>
                                </table>

                                {
                                    state.documentsList.length == 0 &&
                                    <center><div className="text-[red] p-[30px]">No Documents</div></center>
                                }
                            </div>
                        </div>
                    </>
                )
            } </>
        </>
    );
};

export default StudentDocuments;
