import React, { Component } from "react";
import axios from "axios";
import { verifyLogin } from "../helper";
import WebsiteIntegration from "./WebsiteIntegration";
import WebsiteIntegrationButton from "./WebsiteIntegrationButton";
import NavbarLogin from "./Navbar_Login";
export default class componentName extends Component {
  constructor() {
    super();
    this.state = {
      website_id: window.location.href.split("/")[4],

      data: [],
      loggedin: false,
    };
  }

  getData = async () => {
    let accessToken = localStorage.getItem("accessToken");

    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_BASE}/websites/analytics`,
      { website_id: this.state.website_id },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response) {
      if (response.data.status) {
        // this.setState({ website_data: response.data });

        this.setState({ data: response.data.data });
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
        {this.state.loggedin && <NavbarLogin page="website_dashboard" />}

        <div>
          <div className="grid grid-cols-4  w-3/4 mx-auto gap-3 ">
            <div className="rounded-4 border bg-gray-200 p-3  my-4">
              <span className="block my-1 font-semibold ">top subscribers</span>
              <span className="block my-1 font-semibold ">329</span>
            </div>
            <div className="rounded-4 border bg-gray-200 p-3  my-4">
              <span className="block my-1 font-semibold ">
                active subscribers
              </span>
              <span className="block my-1 font-semibold ">329</span>
            </div>
          </div>
          <div className="flex justify-center ">
            <div className="mx-3 rounded-4 bg-gray-200  py-3 px-16">
              <span className="block font-semibold text-xl  text-center capitalize ">
                top notifications by ctr
              </span>
              <div className="my-3">
                <div className="flex justify-between my-1 ">
                  <span className="inline-block font-semibold capitalize ">
                    test1
                  </span>
                  <span className="inline-block">test2</span>
                </div>
              </div>
              <div className="w-full flex flex-row-reverse">
                <span className="inline-block  my-3 text-blue-600 cursor-pointer duration-100 hover:text-blue-700 ">
                  view all
                </span>
              </div>
            </div>
            <div className="mx-3 rounded-4 bg-gray-200   py-3 px-16">
              <span className="block font-semibold text-xl  text-center capitalize ">
                top subsribers by coutntires
              </span>
              <div className="my-3">
                <div className="flex justify-between my-1 ">
                  <span className="inline-block font-semibold capitalize ">
                    test1
                  </span>
                  <span className="inline-block">test2</span>
                </div>
              </div>
              <div className="w-full flex flex-row-reverse">
                <span className="inline-block  my-3 text-blue-600 cursor-pointer duration-100 hover:text-blue-700 ">
                  view all
                </span>
              </div>
            </div>
          </div>
        </div>
        <WebsiteIntegrationButton />
      </div>
    );
  }
}
