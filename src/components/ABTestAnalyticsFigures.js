import React from "react";
import { useState, useEffect } from "react";
import { goTo, verifyLogin } from "../helper.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Modal from "./Modal.js";
import NavbarLogin from "./Navbar_Login"

export default function ABTestAnalyticsFigures({ ab_analytics }) {
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

  return <div className="container mx-auto w-5/6 lg:w-2/3  ">
    ab test analytics
  </div>;
}
