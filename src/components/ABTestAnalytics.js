import React, { Component } from "react";
import axios from "axios";
import NavbarLogin from "./Navbar_Login"
import ABTestAnalyticsFigures from "./ABTestAnalyticsFigures";
import swal from "sweetalert";
import { verifyLogin } from "../helper";
import PageTitle from "./PageTitle";
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
       
        this.setState({ ab_analytics: response.data.analytics });
        
      }
      if (response.data.status === false && response.data.message !== "") {
      
        swal("Something went wrong ", response.data.message, "error").then(
          () => {
            window.location.href = `${process.env.REACT_APP_FRONTEND_BASE}/dashboard`;
          }
        );
      }
    } else {
    
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
      <> <PageTitle  title="AB - Analytics"/>
       {this.state.loggedin && <NavbarLogin page  ="ab" />}
        <ABTestAnalyticsFigures ab_analytics={this.state.ab_analytics} />
      </>
    );
  }
}
