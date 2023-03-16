import React, { Component } from "react";
import NavbarLogin from "./Navbar_Login"
import NotificationsList from "./NotificationsList";
import { verifyLogin } from "../helper";
import axios from "axios";
import swal from "sweetalert";
import PageTitle from "./PageTitle";
export default class componentName extends Component {
  constructor() {
    super();
    this.state = {
      website_id: window.location.href.split("/")[4],
      loggedin: false,
      notifications: [],

      website_domain: "",
    };
  }
  getnotifications = async () => {

    let accessToken = localStorage.getItem("accessToken");

    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_BASE}/notifications/list`,
      // `${process.env.BACKEND_URL}/websites/list`,
      { website_id: this.state.website_id },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.data.status) {
      this.setState({ notifications: response.data });
    } else {
      if (response.data.status === false && response.data.message !== "") {
        swal("Something went wrong ", response.data.message, "error").then(
          () => {
            window.location.href = `${process.env.REACT_APP_FRONTEND_BASE}/dashboard`;
            // window.location.href = `http://localhost:3000/dashboard/`;
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
    this.getnotifications();
    this.getThisWebsiteDomain();
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
  deletenotification = async (notification_id) => {
    let accessToken = localStorage.getItem("accessToken");

    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_BASE}/notifications/deleteNotification`,

      { notification_id: parseInt(notification_id) },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.data.status) {
      this.getnotifications();
    }
  };
  render() {
    return (
      <>
      <PageTitle  title="Notifications"/>
       {this.state.loggedin && <NavbarLogin page  ="notifications" />}
        <div>
          <NotificationsList
            website_domain={this.state.website_domain}
            notifications={this.state.notifications}
            getnotifications={this.getnotifications}
          />
        </div>
      </>
    );
  }
}
