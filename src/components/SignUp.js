import React from "react";
import swal from "sweetalert";
import axios from "axios";
import NavbarLogout from "./Navbar_Logout.js";
import { useState, useEffect } from "react";
import { goTo, verifyLogin } from "../helper.js";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  let navigate = useNavigate();
  const [loggedin, setloggedin] = useState(true);

  useEffect(() => {
    verifyLogin().then((data) => {
      if (data) {
        setloggedin(true);
        // goTo("dashboard");
        navigate("/dashboard");
      } else {
        setloggedin(false);
      }
    });
  }, []);

  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");

  async function SignUpFunction() {
    setLoading(true);

    //let response = await axios.post(`${process.env.BACKEND_URL}/users/create`, {
    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_BASE}/users/create`,
      {
        firstname,
        lastname,
        email,
        password,
      }
    );

    setLoading(false);
    if (response.data.status === false) {
      if (response.data.errorType === "VALIDATION_ERROR") {
        setFirstnameMsg(null);
        setLastnameMsg(null);
        setEmailMsg(null);
        setPasswordMsg(null);
        if (response.data.errors.hasOwnProperty("firstname")) {
          setFirstnameMsg(response.data.errors.firstname);
        }
        if (response.data.errors.hasOwnProperty("lastname")) {
          setLastnameMsg(response.data.errors.lastname);
        }
        if (response.data.errors.hasOwnProperty("email")) {
          setEmailMsg(response.data.errors.email);
        }
        if (response.data.errors.hasOwnProperty("password")) {
          setPasswordMsg(response.data.errors.password);
        }
      } else if (response.data.message === "Email is already registered.") {
        setFirstnameMsg(null);
        setLastnameMsg(null);
        setEmailMsg(null);
        setPasswordMsg(null);

        swal(
          "Already exists ",
          "Account with this email already exists. Login instead? ",
          "error"
        );
      }
    } else {
      setFirstnameMsg(null);
      setLastnameMsg(null);
      setEmailMsg(null);
      setPasswordMsg(null);

      setAccountCreated("Account Created Successfully");
      let accessToken = response.data.accessToken;
      let refreshToken = response.data.refreshToken;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      // goTo("dashboard");
      navigate("/dashboard");
    }
  }

  //

  const [firstnameMsg, setFirstnameMsg] = useState(null);
  const [lastnameMsg, setLastnameMsg] = useState(null);
  const [emailMsg, setEmailMsg] = useState(null);
  const [passwordMsg, setPasswordMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [accountCreated, setAccountCreated] = useState(null);
  //
  return (
    <>
      <NavbarLogout />
      <div className="container mx-auto ">
        <div
          className="flex items-center sm:justify-center    "
          style={{ minHeight: "80vh" }}
        >
          <div className="w-full sm:w-2/3 md:w-2/3 lg:w-1/3 mx-auto       p-2 rounded  ">
            <form
              className="border rounded  shadow  p-5 "
              onSubmit={(e) => {
                e.preventDefault();
                SignUpFunction();
              }}
            >
              <span className="mb-4 text-3xl font-semibold block capitalize ">
                {" "}
                Enter your details
              </span>
              <div className="my-3">
                <input
                  className="block   w-100 text-lg px-2 py-1 rounded-1 border borrder-gray-500"
                  type="text"
                  placeholder="first name"
                  onChange={(e) => {
                    setfirstname(e.target.value);
                  }}
                />
                {firstnameMsg !== "" && firstnameMsg !== "" ? (
                  <span className="text-red-500  text-sm">{firstnameMsg}</span>
                ) : null}
              </div>
              <div className="my-3">
                <input
                  className="block  w-100 text-lg px-2 py-1 rounded-1 border borrder-gray-500"
                  type="text"
                  placeholder="last name"
                  onChange={(e) => {
                    setlastname(e.target.value);
                  }}
                />
                {lastnameMsg !== "" && lastnameMsg !== "" ? (
                  <span className="text-red-500  text-sm">{lastnameMsg}</span>
                ) : null}
              </div>
              <div className="my-3">
                <input
                  className="block   w-100 text-lg px-2 py-1 rounded-1 border borrder-gray-500"
                  type="email"
                  placeholder="email"
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                />
                {emailMsg !== "" && emailMsg !== "" ? (
                  <span className="text-red-500  text-sm">{emailMsg}</span>
                ) : null}
              </div>
              <div className="my-3">
                <input
                  className="block  w-100 text-lg px-2 py-1 rounded-1 border borrder-gray-500"
                  type="password"
                  placeholder="password"
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                />
                {passwordMsg !== "" && passwordMsg !== "" ? (
                  <span className="text-red-500  text-sm">{passwordMsg}</span>
                ) : null}
              </div>
              <button
                disabled={loading}
                type="submit"
                className={`w-100   ${
                  loading
                    ? "hover:bg-blue-400 bg-blue-400 hover:cursor-not-allowed"
                    : "hover:bg-blue-600 bg-blue-500 cursor-pointer"
                }     rounded py-1 my-1 text-lg text-white `}
              >
                {loading ? "Loading..." : "Create account"}
              </button>{" "}
            </form>
            <span
              className="text-sm text-center mt-4  block  cursor-pointer text-blue-600 hover:text-blue-700"
              onClick={() => {
                navigate("/login");
              }}
            >
              Already have an account ? Login
            </span>
          </div>
        </div>{" "}
      </div>
    </>
  );
}
