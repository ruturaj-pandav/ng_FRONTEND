import React from "react";
import { useState, useEffect } from "react";
import { goTo, verifyLogin } from "../helper.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Modal from "./Modal.js";
import NavbarComponent from "./NavbarComponent.js";

export default function Login() {
  let navigate = useNavigate();
  const [loggedin, setloggedin] = useState(false);
  const [loading, setLoading] = useState(false);
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

  async function LoginFunction() {
    setLoading(true);
    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_BASE}/users/login`,
      {
        email,
        password,
      }
    );

    if (response.data.status === true) {
      let accessToken = response.data.accessToken;
      let refreshToken = response.data.refreshToken;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // goTo(`${response.data.redirectTo}`);
      navigate(`/${response.data.redirectTo}`);
    } else {
      if (response.data.errorType === "VALIDATION_ERROR") {
        setPasswordErrorMessage(null);
        setEmailErrorMessage(null);

        if (response.data.errors.hasOwnProperty("email")) {
          setEmailErrorMessage(response.data.errors.email);
        }
        if (response.data.errors.hasOwnProperty("password")) {
          setPasswordErrorMessage(response.data.errors.password);
        }
      }
      if (response.data.message === "Invalid Credentials!") {
        setEmailErrorMessage(null);
        setPasswordErrorMessage(null);

        swal(
          "Invalid credentials ",
          "The email and the password doesn't match ",
          "error"
        );
      }
      if (response.data.message === "Account does not exist.") {
        setEmailErrorMessage(null);
        setPasswordErrorMessage(null);
        swal(
          "Account not found ",
          "Account with this email not found. Please recheck the email or create a new account",
          "error"
        );
      }
    }
    setLoading(false);
  }

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);

  return (
    <>
      <NavbarComponent loggedin={loggedin} />

      <div className="container mx-auto ">
        <div
          className="flex items-center sm:justify-center    "
          style={{ minHeight: "80vh" }}
        >
          <div className="w-full sm:w-2/3 md:w-2/3 lg:w-1/3 mx-auto       p-3 rounded  ">
            <form
              className="border rounded  shadow  p-5 "
              onSubmit={(e) => {
                e.preventDefault();
                LoginFunction();
              }}
            >
              <span className="mb-4 text-3xl font-semibold block capitalize ">
                {" "}
                enter credentials
              </span>
              <div className="my-3">
                <input
                  type="email"
                  className="block  w-100 px-2 py-1 text-lg rounded-1 border borrder-gray-500"
                  placeholder=" email"
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                />
                {emailErrorMessage !== "" && emailErrorMessage !== "" ? (
                  <span className="text-danger text-sm  ">{emailErrorMessage}</span>
                ) : null}
              </div>
              <div className="my-3">
                <input
                  className="block   w-100 text-lg px-2 py-1 rounded-1 border borrder-gray-500"
                  type="password"
                  placeholder=" password"
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                />
                {passwordErrorMessage !== "" && passwordErrorMessage !== "" ? (
                  <span className="text-danger text-sm ">
                    {passwordErrorMessage}
                  </span>
                ) : null}
              </div>
              <button  disabled={loading}
                type="submit"
                className={`w-100  ${
                  loading
                    ? "hover:bg-blue-400 bg-blue-400 hover:cursor-not-allowed"
                    : "hover:bg-blue-600 bg-blue-500 cursor-pointer"
                }    rounded py-1 my-1 text-lg text-white`}
              >
                {loading ? 'Loading...' : 'Login '}
              </button>{" "}
            </form>
            <span
              className="text-sm text-center mt-4  block  cursor-pointer text-blue-600 hover:text-blue-700"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Don't have an account ? Create one now
            </span>
          </div>
        </div>{" "}
      </div>

     
    </>
  );
}
