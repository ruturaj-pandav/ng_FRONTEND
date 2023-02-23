import React, { Component } from "react";
import { verifyLogin } from "../helper";
import NavbarComponent from "./NavbarComponent";
import ABTestList from "./ABTestList";
import axios from "axios";
import swal from "sweetalert";
export default class componentName extends Component {
  constructor() {
    super();
    this.state = {
      website_id: window.location.href.split("/")[4],
      loggedin: false,
      AB: [],
    };
  }
  getAB = async () => {
    console.log("get ab function");
    console.log("something in get ab test ");
    let accessToken = localStorage.getItem("accessToken");

    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_BASE}/abtests/list`,
      // `${process.env.BACKEND_URL}/websites/list`,
      { website_id: this.state.website_id, filter: "all" },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.data.status) {
      console.log("this data got ", response.data);
      this.setState({ AB: response.data });
    } else {
      if (response.data.status === false && response.data.message !== "") {
        swal("Something went wrong ", response.data.message, "error").then(
          () => {
            window.location.href = `${process.env.REACT_APP_FRONTEN_BASE}/dashboard/`;
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
        window.location.href = `${process.env.FRONTEND_BASE}/login`;
      }
    });

    this.getAB();
  }
  render() {
    return (
      <>
        <NavbarComponent loggedin={this.state.loggedin} page="ab" />
        <div>
          <ABTestList AB={this.state.AB} getAB={this.getAB} />
        </div>
      </>
    );
  }
}
