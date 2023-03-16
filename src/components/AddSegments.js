import React from "react";
import fileDownload from "js-file-download";
import axios from "axios";
import swal from "sweetalert";
import Multiselect from "multiselect-react-dropdown";
import NavbarLogin from "./Navbar_Login.js";
import { useState, useEffect } from "react";
import { goTo, verifyLogin } from "../helper.js";
import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "./PageTitle.js";

export default function AddSegments() {
  const [loading, setLoading] = useState(false);
  async function getcountries() {
    let response = await axios.get(
      `${process.env.REACT_APP_BACKEND_BASE}/subscriptions/listCountries`
    );
    if (response.data.status) {
      let temp_countries = response.data.list;
      temp_countries.map((country, index) => {
        let thiscountry = {
          name: `${country.full_name} ${country.country_code}`,
          id: index + 1,
        };
        let countriesnow = countries;
        countriesnow.push(thiscountry);
        setcountries(countriesnow);
      });
    }
  }
  function onSelect(selectedList, selectedItem) {
    setselected(selectedList);
  }
  function onRemove(selectedList, selectedItem) {
    setselected(selectedList);
  }
  function handleChange_EQUAL(event) {
    setequal(event.target.value);
  }
  function handleChange_DEVICE(event) {
    setdeviceType(event.target.value);
  }
  const [countries, setcountries] = useState([]);
  let navigate = useNavigate();
  let { website_id } = useParams();
  const [loggedin, setloggedin] = useState(false);
  const [name, setName] = useState("");

  const [deviceType, setdeviceType] = useState("");
  const [equal, setequal] = useState("true");

  const [selected, setselected] = useState([]);

  const [name_errmsg, setnameErrMsg] = useState("");
  const [errmsg, seterrmsg] = useState("");

  function setEveryErrorNull() {
    setnameErrMsg("");
  }
  function setEveryValueNull() {
    setName("");
    setselected("");
    setdeviceType("");
  }
  async function addsegment() {
    setLoading(true);

    let accessToken = localStorage.getItem("accessToken");

    let sendlist = [];
    selected.map((obj, index) => {
      sendlist.push(obj.name.split(" ")[obj.name.split(" ").length - 1]);
    });

    let segmentdata;

    if (name === "") {
      setnameErrMsg("give name to segment");
    } else {
      setnameErrMsg("");

      if (deviceType === "" && selected.length === 0) {
        seterrmsg("Please select either device type , or countries list");
      } else {
        if (deviceType === "") {
          if (equal === "true") {
            segmentdata = {
              name,
              website_id: parseInt(website_id),
              countries_equal_to: sendlist.join(","),
            };
          } else if (equal === "false") {
            segmentdata = {
              name,
              website_id: parseInt(website_id),
              countries_not_equal_to: sendlist.join(","),
            };
          }
        } else if (selected.length === 0) {
          segmentdata = {
            name,
            website_id: parseInt(website_id),
            deviceType,
          };
        } else {
          if (equal === "true") {
            segmentdata = {
              name,
              deviceType,
              website_id: parseInt(website_id),
              countries_equal_to: sendlist.join(","),
            };
          } else if (equal === "false") {
            segmentdata = {
              name,
              website_id: parseInt(website_id),
              deviceType,
              countries_not_equal_to: sendlist.join(","),
            };
          }
        }

        let response = await axios.post(
          `${process.env.REACT_APP_BACKEND_BASE}/segments/createSegment`,

          segmentdata,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.data.status) {
          swal(
            "Segment added ",
            "Segment with these rules has been created",
            "success"
          ).then((value) => {
            setEveryValueNull();
            navigate(`/website/${website_id}/segments`);
          });
          setEveryErrorNull();
          setEveryValueNull();
          // setshowform(false);
          // getlistprompt();
        } else {
          if (
            response.data.status === false &&
            response.data.errorType === "VALIDATION_ERROR"
          ) {
            setEveryErrorNull();
            if (response.data.errors.hasOwnProperty("name")) {
              setnameErrMsg(response.data.errors.name);
            }
          } else if (
            response.data.status === false &&
            response.data.message !== ""
          ) {
            swal("Something went wrong ", response.data.message, "error");
          }
        }
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    verifyLogin().then((data) => {
      if (data) {
        setloggedin(true);
        getcountries();
        // goTo("dashboard");
      } else {
        setloggedin(false);
        navigate("/login");
      }
    });
  }, []);

  return (
    <>
    <PageTitle  title="Add segments"/>
      {loggedin && <NavbarLogin page="segments" />}
      <div className="container mx-auto ">
        <form
          className="w-full lg:w-2/3  mx-auto shadow mx-2 p-4  my-8  md:border rounded  md:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            addsegment();
          }}
        >
          <span className="block text-2xl  my-2 font-semibold">
            Add a new Segment
          </span>

          <div className="my-3 ">
            <label className="block text-sm text-gray-500 ">
              Name of Segment
            </label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              className="w-full md:w-3/4  border rounded py-1 px-2  block  "
            />
            {name_errmsg && (
              <span className="text-red-500 block ">{name_errmsg}</span>
            )}
          </div>
          <div className="my-3 ">
            <label className="block text-sm text-gray-500 ">Device Type</label>
            <select
              onChange={(event) => {
                handleChange_DEVICE(event);
              }}
              className="border rounded text-lg  py-1 px-2 md:w-3/4 w-full "
            >
              {deviceType === "" && (
                <option value="" selected disabled hidden>
                  Choose here
                </option>
              )}

              <option value="Mobile">Mobile</option>
              <option value="Tablet">Tablet</option>
              <option value="Desktop">Desktop</option>
              {deviceType !== "" && <option value="" className="bg-gray-500 py-3">Remove</option>}
            </select>
          </div>
          <div className="my-3 "></div>
          <div className="my-3  ">
            <label className="   ">Countries</label>
            <select
              className="border rounded text-lg  py-1 px-2 mx-2 "
              onChange={(event) => {
                handleChange_EQUAL(event);
              }}
            >
              <option value="true">is </option>
              <option value="false">is not </option>
            </select>{" "}
            <br />
            <div className="w-full md:w-3/4 mt-2 text-sm lg:text-base">
              <Multiselect
                options={countries} // Options to display in the dropdown
                // selectedValues={selectedValue} // Preselected value to persist in dropdown
                onSelect={onSelect}
                onRemove={onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
              />
            </div>
          </div>
          {errmsg && <span className="block text-red-500 my-3 ">{errmsg}</span>}
          <button
            disabled={loading}
            type="submit"
            className={`  ${
              loading
                ? "hover:bg-blue-400 bg-blue-400 hover:cursor-not-allowed"
                : "hover:bg-blue-600 bg-blue-500 cursor-pointer"
            }  text-white rounded py-1 px-2 block duration-100`}
          >
            {loading ? "Loading..." : "Add segment"}
          </button>
        </form>
      </div>
    </>
  );
}
