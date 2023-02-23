import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import Container from "react-bootstrap/Container";

import { goTo, verifyLogin } from "../helper";
export default function AddWebsite() {
  let navigate = useNavigate();
  const [loggedin, setloggedin] = useState(false);
  useEffect(() => {
    verifyLogin().then((data) => {
      if (data) {
        setloggedin(true);
      } else {
        setloggedin(false);

        window.location.href = `${process.env.REACT_APP_FRONTEND_BASE}/login`;
        // window.location.href = "http://localhost:3000/login";
      }
    });
  }, []);
  const [loading, setLoading] = useState(false);

  const [name, setname] = useState("");
  const [domain, setdomain] = useState("");
  const [namemsg, setnamemsg] = useState("");
  const [domainmsg, setdomainmsg] = useState("");
  async function add() {
    setLoading(true);
    let accessToken = localStorage.getItem("accessToken");

    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_BASE}/websites/add`,
      // `${process.env.BACKEND_URL}/websites/add`,
      {
        name,
        domain,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response) {
      if (response.data.status) {
        setnamemsg("");
        setdomainmsg("");
        // goTo("dashboard");
        swal("Added", "Website has been added successfully", "success").then(
          (value) => {
            navigate(`/dashboard`);
          }
        );
      } else {
        if (response.data.errorType === "VALIDATION_ERROR") {
          setnamemsg("");
          setdomainmsg("");
          if (response.data.errors.hasOwnProperty("name")) {
            setnamemsg(response.data.errors.name);
          }
          if (response.data.errors.hasOwnProperty("domain")) {
            setdomainmsg(response.data.errors.domain);
          }
        } else {
          if (
            response.data.message === "Website domain is already registered."
          ) {
            swal(
              "Error",
              "This website domain is already registered",
              "error"
            ).then((value) => {
              navigate(``);
            });
          }
        }
      }
    }
    setLoading(false);
  }
  return (
    <>
      <NavbarComponent loggedin={loggedin} />
      <div className=" container  mt-5  ">
        <div className=" w-full  md:w-1/2 mx-auto md:border py-3 px-4 rounded  ">
          {" "}
          <form
            className="my-2"
            onSubmit={(e) => {
              e.preventDefault();
              add();
            }}
          >
            <span className="text-3xl mb-3 block ">Add Website</span>
            <div>
              <label className="block text-lg my-1">Name</label>
              <input
                className="my-2  border  w-100  rounded px-2 py-2 border-gray-600"
                type="text"
                placeholder="eg. google"
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />{" "}
              {namemsg !== "" && (
                <span className="text-danger text-sm my-1">{namemsg}</span>
              )}
            </div>

            <div>
              <label className="block text-lg my-1">Domain name</label>
              <input
                className="my-2 border   w-100  rounded px-2 py-2 border-gray-600"
                type="text"
                placeholder="eg. google.com"
                onChange={(e) => {
                  setdomain(e.target.value);
                }}
              />
              {domainmsg !== "" && (
                <span className="text-danger text-sm my-1">{domainmsg}</span>
              )}
            </div>

            <button
              disabled={loading}
              type="submit"
              className={`mt-3 text-white px-2  ${
                loading && "cursor-not-allowed bg-blue-400 hover:bg-blue-400"
              } bg-blue-600 hover:bg-blue-500 rounded py-1 my-1 text-lg cursor-pointer text-white `}
            >
              {" "}
              {loading ? "Loading..." : "Add website"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
