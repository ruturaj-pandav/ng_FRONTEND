import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import Loader from "./Loader";
import { useNavigate, useParams } from "react-router-dom";
export default function SegmentsList({
  getsegments,
  segments,

  countries_list,
}) {
  async function deletesegment(segment_id) {
    console.log("deleting");
    let accessToken = localStorage.getItem("accessToken");

    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_BASE}/segments/deleteSegment`,
      // `${process.env.BACKEND_URL}/websites/list`,
      { website_id, segment_id },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response) {
      console.log(response.data);
      if (response.data.status === true) {
        console.log("good status");
        swal("Deleted ", response.data.message, "success").then((response) => {
          getsegments();
        })
        
      }
      if (response.data.status === false) {
        swal("Something went wrong ", response.data.message, "error");
      }
    } else {
    
    }
  }
  const [loader, setloader] = useState(true);

  let { website_id } = useParams();
  let navigate = useNavigate();
  let maxcountryshowlength = 3;
  useEffect(() => {
    if (segments.status === true) {
      setloader(false);
    }
  }, [segments]);

  const [showall, setshowall] = useState(null);

  function returnIndex(cc) {
    let index = 0;
    if (countries_list.length !== 0) {
      for (let i = 0; i < countries_list.length; i++) {
        if (countries_list[i].country_code === cc) {
          index = i;
          break;
        }
      }
    }
    return index;
  }

  return (
    <div className="container mx-auto  my-8  ">
      <div className=" relative overflow-x-auto my-3  w-full  mx-auto ">
        <span className="text-2xl block my-3 ">Your segments</span>
        {loader ? (
          <Loader message="Getting segments ... please wait " />
        ) : countries_list.length > 0 && segments.segments.length > 0 ? (
          <table className="w-full my-4 border-black  ">
            <thead className="  capitalize  bg-gray-800 text-white  ">
              <tr className="  text-sm ">
                <th scope="col" className="px-6 py-3">
                  No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Segment name{" "}
                </th>
                <th scope="col" className="px-6 py-3">
                  Device type
                </th>
                <th scope="col" className="px-6 py-3">
                  Countries included
                </th>
                <th scope="col" className="px-6 py-3">
                  Countries excluded
                </th>

                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {segments.segments.map((segment, mainindex) => {
                let equal_to;
                let not_equal_to;
                let device = segment.segment_rules.deviceType;
                if (
                  segment &&
                  segment.hasOwnProperty("segment_rules") &&
                  segment.segment_rules.hasOwnProperty("countries") &&
                  segment.segment_rules.countries.hasOwnProperty("equal_to")
                ) {
                  equal_to = segment.segment_rules.countries.equal_to;
                }

                if (
                  segment &&
                  segment.hasOwnProperty("segment_rules") &&
                  segment.segment_rules.hasOwnProperty("countries") &&
                  segment.segment_rules.countries.hasOwnProperty("not_equal_to")
                ) {
                  not_equal_to = segment.segment_rules.countries.not_equal_to;
                }
                let countriesname = [];
                if (equal_to !== false && equal_to !== undefined) {
                  equal_to = equal_to.split(",");
                  equal_to.map((cc, index) => {
                    let countryindex = returnIndex(cc);

                    let countryname = countries_list[countryindex].full_name;

                    countriesname.push(countryname);
                  });
                }

                if (not_equal_to !== false && not_equal_to !== undefined) {
                  not_equal_to = not_equal_to.split(",");
                  not_equal_to.map((cc, index) => {
                    let countryindex = returnIndex(cc);
                    let countryname = countries_list[countryindex].full_name;

                    countriesname.push(countryname);
                  });
                }

                return (
                  <tr
                    className={`text-left  text-sm cursor-pointer ${
                      mainindex % 2 == 0
                        ? `bg-white`
                        : `bg-gray-50 hover:bg-gray-100`
                    }`}
                    key={mainindex}
                  >
                    <td className="px-6 py-2   ">{mainindex + 1}</td>
                    <td className="px-6 py-2   ">{segment.name}</td>
                    <td className="px-6 py-2   ">
                      {device !== undefined ? device : " - "}
                    </td>
                    <td className="px-6 py-2   ">
                      {equal_to === undefined && <span className="text-gray-400 text-sm">none selected</span>}
                      {equal_to !== undefined &&
                        countriesname.length <= maxcountryshowlength && (
                          <span>
                            {countriesname.map((country, index) => {
                              return (
                                <span key ={index} className="mx-1 border-2 my-1 font-semibold text-black   inline-block border-black   bg-gray-50 px-1 py-1 text-xs">
                                  {country}
                                </span>
                              );
                            })}
                          </span>
                        )}
                      {equal_to !== undefined &&
                        countriesname.length > maxcountryshowlength &&
                        (showall === null || showall !== mainindex) && (
                          <span>
                            {countriesname
                              .slice(0, maxcountryshowlength)
                              .map((country, index) => {
                                return (
                                  <span className="mx-1 rounded-1  inline-block my-1 bg-gray-800 text-white px-1 py-1 text-xs">
                                    {country}
                                  </span>
                                );
                              })}{" "}
                            {/* <span>....</span> */}
                            <br />
                            <span
                              onClick={() => {
                                setshowall(mainindex);
                              }}
                              className="hover:text-base mx-1 inline-block px-1 rounded-1  text-xs bg-yellow-300 text-gray-900 hover:text-gray-800 duration-400 mt-1 block "
                            >
                              show all{" "}
                            </span>
                          </span>
                        )}
                      {equal_to !== undefined &&
                        countriesname.length > maxcountryshowlength &&
                        showall === mainindex && (
                          <span>
                            {countriesname.map((country, index) => {
                              return (
                                <span className="mx-1 rounded-1 inline-block my-1 bg-gray-800 text-white px-1 py-1 text-xs">
                                  {country}
                                </span>
                              );
                            })}
                            {/* <span> .....</span> */}
                            <br />
                            <span
                              onClick={() => {
                                setshowall(null);
                              }}
                              className="hover:text-base mx-1 inline-block px-1 rounded-1 text-xs bg-yellow-300 text-gray-900 hover:text-gray-800 duration-400 mt-1 block "
                            >
                              hide
                            </span>
                          </span>
                        )}
                    </td>
                    <td className="px-6 py-2   ">
                    {not_equal_to === undefined && <span className="text-gray-400 text-sm">none selected</span>}

                      {not_equal_to !== undefined &&
                        countriesname.length < maxcountryshowlength && (
                          <span>
                            {countriesname.map((country, index) => {
                              return (
                                <span className="mx-1 border-2 font-semibold text-black  border-black   bg-gray-50 px-1 py-1 text-xs">
                                  {country}
                                </span>
                              );
                            })}
                          </span>
                        )}
                      {not_equal_to !== undefined &&
                        countriesname.length > maxcountryshowlength &&
                        (showall === null || showall !== mainindex) && (
                          <span>
                            {" "}
                            {countriesname
                              .slice(0, maxcountryshowlength)
                              .map((country, index) => {
                                return (
                                  <span className="mx-1 rounded-1 inline-block my-1 bg-gray-800 text-white px-1 py-1 text-xs">
                                    {country}
                                  </span>
                                );
                              })}{" "}
                            {/* <span>....</span> */} <br />
                            <span
                              onClick={() => {
                                setshowall(mainindex);
                              }}
                              className="hover:text-base mx-1 inline-block px-1 rounded-1  text-xs bg-yellow-300 text-gray-900 hover:text-gray-800 duration-400 mt-1 block "
                            >
                              show all{" "}
                            </span>
                          </span>
                        )}
                      {not_equal_to !== undefined &&
                        countriesname.length > maxcountryshowlength &&
                        showall === mainindex && (
                          <span>
                            {" "}
                            {countriesname.map((country, index) => {
                              return (
                                <span className="mx-1 rounded-1 inline-block my-1 bg-gray-800 text-white px-1 py-1 text-xs">
                                  {country}
                                </span>
                              );
                            })}
                            {/* <span> .....</span> */}
                            <span
                              onClick={() => {
                                setshowall(null);
                              }}
                              className="hover:text-base mx-1 inline-block px-1 rounded-1 text-xs bg-yellow-300 text-gray-900 hover:text-gray-800 duration-400 mt-1 block "
                            >
                              hide
                            </span>
                          </span>
                        )}
                    </td>

                    <td className="px-6 py-2 ">
                      <button
                        onClick={() => {
                          navigate(
                            `/website/${website_id}/segments/edit/${segment.id}`,
                            {
                              state: {
                                segment: segment,
                                countries_list: countries_list,
                              },
                            }
                          );
                        }}
                        className="bg-yellow-500 mx-1 block md:inline w-full my-0.5 hover:bg-yellow-600 text-white py-1 px-2 capitalize    rounded-1 text-sm"
                      >
                        edit
                      </button>
                      <button
                        onClick={() => {
                          //
                          swal({
                            title: "Are you sure?",
                            text: "You cant reverse this once done ",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                          }).then((willDelete) => {
                            if (willDelete) {
                              deletesegment(segment.id);

                              // navigate(`/website/${website_id}/notifications`)
                            }
                          });
                        }}
                        className="bg-red-500 mx-1 block md:inline w-full my-0.5 hover:bg-red-600 text-white py-1 capitalize px-2   rounded-1 text-sm"
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <span className="text-gray-500 my-8 block text-xl ">
            No segments Found
          </span>
        )}

        <button
          onClick={() => {
            navigate(`/website/${website_id}/segments/add`);
          }}
          className="text-white   bg-gray-700 hover:bg-gray-900 rounded-1 py-1 px-2 my-2"
        >
          Add new segment
        </button>
      </div>
    </div>
  );
}
