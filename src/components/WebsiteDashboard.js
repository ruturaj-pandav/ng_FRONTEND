import React, { Component } from "react";
import { verifyLogin } from "../helper";
import WebsiteIntegration from "./WebsiteIntegration";
import WebsiteIntegrationButton from "./WebsiteIntegrationButton";
import NavbarComponent from "./NavbarComponent";
export default class componentName extends Component {
  constructor() {
    super();
    this.state = {
      website_id: 0,

      loggedin: false,
    };
  }
  setwid = () => {
    let website_id = window.location.href.split("/")[4];
    this.setState({ website_id: website_id });
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
        window.location.href = `${process.env.FRONTEND_BASE}/login`;
      }
    });

    this.setwid();
    // this.getlistprompt();
  }
  render() {
    return (
      <div className="">
        <NavbarComponent loggedin={this.state.loggedin} />
        <WebsiteIntegrationButton />
      </div>
    );
  }
}
