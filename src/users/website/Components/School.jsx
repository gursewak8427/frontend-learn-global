import axios from "axios";
import React, { useEffect, useState } from "react";
import Au from "../../website/images/au.png";
import Sl_1 from "../../website/images/sl_1.jpg";
import { Link } from "react-router-dom";

export default function School() {
  const [val, setVal] = useState('-1');
  const [data, setData] = useState();
  const [wait, setWait] = useState(true);
  const [query, setQuery] = useState('-1');
  // const {id} = useParams();

  useEffect(() => {
    setWait(true)
    axios
      .get(process.env.REACT_APP_NODE_URL + `/student/discoverSchool/${query}`).then(response => {
        setData(response.data.details);
        setWait(false)
        console.log(data)
      })

  }, [query])



  const handleSearch = () => {
    if (val == "") {
      setQuery('-1')
    } else {
      setQuery(val);
    }
  }


  return (
    <div className="lg:w-100% coverleft">
      <div className="searchbar-top">
        <h3 class="mainheading text-left text-xl font-light border border-current rounded p-2">
          Search Your Favorite School, University with Country
        </h3>
        <div className="flex items-center mt-5 dc-search">
          <input
            type="text"
            className="p-2"
            value={val}
            placeholder="Find School, University or Country"
            onChange={(e) => setVal(e.target.value)}

          />
          <button onClick={handleSearch} className="bg-black text-white p-2">Search</button>
        </div>
      </div>
      <div>
        <div className="innerschool mt-5">
          <div className="lg:w-100% ">
            {
              wait && <div className="w-full pt-[50px]">
                <center className="w-full my-10">
                  <img
                    width={80}
                    src="https://i.gifer.com/ZZ5H.gif"
                    alt=""
                  />
                </center>
              </div>
            }
            {
              !wait && data?.schoolsList.length == 0 && <center className="text-[red]">No Data</center>
            }
            <div class="grid grid-cols-4 gap-4">
              {
                !wait && data.schoolsList.map((el) => {
                  console.log({el})
                  return (
                    <div className="pt-main bg-white p-3 border relative">
                      <div className="front-cont">
                        <img
                          className="mx-auto w-24 rounded-full border border border-black"
                          src={Au}
                        />
                        <p className="text-center mt-2">{el.school_name}</p>
                        <div className="flex items-center gap-2 justify-center mt-5">
                          <img className="count-flag" src={el.baseUrl + el.school_meta_details.countryLogo} />
                          {el.country}
                        </div>
                      </div>
                      <div className="back-cont">
                        <div className="flex mb-1">
                          <p className="text-white">Founded</p>
                          <p className="ml-auto text-white">{el.founded}</p>
                        </div>

                        <div className="flex mb-1">
                          <p className="text-white">Total Student</p>
                          <p className="ml-auto text-white">{el.total_student}</p>
                        </div>

                        <div className="flex mb-1">
                          <p className="text-white">Type</p>
                          <p className="ml-auto text-white">{el.type}</p>
                        </div>
                        <button className="elig-btn p-2 rounded-full mx-auto" onClick={()=>window.location.href="/eligible"}>
                          Check Eligibility
                        </button>
                        <Link
                          to={"/specificSchool/"+el._id}
                          className="text-center my-2 text-white w-full mx-auto block pb-2"
                        >
                          View School
                        </Link>
                      </div>
                    </div>
                  )
                  return (<div>
                    <div className="front-cont">
                      <img
                        className="mx-auto w-24 rounded-full border border border-black"
                        src={Au}
                      />
                      <p className="text-center mt-2">{el.school_name}</p>
                      <div className="flex items-center gap-2 justify-center mt-5">
                        <img className="count-flag" src={Sl_1} />
                        {el.country}
                      </div>

                    </div>
                  </div>)

                })
              }

            </div>


          </div>

        </div>
      </div>
    </div>
  );
}
