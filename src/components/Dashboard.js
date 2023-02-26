import React, { Component } from "react";
import Websites from "./Websites.js";
import NavbarLogin from "./Navbar_Login.js";
import axios from "axios";

import { verifyLogin } from "../helper.js";
export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      website_data: [],
      loggedin: false,
    };
  }

  getwebsites = async () => {
    let accessToken = localStorage.getItem("accessToken");

    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_BASE}/websites/list`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response) {
      if (response.data.status) {
    
        this.setState({ website_data: response.data });
      }
      if (response.data.status === false && response.data.message =="No websites found.") {
     
        this.setState({ website_data: response.data });
      }
    } else {
      
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

    this.getwebsites();
  }
  // localstorage access and send in headers

  render() {
    return (
      <div>
        {this.state.loggedin && <NavbarLogin  page= "your_websites"/>}
        <Websites
          loggedin={this.state.loggedin}
          website_data={this.state.website_data}
        />
      </div>
    );
  }
}
