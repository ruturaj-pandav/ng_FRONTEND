import React, { Component } from "react";
import SegmentsList from "./SegmentsList";
import NavbarLogin from "./Navbar_Login";
import { verifyLogin } from "../helper.js";
import axios from "axios";
import swal from "sweetalert";
import PageTitle from "./PageTitle";
export default class componentName extends Component {
  constructor() {
    super();
    this.state = {
      loggedin: true,
      website_id: window.location.href.split("/")[4],
      countries_list: [],
      segments: [],
    };
  }

  setwid = () => {
    let website_id = window.location.href.split("/")[4];

    this.setState({ website_id: website_id });
  };

  deletesegment = async (website_id, segment_id) => {
    let accessToken = localStorage.getItem("accessToken");

    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_BASE}/segments/deleteSegment`,
      // `${process.env.BACKEND_URL}/websites/list`,
      { website_id, segment_id },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.data.status) {
      this.getsegments();
      return true ;
    }
    else {
      return false ;
    }
  };
  getsegments = async () => {
    let accessToken = localStorage.getItem("accessToken");

    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_BASE}/segments/listSegments`,
      // `${process.env.BACKEND_URL}/websites/list`,
      { website_id: this.state.website_id, filter: "all" },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.data.status) {
      this.setState({ segments: response.data });
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

  getcountrieslist = async () => {
    let response = await axios.get(
      `${process.env.REACT_APP_BACKEND_BASE}/subscriptions/listCountries`
    );
    if (response.data.status) {
      // let temp_countries = response.data.list;
      this.setState({ countries_list: response.data.list });
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
    this.getcountrieslist();
    this.getsegments();
  }
  render() {
    return (
      <>
      <PageTitle title="Segments"/>
    {this.state.loggedin &&     <NavbarLogin page="segments" />}
        <div>
          <SegmentsList
            
            getsegments={this.getsegments}
            segments={this.state.segments}
            countries_list={this.state.countries_list}
          />
        </div>
      </>
    );
  }
}
