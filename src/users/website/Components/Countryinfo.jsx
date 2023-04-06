import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nz from "../images/new_zln.png";

export default function Countryinfo({ id }) {
  const [data, setData] = useState();
  const [wait, setWait] = useState(true);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_NODE_URL + `/student/specifiCountry/${id}`).then(response => {
        setData(response.data.details);
        setWait(false)
      })

  }, [id])



  if (wait) {
    return <>
      <div className="pt-[150px]">
        <center className="w-full my-10">
          <img
            width={80}
            src="https://i.gifer.com/ZZ5H.gif"
            alt=""
          />
        </center>
      </div>
    </>
  }



  let baseUrl = "http://learn-global-backend.onrender.com/uploads/agent/";
  return (
    <>
      <div className="country-banr py-32">
        <div class="container mx-auto">
          <h1 className="text-center text-white text-6xl">{data.countryDetails.countryName}</h1>
        </div>
      </div>
      <div>
        <div className="container mx-auto px-4 lg:px-0 py-10">
          <div className="lg:flex gap-4">
            <div class="lg:w-1/3">
              <div className="upr-img p-3">
                <img src={Nz} />
                <h5 className="lg:text-2xl py-2 px-2">People Also Viewed</h5>
                <div className="detail-part p-3 shadow-xl">
                  {
                    data.schoolsList.map((el) => {
                      return <div className="flex items-center inner-detail-part pt-3 mb-4">
                        <div>
                          <img alt="image" src={baseUrl + el.schoolLogo} />
                        </div>
                        <div>
                          <h6 className="text-xl">{el.schoolName}</h6>
                          <Link className="flex items-center" to={"/specificSchool/" + el._id}>

                            View Detail
                          </Link>
                        </div>
                      </div>
                    })
                  }


                </div>
              </div>
            </div>
            <div class="lg:w-2/3">
              <h5 className="text-3xl mt-3 mb-2">Information of {data.countryDetails.countryName}</h5>
              <p className="mb-4 lg:text-lg">
                {data.countryDetails.countryDescription}
              </p>

              <div className="country-video">
                <iframe
                  width="890"
                  height="390"
                  src={data.countryDetails.countryVideo}
                  title="What&#39;s it like to be an international student studying in NZ?"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>);
}
