import React from "react";
import { useState, useEffect } from "react";
import { goTo, verifyLogin } from "../helper.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Modal from "./Modal.js";
import Loader from "./Loader.js";
import NavbarLogin from "./Navbar_Login";
import Switch from "react-switch";
export default function ABTestAnalyticsFigures({ ab_analytics }) {
  const [variant, setvariant] = useState(1);
  function handleChange_VARIANT() {
    if (variant === 1) {
      setvariant(2);
    } else {
      setvariant(1);
    }
  }

  let navigate = useNavigate();
  const [loader, setloader] = useState(true);
  const [loggedin, setloggedin] = useState(false);

  useEffect(() => {
    if (ab_analytics.hasOwnProperty("ab_notifications")) {
      setloader(false);
    }
  }, [ab_analytics]);
  useEffect(() => {
    verifyLogin().then((data) => {
      if (data) {
        setloggedin(true);
      } else {
        setloggedin(false);
        navigate("/login");
      }
    });
  }, []);

  return (
    <div className="container    ">
      {/* <span>analytics here</span> */}
      {loader ? (
        <Loader message="Getting analytiscs... please wait " />
      ) : ab_analytics.hasOwnProperty("ab_notifications") &&
        ab_analytics.ab_notifications.length > 0 ? (
        <div>
          <span className="block text-center h3  my-4 capitalize">AB test analytics</span>
          <div className=" grid grid-cols-2 gap-4  divide-x divide-gray-300 ">
            <div className=" py-5 px-3">
              <span className="h4 block text-center ">Variant A</span>
              <div className="border-2 my-3  w-full w-3/4 mx-auto py-5  ">
                <div className="w-3/4 mx-auto border-2 ">small bard</div>
                <div className="w-3/4 mx-auto my-3 ">
                  <div className="my-2">
                    <span className="font-semibold ">Schedule date</span>
                    <span className="mx-3">23 / 09 / 2023</span>
                  </div>
                  <div className="my-2">
                    <span className="font-semibold ">Redirect URL</span>
                    <span className="mx-3">
                      {" "}
                      {ab_analytics.ab_notifications[0].redirect_url}
                    </span>
                  </div>
                  <div className="my-2">
                    <span className="font-semibold ">Schedule time</span>
                    <span className="mx-3">23 / 09 / 2023</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2  w-3/4  mx-auto gap-4  ">
                <div className="border-2 border-gray-500 p-3 my-2 bg-gray-100 bg-gray-100">
                  <span className="block my-2 text-gray-400 h6">
                    Click Through Rate (CTR){" "}
                  </span>
                  <span className="block my-2 text-xl  ">
                    {" "}
                    {ab_analytics.ab_notifications[1].clickThroughRate}
                  </span>
                </div>
                <div className="border-2 border-gray-500 p-3 my-2 bg-gray-100">
                  <span className="block my-2 h6 text-gray-400">Targeted</span>
                  <span className="block my-2  text-3xl  ">
                    {" "}
                    {ab_analytics.ab_notifications[1].targeted}
                  </span>
                </div>
                <div className="border-2 border-gray-500 p-3 my-2 bg-gray-100">
                  <span className="block my-2 text-gray-400 h6">Clicks</span>
                  <span className="block my-2   text-3xl  ">
                    {" "}
                    {ab_analytics.ab_notifications[1].clicks}
                  </span>
                </div>
                <div className="border-2 border-gray-500 p-3 my-2 bg-gray-100">
                  <span className="block my-2 h6 text-gray-400">Failed</span>
                  <span className="block my-2   text-3xl  ">
                    {" "}
                    {ab_analytics.ab_notifications[1].failed}
                  </span>
                </div>

                <div className="border-2 border-gray-500 p-3 my-2 bg-gray-100">
                  <span className="block my-2 h6 text-gray-400">Delivered</span>
                  <span className="block my-2  text-3xl   ">
                    {" "}
                    {ab_analytics.ab_notifications[1].delivered}
                  </span>
                </div>
              </div>
            </div>
            <div className=" py-5 px-3">
              <span className="h4 block text-center ">Variant B</span>
              <div className="border-2 my-3 w-full w-3/4 mx-auto py-5  ">
                <div className="w-3/4 mx-auto border-2 ">small bard</div>
                <div className="w-3/4 mx-auto my-3 ">
                  <div className="my-2">
                    <span className="font-semibold ">Schedule date</span>
                    <span className="mx-3">23 / 09 / 2023</span>
                  </div>
                  <div className="my-2">
                    <span className="font-semibold ">Redirect URL</span>
                    <span className="mx-3">
                      {" "}
                      {ab_analytics.ab_notifications[1].redirect_url}
                    </span>
                  </div>
                  <div className="my-2">
                    <span className="font-semibold ">Schedule time</span>
                    <span className="mx-3">23 / 09 / 2023</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2  w-3/4  mx-auto gap-4  ">
                <div className="border-2 border-gray-500 p-3 my-2 bg-gray-100">
                  <span className="block my-2 h6 text-gray-400">
                    Click Through Rate (CTR){" "}
                  </span>
                  <span className="block my-2   text-3xl text-gray-400 ">
                    {" "}
                    {ab_analytics.ab_notifications[1].clickThroughRate}
                  </span>
                </div>
                <div className="border-2 border-gray-500 p-3 my-2 bg-gray-100">
                  <span className="block my-2 h6 text-gray-400">Targeted</span>
                  <span className="block my-2   text-3xl  ">
                    {" "}
                    {ab_analytics.ab_notifications[1].targeted}
                  </span>
                </div>
                <div className="border-2 border-gray-500 p-3 my-2 bg-gray-100">
                  <span className="block my-2 h6 text-gray-400">Clicks</span>
                  <span className="block my-2   text-3xl  ">
                    {" "}
                    {ab_analytics.ab_notifications[1].clicks}
                  </span>
                </div>
                <div className="border-2 border-gray-500 p-3 my-2 bg-gray-100">
                  <span className="block my-2 h6 text-gray-400">Failed</span>
                  <span className="block my-2  text-3xl   ">
                    {" "}
                    {ab_analytics.ab_notifications[1].failed}
                  </span>
                </div>

                <div className="border-2 border-gray-500 p-3 my-2 bg-gray-100">
                  <span className="block my-2 h6 text-gray-400">Delivered</span>
                  <span className="block my-2   text-3xl  ">
                    {" "}
                    {ab_analytics.ab_notifications[1].delivered}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // <div>
        //   <div className="  md:w-full   block shadow-sm my-3 p-3  ">
        //     <span className="block text-gray-500   ">Variant {variant}</span>{" "}
        //     <Switch
        //       onChange={handleChange_VARIANT}
        //       checked={variant === 2 ? true : false}
        //     />
        //   </div>
        //   <div className="">
        //     {" "}
        //     <div>
        //       <span className="block  text-gray-400 "> Image</span>
        //       <span className="block text-gray-600 text-2xl  ">
        //         {ab_analytics.image_type}
        //       </span>
        //     </div>
        //     <div className="grid grid-cols-2 my-5  ">
        //       <div className=" col-span-2 sm:col-span-1 my-3 sm:my-0">
        //         <span className="block  text-gray-400 "> Redirect URL</span>
        //         <a
        //           href={ab_analytics.ab_notifications[variant - 1].redirect_url}
        //           target="_blank"
        //           className="block text-blue-400 cursor-pointer  text-2xl  "
        //         >
        //           {ab_analytics.ab_notifications[variant - 1].redirect_url}
        //         </a>
        //       </div>
        //       <div className=" col-span-2 sm:col-span-1 my-3 sm:my-0">
        //         <span className="block  text-gray-400 "> Status</span>
        //         <span
        //           className={`block text-gray-600 text-2xl   ${
        //             ab_analytics.ab_notifications[variant - 1].status ===
        //               "Completed" && "text-green-500"
        //           } `}
        //         >
        //           {ab_analytics.ab_notifications[variant - 1].status}
        //         </span>
        //       </div>
        //     </div>
        //     <div className="grid grid-cols-2 my-5  ">
        //       <div className=" col-span-2 sm:col-span-1 my-3 sm:my-0">
        //         <span className="block  text-gray-400 "> Targeted</span>
        //         <span className="block text-gray-600 text-2xl  ">
        //           {ab_analytics.ab_notifications[variant - 1].targeted}
        //         </span>
        //       </div>
        //       <div className=" col-span-2 sm:col-span-1 my-3 sm:my-0">
        //         <span className="block  text-gray-400 "> Delivered</span>
        //         <span className="block text-gray-600 text-2xl  ">
        //           {ab_analytics.ab_notifications[variant - 1].delivered}
        //         </span>
        //       </div>
        //     </div>
        //     <div className="grid grid-cols-3 my-5 ">
        //       <div className=" col-span-3   sm:col-span-1 my-3 sm:my-0">
        //         <span className="block  text-gray-400 "> Failed</span>
        //         <span className="block text-gray-600 text-2xl  ">
        //           {ab_analytics.ab_notifications[variant - 1].failed}
        //         </span>
        //       </div>
        //       <div className=" col-span-3 sm:col-span-1 my-3 sm:my-0">
        //         <span className="block  text-gray-400 "> Clicks</span>
        //         <span className="block text-gray-600 text-2xl  ">
        //           {ab_analytics.ab_notifications[variant - 1].clicks}
        //         </span>
        //       </div>
        //       <div className=" col-span-3 sm:col-span-1 my-3 sm:my-0">
        //         <span className="block  text-gray-400 ">
        //           {" "}
        //           Click Through Rate
        //         </span>
        //         <span className="block text-gray-600 text-2xl  ">
        //           {ab_analytics.ab_notifications[variant - 1].clickThroughRate}
        //         </span>
        //       </div>
        //     </div>
        //   </div>
        // </div>
        "something"
      )}
    </div>
  );
}
