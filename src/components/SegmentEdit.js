import React from "react";
import axios from "axios";
import swal from "sweetalert";
import Multiselect from "multiselect-react-dropdown";
import NavbarLogin from "./Navbar_Login"
import { verifyLogin } from "../helper.js";
import { useState, useEffect } from "react";

import { useParams, useNavigate, useLocation } from "react-router-dom";
import { setSelectionRange } from "@testing-library/user-event/dist/utils/index.js";
export default function SegmentEdit({}) {
  let navigate = useNavigate();
  let location = useLocation();
  const [selected, setselected] = useState([]);
  let countries_list = location.state.countries_list;
  const [options, setoptions] = useState([]);
  useEffect(() => {

    if (options.length !== 250 || countries_list.length !== 250) {
     
      setOptionsFunction();
    }
  }, [countries_list]);
  function setOptionsFunction() {

   
    if (countries_list.length > 0) {
      countries_list.map((content, index) => {
        let thiscountry = {
          name: `${content.full_name} ${content.country_code}`,
          id: index + 1,
        };
        setoptions([...options , thiscountry])
      });
     
      
      selectedOptionsFunction();
    }
  }
  function onSelect(selectedList, selectedItem) {
    setselected(selectedList);
  }
  function onRemove(selectedList, selectedItem) {
    setselected(selectedList);
  }

  function getCountryName(cc) {
    let index = 0;
    if (options.length > 0) {
      for (let i = 0; i < options.length; i++) {
        let country_code =
          options[i].name.split(" ")[options[i].name.split(" ").length - 1];
        let firstname = options[i].name
          .split(" ")
          .splice(0, options[i].name.split(" ").length - 1)
          .join(" ");

        if (cc == country_code) {
          index = i;
          break;
        }
      }

      let countryname = options[index].name
        .split(" ")
        .splice(0, options[index].name.split(" ").length - 1)
        .join("");

      return countryname;
    }
    else {
    
    }
  }
  function selectedOptionsFunction() {
 
    let isequal = 0;
    let countries = [];
    let sel = [];
   
    if ( countries_list.length > 0) {
    
      if (
        segment.hasOwnProperty("segment_rules") &&
        segment.segment_rules.hasOwnProperty("countries")
      ) {
        if (segment.segment_rules.countries.hasOwnProperty("equal_to")) {
          isequal = 1;
          countries = segment.segment_rules.countries.equal_to;
        } else {
          countries = segment.segment_rules.countries.not_equal_to;
        }
      }
      countries = countries.split(",");
      countries.map((cc, index) => {
        let thiscountry = {
          id: index,
          name: getCountryName(cc),
        };
        sel.push(thiscountry);
      });
     
      setselected(sel);
    } else {
      // setOptionsFunction();
    }
  }
  useEffect(() => {
    verifyLogin().then((data) => {
      if (data) {
        setloggedin(true);
        setOptionsFunction();
        // selectedOptionsFunction();
      } else {
        setloggedin(false);
        navigate("/login");
      }
    });
  }, []);
  ///

  ////
  const [loggedin, setloggedin] = useState(false);
  ////////////////////////////////

  getCountryName("IN");
  // this segment details :
  let segment = location.state.segment;

  const [name, setName] = useState(segment.name);

  //

  async function editsegment() {
    let accessToken = localStorage.getItem("accessToken");
  }
  return (
    <>
        {loggedin && <NavbarLogin page  ="segments" />}
      <div className="container mx-auto ">
        <form
          className="w-full lg:w-2/3  mx-auto shadow mx-2 p-4  my-8  md:border rounded  md:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            editsegment();
          }}
        >
          <span className="block text-2xl  my-2 font-semibold">
            Edit this segment{" "}
          </span>

          <div className="my-3 ">
            <label className="block text-sm text-gray-500 ">
              Name of segment
            </label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              className="w-full md:w-3/4  border rounded py-1 px-2  block  "
            />
            {/* {name_errmsg && (
              <span className="text-red-500 block ">{name_errmsg}</span>
            )} */}
          </div>
          <div className="my-3 ">
            <label className="block text-sm text-gray-500 ">Device Type</label>

            <select
              // onChange={(event) => {
              //   handleChange_DEVICE(event);
              // }}
              className="w-full md:w-3/4  border rounded py-1 px-2  block  "
            >
              {/* {deviceType === "" ? (
                <>
                  {" "}
                  <option value="" selected disabled hidden>
                    Choose here
                  </option>
                  <option value="Mobile">Mobile</option>
                  <option value="Tablet">Tablet</option>
                  <option value="Desktop">Desktop</option>
                </>
              ) : (
                <>
                  {" "}
                  <option
                    value="Mobile"
                    selected={`${deviceType === "Mobile" ? true : false}  `}
                  >
                    Mobile
                  </option>{" "}
                  <option
                    value="Desktop"
                    selected={`${deviceType === "Desktop" ? true : false}`}
                  >
                    Desktop
                  </option>
                  <option
                    value="Tablet"
                    selected={`${deviceType === "Tablet" ? true : false}  `}
                  >
                    Tablet
                  </option>
                  <option value="">None</option>
                </>
              )} */}
            </select>
          </div>

          <div className="my-3 ">
            <label className="   ">Countries</label>
            <select
              className="border rounded text-lg  py-1 px-2 mx-2 "
              // onChange={(event) => {
              //   handleChange_EQUAL(event);
              // }}
            >
              <option value="true">is </option>
              <option value="false">is not </option>
            </select>{" "}
            <br />
            <div className="w-full md:w-3/4 mt-2 text-sm lg:text-base">
              <Multiselect
                onSelect={onSelect}
                onRemove={onRemove}
                options={options} // Options to display in the dropdown
                selectedValues={selected} // Preselected value to persist in dropdown
                displayValue="name" // Property name to display in the dropdown options
              />
            </div>
          </div>
          {/* {errmsg && <span className="block text-red-500 my-3 ">{errmsg}</span>} */}
          <button
            type="submit"
            // disabled = {loading}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded py-1 px-2 block duration-100"
          >
            Edit segment
          </button>
        </form>
      </div>
    </>
  );
}
