import React, { useEffect, useState } from "react";
import Viewinfo from "../Components/Viewinfo";
// import Viewcontent from "../Components/Viewcontent";
import WebsiteHome from "../Screens/WebsiteHome";
import axios from "axios";
import Viewcontent from "../Components/viewcontent";
import { useParams } from "react-router-dom";
import Admitted from "../Components/Admitted";
import Fees from "../Components/Fees";

export default function Wviewdetails() {
  // useEffect(() => {
  //   document.getElementById("header_menu").classList.remove("header-part");
  //   document.getElementById("header_menu").classList.add("static-header");
  // }, []);

  const { id } = useParams();

  const [data, setData] = useState();
  const [wait, setWait] = useState(true);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_NODE_URL + `/student/specificSchool/${id}`)
      .then((response) => {
        setData(response.data.details);
        setWait(false);
      });
  }, [id]);

  if (wait) {
    return (
      <>
        <div className="pt-[150px]">
          <center className="w-full my-10">
            <img width={80} src="https://i.gifer.com/ZZ5H.gif" alt="" />
          </center>
        </div>
      </>
    );
  }

  return (
    <div>
      <div>
        <div id="view-details">
          <Viewinfo data={data} />
          {/* small v */}
          <Viewcontent data={data} /> 
          <Admitted />
          <Fees />
        </div>
      </div>
    </div>
  );
}
