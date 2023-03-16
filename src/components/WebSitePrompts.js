import React, { Component } from "react";
import { verifyLogin } from "../helper";
import axios from "axios";
import { withRouter } from "react-router";
import PromptsList from "./PromptsList";
import NavbarLogin from "./Navbar_Login"
import PromptAdd from "./PromptAdd";
import swal from "sweetalert";
import PageTitle from "./PageTitle";
export default class componentName extends Component {
  constructor() {
    super();
    this.state = {
      website_id: window.location.href.split("/")[4],
      prompts: [],
      loggedin: false,
    };
  }

  getlistprompt = async () => {
    let accessToken = localStorage.getItem("accessToken");

    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_BASE}/websites/listprompts`,
      // `${process.env.BACKEND_URL}/websites/list`,
      { website_id: this.state.website_id, filter: "all" },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.data.status) {

      this.setState({ prompts:  response.data });
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
    this.getlistprompt();
  }
  render() {
    return (
      <> <PageTitle  title="Prompts"/>
        {this.state.loggedin && <NavbarLogin page  ="prompts" />}
        <div>
          <PromptsList prompts={this.state.prompts} />
        </div>
      </>
    );
  }
}
