import React, { Component } from "react";
import NavbarLogin from "./Navbar_Login"
import ProfileInformation from "./ProfileInformation";
import axios from "axios";
import moment from "moment";
import swal from "sweetalert";
import { verifyLogin } from "../helper";
export default class componentName extends Component {
  constructor() {
    super();
    this.state = {
      loggedin: false,
      user: [],
     
    };
  }
 
  getprofile = async () => {
    let accessToken = localStorage.getItem("accessToken");

    let response = await axios.get(
      `${process.env.REACT_APP_BACKEND_BASE}/users/details`,
      // `${process.env.BACKEND_URL}/websites/list`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.data.status) {
      this.setState({ user: response.data.details });
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
    this.getprofile();
  }
  render() {
    return (
      <>
         {this.state.loggedin && <NavbarLogin    />}
        <div className="container mx-auto w-full sm:w-3/4 md:w-2/3  px-3  ">
          <ProfileInformation user=  {this.state.user} />
        </div>
      </>
    );
  }
}
