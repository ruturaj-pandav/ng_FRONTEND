import React from "react";
import { useState, useEffect } from "react";
import { goTo, verifyLogin } from "../helper.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Modal from "./Modal.js";
import NavbarComponent from "./NavbarComponent.js";

export default function AnalyticsFigures({ analytics }) {
  let navigate = useNavigate();
  const [loggedin, setloggedin] = useState(false);

  useEffect(() => {
    verifyLogin().then((data) => {
      if (data) {
        setloggedin(true);

      } else {
        setloggedin(false);
        navigate("/login")
      }
    });
  }, []);

  return (
    <div className="container mx-auto w-5/6 lg:w-2/3  ">
      <div className="grid grid-cols-2 my-5  ">
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
      </div>
    </div>
  );
}
