import React, { Component } from "react";
import { verifyLogin } from "../helper";
import NavbarLogin from "./Navbar_Login"
import ABTestList from "./ABTestList";
import axios from "axios";
import swal from "sweetalert";
import PageTitle from "./PageTitle";
export default class componentName extends Component {
  constructor() {
    super();
    this.state = {
      website_id: window.location.href.split("/")[4],
      loggedin: false,
      website_domain: "",
      loading: false,
      AB: [],
    };
  }

  getThisWebsiteDomain = async () => {
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
        // this.setState({ website_data: response.data });

        const target_id = this.state.website_id;
        if (target_id !== null && target_id !== undefined) {
       
          const targetObject = response.data.websites.find(
            (obj) => obj.id === parseInt(target_id)
          );

          if (targetObject) {
           
            let website_domain = targetObject.domain;
            if (
              website_domain !== "" &&
              website_domain !== null &&
              website_domain !== undefined
            ) {
              this.setState({ website_domain: website_domain });
            }
          } else {
           
          }
        }
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
  getAB = async () => {
    
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
        window.location.href = `${process.env.REACT_APP_FRONTEND_BASE}/login`;
      }
    });

    this.getAB();
    this.getThisWebsiteDomain();
  }
  render() {
    return (
      <>
         <PageTitle title="AB " />
          {this.state.loggedin && <NavbarLogin page  ="ab" />}
        <div>
          <ABTestList AB={this.state.AB} getAB={this.getAB} website_domain={this.state.website_domain}/>
        </div>
      </>
    );
  }
}
