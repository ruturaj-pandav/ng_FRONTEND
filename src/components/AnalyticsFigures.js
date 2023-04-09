import React from "react";
import { useState, useEffect } from "react";
import { goTo, verifyLogin } from "../helper.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Modal from "./Modal.js";
import NavbarLogin from "./Navbar_Login";

export default function AnalyticsFigures({ analytics }) {
  let navigate = useNavigate();
  const [loggedin, setloggedin] = useState(false);

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
    <div className="container mx-auto w-5/6 lg:w-3/4 py-3   ">
      <div>
        {console.log("analytics", analytics)}
        <span className="block h4  text-center my-3">Notification details</span>
        <div className="border w-5/6  mx-auto grid grid-cols-3 gap-3 p-3">
          <div className="col-span-1 border-2 border-gray-800">
            <div>imge here</div>
            <div className="p-2 border-t border-gray-600">
              <span className="block text-lg font-semibold capitalize  ">{analytics.title}</span>
              <span className="block font-semibold capitalize ">{analytics.body_text}</span>
            </div>
          </div>
          <div className="col-span-2  px-3">
            <div className="my-3">
              <span className="my-1 font-semibold ">Schedule date</span>
              <span className="my-1 mx-3">date</span>
            </div>
            <div className="my-3">
              <span className="my-1 font-semibold ">Redirect URL</span>
              <span className="my-1 mx-3">{analytics.redirect_url}</span>
            </div>
            <div className="my-3">
              <span className="my-1 font-semibold ">Schedule date</span>
              <span className="my-1 mx-3">date</span>
            </div>
          </div>
        </div>
        <span className="block h4  text-center my-3 capitalize " >Notifcation analysis</span>
        <div className="grid grid-cols-3    gap-4 w-5/6 mx-auto ">
          <div className="border-2 border-gray-500 p-3 my-2 bg-gray-100">
            <span className="block my-2 text-gray-400 h6">
              Click Through Rate
            </span>
            <span className="block my-2   text-3xl  ">
              {" "}
              {analytics.clickThroughRate}
            </span>
          </div>
          <div className="border-2 border-gray-500 p-3 my-2 bg-gray-100">
            <span className="block my-2 text-gray-400 h6">Targeted</span>
            <span className="block my-2   text-3xl  ">
              {" "}
              {analytics.targeted}
            </span>
          </div>
          <div className="border-2 border-gray-500 p-3 my-2 bg-gray-100">
            <span className="block my-2 text-gray-400 h6">Delivered</span>
            <span className="block my-2   text-3xl  ">
              {" "}
              {analytics.delivered}
            </span>
          </div>
          <div className="border-2 border-gray-500 p-3 my-2 bg-gray-100">
            <span className="block my-2 text-gray-400 h6">Clicks</span>
            <span className="block my-2   text-3xl  "> {analytics.clicks}</span>
          </div>
          <div className="border-2 border-gray-500 p-3 my-2 bg-gray-100">
            <span className="block my-2 text-gray-400 h6">Failed</span>
            <span className="block my-2   text-3xl  "> {analytics.failed}</span>
          </div>
        </div>
      </div>
      {/* <div className="grid grid-cols-2 my-5  ">
        <div className=" col-span-2 sm:col-span-1 my-3 sm:my-0">
          <span className="block  text-gray-400 ">Title</span>
          <span className="block text-gray-600 text-2xl  ">
            {analytics.title}
          </span>
        </div>
        <div className=" col-span-2 sm:col-span-1 my-3 sm:my-0">
          <span className="block  text-gray-400 ">Body Text</span>
          <span className="block text-gray-600 text-2xl  ">
            {analytics.body_text}
          </span>
        </div>
      </div>
      <div>
        <span className="block  text-gray-400 "> Image</span>
        <span className="block text-gray-600 text-2xl  ">
          {analytics.image_type}
        </span>
      </div>
      <div className="grid grid-cols-2 my-5  ">
        <div className=" col-span-2 sm:col-span-1 my-3 sm:my-0">
          <span className="block  text-gray-400 "> Redirect URL</span>
          <a
            href={analytics.redirect_url}
            target="_blank"
            className="block text-blue-400 cursor-pointer  text-2xl  "
          >
            {analytics.redirect_url}
          </a>
        </div>
        <div className=" col-span-2 sm:col-span-1 my-3 sm:my-0">
          <span className="block  text-gray-400 "> Status</span>
          <span
            className={`block text-gray-600 text-2xl   ${
              analytics.status === "Completed" && "text-green-500"
            } `}
          >
            {analytics.status}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 my-5  ">
        <div className=" col-span-2 sm:col-span-1 my-3 sm:my-0">
          <span className="block  text-gray-400 "> Targeted</span>
          <span className="block text-gray-600 text-2xl  ">
            {analytics.targeted}
          </span>
        </div>
        <div className=" col-span-2 sm:col-span-1 my-3 sm:my-0">
          <span className="block  text-gray-400 "> Delivered</span>
          <span className="block text-gray-600 text-2xl  ">
            {analytics.delivered}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 my-5 ">
        <div className=" col-span-3   sm:col-span-1 my-3 sm:my-0">
          <span className="block  text-gray-400 "> Failed</span>
          <span className="block text-gray-600 text-2xl  ">
            {analytics.failed}
          </span>
        </div>
        <div className=" col-span-3 sm:col-span-1 my-3 sm:my-0">
          <span className="block  text-gray-400 "> Clicks</span>
          <span className="block text-gray-600 text-2xl  ">
            {analytics.clicks}
          </span>
        </div>
        <div className=" col-span-3 sm:col-span-1 my-3 sm:my-0">
          <span className="block  text-gray-400 "> Click Through Rate</span>
          <span className="block text-gray-600 text-2xl  ">
            {analytics.clickThroughRate}
          </span>
        </div>
      </div> */}
    </div>
  );
}
