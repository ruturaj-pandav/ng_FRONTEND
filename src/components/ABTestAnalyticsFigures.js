import React from "react";
import { useState, useEffect } from "react";
import { goTo, verifyLogin } from "../helper.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Modal from "./Modal.js";
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
    if (ab_analytics.status === true) {
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
    <div className="container mx-auto w-5/6 lg:w-2/3  ">
      <div className="  md:w-full   block shadow-sm my-3 p-3  mx-2">
        <span className="block text-gray-500   ">Variant {variant}</span>{" "}
        <Switch
          onChange={handleChange_VARIANT}
          checked={variant === 2 ? true : false}
        />
      </div>
      <div>
        {" "}
        <div>
          <span className="block  text-gray-400 "> Image</span>
          <span className="block text-gray-600 text-2xl  ">
            {ab_analytics.image_type}
          </span>
        </div>
        <div className="grid grid-cols-2 my-5  ">
          <div className=" col-span-2 sm:col-span-1 my-3 sm:my-0">
            <span className="block  text-gray-400 "> Redirect URL</span>
            <a
              href={ab_analytics.redirect_url}
              target="_blank"
              className="block text-blue-400 cursor-pointer  text-2xl  "
            >
              {ab_analytics.redirect_url}
            </a>
          </div>
          <div className=" col-span-2 sm:col-span-1 my-3 sm:my-0">
            <span className="block  text-gray-400 "> Status</span>
            <span
              className={`block text-gray-600 text-2xl   ${
                ab_analytics.status === "Completed" && "text-green-500"
              } `}
            >
              {ab_analytics.status}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 my-5  ">
          <div className=" col-span-2 sm:col-span-1 my-3 sm:my-0">
            <span className="block  text-gray-400 "> Targeted</span>
            <span className="block text-gray-600 text-2xl  ">
              {ab_analytics.targeted}
            </span>
          </div>
          <div className=" col-span-2 sm:col-span-1 my-3 sm:my-0">
            <span className="block  text-gray-400 "> Delivered</span>
            <span className="block text-gray-600 text-2xl  ">
              {ab_analytics.delivered}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 my-5 ">
          <div className=" col-span-3   sm:col-span-1 my-3 sm:my-0">
            <span className="block  text-gray-400 "> Failed</span>
            <span className="block text-gray-600 text-2xl  ">
              {ab_analytics.failed}
            </span>
          </div>
          <div className=" col-span-3 sm:col-span-1 my-3 sm:my-0">
            <span className="block  text-gray-400 "> Clicks</span>
            <span className="block text-gray-600 text-2xl  ">
              {ab_analytics.clicks}
            </span>
          </div>
          <div className=" col-span-3 sm:col-span-1 my-3 sm:my-0">
            <span className="block  text-gray-400 "> Click Through Rate</span>
            <span className="block text-gray-600 text-2xl  ">
              {ab_analytics.clickThroughRate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
