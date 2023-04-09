import React, { Component } from "react";
import axios from "axios"
import { verifyLogin } from "../helper";
import WebsiteIntegration from "./WebsiteIntegration";
import WebsiteIntegrationButton from "./WebsiteIntegrationButton";
import NavbarLogin from "./Navbar_Login";
export default class componentName extends Component {
  constructor() {
    super();
    this.state = {
      website_id: window.location.href.split("/")[4],

      data : [], 
      loggedin: false,
    };
  }

  getData = async () => {

    let accessToken = localStorage.getItem("accessToken");

    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_BASE}/websites/analytics`,
      {website_id : this.state.website_id},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response) {
      if (response.data.status) {

        // this.setState({ website_data: response.data });

       this.setState({data : response.data.data})
      }
      if (
        response.data.status === false &&
        response.data.message == "No websites found."
      ) {
        this.setState({ website_data: response.data });
      }
    } else {
    }
  };
  componentDidUpdate() {
    // this.getlistprompt();
  }
  componentDidMount() {
    verifyLogin().then((data) => {
      if (data) {
        this.setState({ loggedin: true });
      } else {
        // window.location.href = "http://localhost:3000/login";
        window.location.href = `${process.env.REACT_APP_FRONTEND_BASE}/login`;
      }
    });
    this.getData();
  }
  render() {
    return (
      <div className="">
        {this.state.loggedin && <NavbarLogin page ="website_dashboard" />}
        tset things
        <WebsiteIntegrationButton />
      </div>
    );
  }
}
