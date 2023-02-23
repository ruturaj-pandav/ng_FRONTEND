import React, { Component } from "react";
import NavbarComponent from "./NavbarComponent";
import NotificationsList from "./NotificationsList";
import { verifyLogin } from "../helper";
import axios from "axios";
import swal from "sweetalert";
export default class componentName extends Component {
  constructor() {
    super();
    this.state = {
      website_id: window.location.href.split("/")[4],
      loggedin: false,
      notifications: [],
    };
  }
  getnotifications = async () => {
    console.log("get notification function")
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
  }

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
        <NavbarComponent loggedin={this.state.loggedin} page="notifications" />
        <div>
          <NotificationsList
            notifications={this.state.notifications}
            getnotifications={this.getnotifications}
          />
        </div>
      </>
    );
  }
}
