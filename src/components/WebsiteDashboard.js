import React, { Component } from "react";
import { verifyLogin } from "../helper";
import WebsiteIntegration from "./WebsiteIntegration";
import WebsiteIntegrationButton from "./WebsiteIntegrationButton";
import NavbarLogin from "./Navbar_Login";
export default class componentName extends Component {
  constructor() {
    super();
    this.state = {
      website_id: window.location.href.split("/")[4],

      loggedin: false,
    };
  }

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
  }
  render() {
    return (
      <div className="">
        {this.state.loggedin && <NavbarLogin page ="website_dashboard" />}
        <WebsiteIntegrationButton />
      </div>
    );
  }
}
