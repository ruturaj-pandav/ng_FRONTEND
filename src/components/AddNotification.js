import React from "react";
import { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import { useParams, useNavigate } from "react-router-dom";
import Switch from "react-switch";
import { IoIosArrowDropup } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { useLocation } from "react-router-dom";
import chromeicon from "../images/chrome_image.jpeg";
import { FaBatteryFull } from "react-icons/fa";
import { BsWifi } from "react-icons/bs";
import { HiSpeakerWave } from "react-icons/hi2";
import axios from "axios";
import { verifyLogin } from "../helper";
import swal from "sweetalert";
export default function AddNotification() {
  const location = useLocation();
  const website_domain =
    location.state !== null &&
    (location.state.website_domain
      ? location.state.website_domain
      : "example.com");
  const [segments, setsegments] = useState([]);

  //

  const [loading, setLoading] = useState(false);
  const [image, setimage] = useState(null);
  const [imagepath, setimagepath] = useState(null);
  const [imageErrMsg, setimageErrMsg] = useState("");
  ////`

  ////
  const [title, settitle] = useState("");
  const [titleErrMsg, settitleErrMsg] = useState("");

  ///
  const [body_text, setbody_text] = useState("");
  const [body_textErrMsg, setbody_textErrMsg] = useState("");
  ///
  const [showschedule, setshowschedule] = useState(false);
  const [showaddimage, setshowaddimage] = useState(false);
  //////
  const [scheduledate, setscheduledate] = useState("");
  const [scheduletime, setscheduletime] = useState("");
  /////
  const [redirect_urlErrMsg, setredirect_urlErrMsg] = useState("");
  const [segmentErrMsg, setsegmentErrMsg] = useState("");
  const [redirect_url, setredirect_url] = useState("");
  /////

  function allErrorMsgNull() {
    settitleErrMsg("");
    setsegmentErrMsg("");
    setbody_textErrMsg("");
    setredirect_urlErrMsg("");
  }
  function onFileChange(event) {
    // this.setState({ selectedFile: event.target.files[0] });

    setimage(event.target.files[0]);
    setimagepath(URL.createObjectURL(event.target.files[0]));
  }
  const [loggedin, setloggedin] = useState(false);
  let navigate = useNavigate();
  let { website_id } = useParams();
  async function addNotification() {
    setLoading(true);
    allErrorMsgNull();
    let accessToken = localStorage.getItem("accessToken");

    const formData = new FormData();
    formData.append("title", title);
    if (segmentno !== null) {
      formData.append("segment_id", parseInt(segmentno));
    }
    formData.append("body_text", body_text);
    formData.append("website_id", parseInt(website_id));
    formData.append("redirect_url", redirect_url);
    if (scheduledate !== "" && scheduletime !== "") {
      formData.append("schedule_date", scheduledate);

      let timearray = scheduletime.split(" ");
      timearray.push("00");

      formData.append("schedule_time", timearray.join(":"));
    }
    if (image != null) {
      formData.append("image", image);
    }

    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_BASE}/notifications/addNotification`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "content-type": "multipart/form-data",
        },
      }
    );
    if (response.data.status) {
      // when good

      swal(
        "Added ",
        "This notification has been added successfully ",
        "success"
      ).then(() => {
        navigate(`/website/${website_id}/notifications`);
      });
    } else {
      if (
        response.data.status === false &&
        response.data.errorType === "VALIDATION_ERROR"
      ) {
        if (response.data.errors.hasOwnProperty("title")) {
          settitleErrMsg(response.data.errors.title);
        }
        if (response.data.errors.hasOwnProperty("body_text")) {
          setbody_textErrMsg(response.data.errors.body_text);
        }
        if (response.data.errors.hasOwnProperty("redirect_url")) {
          setredirect_urlErrMsg(response.data.errors.redirect_url);
        }
        if (response.data.errors.hasOwnProperty("image")) {
          setimageErrMsg(response.data.errors.image);
        }
        if (response.data.errors.hasOwnProperty("segment_id")) {
          setsegmentErrMsg(response.data.errors.segment_id);
        }
      } else if (
        response.data.status === false &&
        response.data.message !== ""
      ) {
        swal("Something went wrong ", response.data.message, "error");
      }
    }
    setLoading(false);
  }

  async function getsegments() {
    let accessToken = localStorage.getItem("accessToken");

    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_BASE}/segments/listSegments`,
      // `${process.env.BACKEND_URL}/websites/list`,
      { website_id, filter: "all" },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.data.status) {
      setsegments(response.data.segments);
    } else {
      if (response.data.status === false && response.data.message !== "") {
        swal("Something went wrong ", response.data.message, "error").then(
          () => {
            navigate(`/website/${website_id}/notifications`);
          }
        );
      }
    }
  }
  function handleChange_IMAGE_TOGGLE() {
    if (showaddimage) {
      setshowaddimage(false);
      setimage(null);
      setimagepath(null);
    } else {
      setshowaddimage(true);
    }
  }
  function handleChange_SCHEDULE() {
    if (showschedule) {
      setshowschedule(false);
      setscheduledate("");
      setscheduletime("");
    } else {
      setshowschedule(true);
    }
  }
  const [variant, setvariant] = useState(1);
  const [android_preview, set_android_preview] = useState(true);
  function handleChange_PREVIEW() {
    set_android_preview(!android_preview);
  }
  useEffect(() => {
    verifyLogin().then((data) => {
      if (data) {
        // goTo("dashboard");
        setloggedin(true);
        getsegments();
      } else {
        navigate("/login");
      }
    });
  }, []);
  const [segmentno, setsegmentno] = useState(null);
  function handleChange_SEGMENT(event) {
    setsegmentno(event.target.value);
  }
  return (
    <>
      <NavbarComponent loggedin={loggedin} page="notifications" />
      <div className="container-sm ">
        <div className=" grid grid-cols-2 gap-5 w-full  mx-auto">
          <div className="shadow m-3 px-5 py-3 rounded col-span-2 md:col-span-1 ">
            {" "}
            <form
              className=" "
              onSubmit={(e) => {
                e.preventDefault();
                addNotification();
              }}
            >
              <span className="text-3xl block">Add a new notification</span>

              <div className="my-3 ">
                <label className="block text-sm text-gray-500 ">segments</label>
                <select
                  onChange={(event) => {
                    handleChange_SEGMENT(event);
                  }}
                  className="border rounded py-1 px-2  block w-full sm:w-3/4"
                >
                  <option value="" selected disabled hidden>
                    Choose here
                  </option>

                  {segments.map((segment, index) => {
                    return (
                      <option value={segment.id} key={index}>
                        {segment.name}
                      </option>
                    );
                  })}
                </select>{" "}
                <span className="text-red-500 text-sm  mt-2">
                  {segmentErrMsg}
                </span>
                {/* <span className="text-red-500 text-sm  mt-2">{titleErrMsg}</span> */}
              </div>
              <div className="my-3 ">
                <label className="block text-sm text-gray-500 ">Title</label>
                <input
                  className="border rounded py-1 px-2  block w-full sm:w-3/4  "
                  onChange={(e) => {
                    settitle(e.target.value);
                  }}
                />
                <span className="text-red-500 text-sm  mt-2">
                  {titleErrMsg}
                </span>
              </div>
              <div className="my-3 ">
                <label className="block text-sm text-gray-500 ">
                  Body Text
                </label>
                <input
                  className="border rounded py-1 px-2  block w-full sm:w-3/4  "
                  onChange={(e) => {
                    setbody_text(e.target.value);
                  }}
                />{" "}
                <span className="text-red-500 text-sm  mt-2">
                  {body_textErrMsg}
                </span>
              </div>
              <div className="my-3 ">
                <label className="block text-sm text-gray-500 ">
                  {" "}
                  Redirect URL{" "}
                </label>
                <input
                  className="border rounded py-1 px-2  block w-full sm:w-3/4  "
                  onChange={(e) => {
                    setredirect_url(e.target.value);
                  }}
                />{" "}
                <span className="text-red-500 text-sm  mt-2">
                  {redirect_urlErrMsg}
                </span>
              </div>

              <div className="my-3 ">
                <span className="block text-gray-500 ">
                  {" "}
                  Schedule notification
                </span>
                <Switch
                  onChange={handleChange_SCHEDULE}
                  checked={showschedule}
                />

                {showschedule && (
                  <div>
                    <div>
                      <label className="block text-sm text-gray-500 ">
                        date
                      </label>
                      <input
                        onChange={(event) =>
                          setscheduledate(event.target.value)
                        }
                        type="date"
                        max="2024-01-01"
                        className="border rounded py-1 px-2  block w-2/3 sm:w-1/3"
                      />
                    </div>
                    <div className="my-3 ">
                      <label className="block text-sm text-gray-500 ">
                        time
                      </label>
                      <input
                        onChange={(event) => {
                          setscheduletime(event.target.value);
                        }}
                        type="time"
                        className="border rounded py-1 px-2  block w-2/3 sm:w-1/3"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="my-3 ">
                <div className=" inline-block ">
                  <span className="block text-gray-500   ">Add image</span>{" "}
                  <Switch
                    onChange={handleChange_IMAGE_TOGGLE}
                    checked={showaddimage}
                  />
                </div>

                {showaddimage && (
                  <div>
                    <div className="my-2 ">
                      <input type="file" onChange={onFileChange} />
                    </div>
                    <span className="text-red-500 text-sm  block ">
                      {imageErrMsg}
                    </span>
                  </div>
                )}

                {image != null &&
                  (image.type === "image/png" ||
                    image.type === "image/jpeg") && (
                    <img
                      src={imagepath}
                      alt="chosen preview"
                      width={250}
                      className="border rounded py-1 px-2  block w-2/3 sm:w-1/3"
                      height={250}
                    />
                  )}
              </div>
              <button
                type="submit"
                className={` text-white py-1 px-2 block rounded  ${
                  loading
                    ? "hover:bg-blue-400 bg-blue-400 hover:cursor-not-allowed"
                    : "hover:bg-blue-600 bg-blue-500 cursor-pointer"
                }    `}
              >
                {loading ? "Loading,  Please wait ... " : "Add Notification"}
              </button>
            </form>
          </div>
          <div className="shadow m-3 px-4 py-3 rounded col-span-2 md:col-span-1 ">
            <span className="block text-3xl px-2 font-semibold md:text-start text-center">
              Live Preview
            </span>
            <div className="   mx-auto   block shadow-sm-sm my-1 px-2 py-1  md:text-left text-center ">
              <span className="block text-gray-500   ">
                {" "}
                {android_preview === true ? "Android" : "Desktop"}
              </span>{" "}
              <Switch
                onChange={handleChange_PREVIEW}
                checked={android_preview ? true : false}
              />
            </div>
            <div className="p-1  ">
              {android_preview ? (
                <div className=" mobileview flex items-center    w-full h-96  ">
                  {" "}
                  <div
                    className={` mx-auto bg-gray-50  h-fit w-52  sm:w-42 md:w-42 lg:w-60 rounded-3 shadow  px-1 px-1 mx-2 ${
                      imagepath !== null && "mt-12"
                    }`}
                  >
                    <div className="h-1/6  flex justify-between">
                      <div>
                        <img
                          className="inline-block h-3 lg:h-4 w-3 lg:w-4 "
                          src={chromeicon}
                        />
                        <span className="mx-2 text-xs lg:text-sm text-gray-500">
                          {/* mytoolstown.com */}
                          {website_domain}
                        </span>
                        <span className="text-xs text-gray-500">now</span>
                      </div>
                      <div>
                        <span>
                          <IoIosArrowDropup />
                        </span>
                      </div>
                    </div>
                    <div className="h-5/6 pl-8 pr-2 pb-3  ">
                      <span className="block my-1 text-xs lg:text-sm font-semibold ">
                        {title}
                      </span>
                      <span className="block mb-1 text-xs sm:text-sm ">
                        {" "}
                        {body_text}
                      </span>
                      {imagepath !== null && (
                        <img
                          alt="preview of chosen "
                          className="h-16 md:h-20 lg:h-24 mb-0 lg:mb-2 w-full rounded-3 "
                          src={imagepath}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className=" rounded-1">
                  <div className="h-48 bg-gray-100"></div>
                  <div className="bg-gray-100 p-2 flex flex-row-reverse ">
                    {" "}
                    <div className=" h-fit w-72 rounded-3 shadow border ">
                      {imagepath !== null && (
                        <div className="  rounded h-1/2">
                          <img
                            alt="preview of chosen "
                            className="lg:h-32 md:h-28 h-24 w-full rounded-3 "
                            src={imagepath}
                          />
                        </div>
                      )}
                      <div className="h-1/2  rounded-3 bg-gray-50 px-2 py-1">
                        <div className="flex justify-between   p-1">
                          <div>
                            <img
                              className="inline-block h-4 w-4 "
                              src={chromeicon}
                            />
                            <span className="text-sm text-black  mx-2">
                              Google Chrome
                            </span>
                          </div>
                          <div className="flex  items-center ">
                            <span className="mx-3">-</span>
                            <RxCross1 />
                          </div>
                        </div>
                        <div className="grid grid-cols-3">
                          {/* <div className="col-span-1">asdf</div> */}
                          <div className="col-span-3 px-1">
                            <span className="block ">{title}</span>
                            <span className="block  text-xs lg:text-sm text-gray-500">
                              {body_text}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                  <div className=" p-1 bg-gray-50  flex flex-row-reverse">
                    {" "}
                    <div className="block ">
                      <span className="block text-sm mx-2">12:30 PM</span>
                      <span className="block text-sm mx-2">1/12/2023</span>
                    </div>
                    <span className="text-2xl block mx-1.5">
                      <FaBatteryFull />
                    </span>
                    <span className="text-2xl block mx-1.5">
                      <BsWifi />
                    </span>
                    <span className="text-2xl block mx-1.5">
                      <HiSpeakerWave />
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
