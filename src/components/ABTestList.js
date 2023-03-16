import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";

import swal from "sweetalert";
import moment from "moment";
import axios from "axios";
export default function ABTestList({ AB, getAB, website_domain }) {
  async function deleteAB(ab_test_id) {
    let accessToken = localStorage.getItem("accessToken");

    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_BASE}/abtests/deleteTest`,

      { ab_test_id: parseInt(ab_test_id) },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response) {
      if (response.data.status === true) {
        getAB();
        swal("Deleted ", response.data.message, "success").then((response) => {
          getAB();
        });
      }
      if (response.data.status === false) {
        swal("Something went wrong ", response.data.message, "error");
      }
    } else {
    }
  }

  let { website_id } = useParams();
  const [loader, setloader] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    if (AB.status === true) {
      setloader(false);
    }
  }, [AB]);

  return (
    <div className="container mx-auto my-8 ">
      <div className="w-full lg:w-3/4 mx-auto">
        {" "}
        <div className="w-full flex justify-between ">
          <span className="text-2xl block my-1 ">Your AB tests</span>
          <button
            onClick={() => {
              navigate(`/website/${website_id}/ab/add`, {
                state: { website_domain: website_domain },
              });
            }}
            className="text-white   bg-gray-700 hover:bg-gray-900 rounded-1 py-1 px-2 my-2"
          >
            Create new AB test
          </button>
        </div>
        {loader && <Loader message="Getting A/B tests ... please wait " />}
        {AB.status === true && AB.ab_tests.length > 0 ? (
          <table className="w-full my-4 border-black text-left ">
            <thead className=" capitalize  bg-gray-800 text-white ">
              <tr className="  text-sm ">
                <th scope="col" className="px-1 md:px-6 py-3">
                  sno
                </th>
                <th scope="col" className="px-1 md:px-6 py-3">
                  Variant 1 Title
                </th>
                <th scope="col" className="px-1 md:px-6 py-3">
                  Variant 2 Title
                </th>

                <th scope="col" className="px-1 md:px-6 py-3">
                  Schedule date-time
                </th>

                <th scope="col" className="px-1 md:px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {AB.ab_tests.map((ab, index) => {
                let dt = new Date(ab.schedule_datetime);

                function subtractMinutes(date, minutes) {
                  date.setMinutes(date.getMinutes() - minutes);

                  return date;
                }

                const newDate = subtractMinutes(dt, 330);

                return (
                  <tr
                    className={`text-left  text-sm cursor-pointer ${
                      index % 2 == 0
                        ? `bg-white`
                        : `bg-gray-50 hover:bg-gray-100`
                    }`}
                    key={index}
                  >
                    <td className=" px-1 md:px-6 py-2  ">{index + 1}</td>
                    {/* <td className=" px-6 py-2  ">{notification.id}</td> */}
                    <td className="px-1 lg: px-6 py-2  ">
                      {ab.ab_notifications[0].title}
                    </td>
                    <td className="px-1 lg: px-6 py-2  ">
                      {ab.ab_notifications[1].title}
                    </td>
                    <td className=" px-1 md:px-6 py-2  ">
                      <span className="block  my-1 ">
                        {" "}
                        {moment(newDate).format("DD/MM/YYYY")}
                      </span>{" "}
                      <span className="block  my-1 font-semibold lg:font-normal ">
                        {" "}
                        {moment(newDate).format("hh:mm:ss")}
                      </span>{" "}
                    </td>

                    <td className=" px-1 md:px-6 py-2   ">
                      <button
                        onClick={() => {
                          navigate(`/website/${website_id}/ab/${ab.id}/view`);
                        }}
                        className="bg-green-400 hover:bg-green-500 text-sm my-1 lg:my-0  block lg:inline w-full lg:w-fit text-white py-1 px-2 mx-1  uppercase rounded-1 text-lg"
                      >
                        analytics
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
                              deleteAB(ab.id);
                            }
                          });
                        }}
                        className="bg-red-400 hover:bg-red-500 text-sm my-1 lg:my-0  block lg:inline w-full lg:w-fit text-white py-1 px-2 mx-1  uppercase rounded-1 text-lg"
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
          <span className="  text-gray-500 my-8 block text-xl ">
            No AB Tests Found
          </span>
        )}
      </div>
    </div>
  );
}
