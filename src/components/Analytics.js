import React, { Component } from "react";
import NavbarLogin from "./Navbar_Login"
import AnalyticsFigures from "./AnalyticsFigures";
import axios from "axios";
import swal from "sweetalert";
import { verifyLogin } from "../helper";
import PageTitle from "./PageTitle";

export default class componentName extends Component {
  constructor() {
    super();
    this.state = {
      website_id: window.location.href.split("/")[4],
      notification_id: window.location.href.split("/")[6],
      loggedin: false,
      analytics: [],
    };
  }
  getanalytics = async () => {
    let accessToken = localStorage.getItem("accessToken");

    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_BASE}/notifications/analytics`,
      // `${process.env.BACKEND_URL}/websites/list`,
      { notification_id: this.state.notification_id },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.data.status) {
      this.setState({ analytics: response.data.analytics });
    } else {
      if (response.data.status === false && response.data.message !== "") {
        swal("Something went wrong ", response.data.message, "error").then(
          () => {
            // window.location.href = `http://localhost:3000/dashboard/`;
            window.location.href = `${process.env.REACT_APP_FRONTEND_BASE}/dashboard`;
          }
        );
      }
    }
  };
  componentDidMount() {
    verifyLogin().then((data) => {
      if (data) {
        this.setState({ loggedin: true });
      } else {
        // window.location.href = "http://localhost:3000/login";
        window.location.href = `${process.env.REACT_APP_FRONTEND_BASE}/login`;
      }
    });
    this.getanalytics();
  }
  render() {
    return (
      <> <PageTitle  title="Notification Analytics"/>
          {this.state.loggedin && <NavbarLogin  />}
        <AnalyticsFigures analytics={this.state.analytics} />
      </>
    );
  }
}
