import React, { Component } from "react";
import axios from "axios";
import NavbarComponent from "./NavbarComponent";
import ABTestAnalyticsFigures from "./ABTestAnalyticsFigures";
import swal from "sweetalert";
import { verifyLogin } from "../helper";
export default class componentName extends Component {
  constructor() {
    super();
    this.state = {
      website_id: window.location.href.split("/")[4],
      ab_test_id: window.location.href.split("/")[6],
      loggedin: false,
      ab_analytics: [],
    };
  }
  getanalytics = async () => {
    console.log("getting analytics ab test");
    let accessToken = localStorage.getItem("accessToken");

    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_BASE}/abtests/analytics`,
      // `${process.env.BACKEND_URL}/websites/list`,
      { ab_test_id: this.state.ab_test_id },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response) {
      if (response.data.status) {
        console.log("response status for ab test ", response.data);
        this.setState({ ab_analytics: response.data });
      }
      if (response.data.status === false && response.data.message !== "") {
        console.log("kuch galat aaya");
        swal("Something went wrong ", response.data.message, "error").then(
          () => {
            window.location.href = `${process.env.REACT_APP_FRONTEND_BASE}/dashboard`;
          }
        );
      }
    } else {
      console.log("no response");
    }
  };
  componentDidMount() {
    verifyLogin().then((data) => {
      if (data) {
        this.setState({ loggedin: true });
      } else {
        window.location.href = `${process.env.REACT_APP_FRONTEND_BASE}/login`;
        // window.location.href = "http://localhost:3000/login";
      }
    });
    this.getanalytics();
  }
  render() {
    return (
      <>
        <NavbarComponent loggedin={this.state.loggedin} />
        <ABTestAnalyticsFigures ab_analytics={this.state.ab_analytics} />
      </>
    );
  }
}
