import React from "react";
import { useState, useEffect } from "react";
import NavbarLogin from "./Navbar_Login";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { IoIosArrowDropup } from "react-icons/io";
import { FaBatteryFull } from "react-icons/fa";
import { BsWifi } from "react-icons/bs";
import { HiSpeakerWave } from "react-icons/hi2";
import { verifyLogin } from "../helper";
import Switch from "react-switch";
import swal from "sweetalert";
import chromeicon from "../images/chrome_image.jpeg";
import mobile_view_backend from "../images/mobile_view_backend.png";
import PageTitle from "./PageTitle";
export default function AddABTest() {
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
  const location = useLocation();

  const website_domain =
    location.state !== null &&
    (location.state.website_domain
      ? location.state.website_domain
      : "example.com");
  const [loading, setLoading] = useState(false);

  const [variant, setvariant] = useState(1);
  const [android_preview, set_android_preview] = useState(true);
  const [segmentno, setsegmentno] = useState(null);
  const [segmentnoErrMsg, setsegmentnoErrMsg] = useState(null);
  function handleChange_SEGMENT(event) {
    console.log(
      "this is event.target.value in ab test  : ",
      event.target.value
    );
    if (event.target.value === "Remove") {
      setsegmentno(null);
    } else {
      console.log("setting : ", event.target.value);
      setsegmentno(event.target.value);
    }
    console.log("now segmentno : ", segmentno);
  }
  // function handleChange_VARIANT() {
  //   if (variant === 1) {
  //     setvariant(2);
  //   } else {
  //     setvariant(1);
  //   }
  // }
  //////////
  function allErrorMsg1Null() {
    settitle1ErrMsg("");
    setbody_text1ErrMsg("");
    setredirect_url1ErrMsg("");
    setimage1ErrMsg("");
  }
  function allErrorMsg2Null() {
    settitle2ErrMsg("");
    setbody_text2ErrMsg("");
    setredirect_url2ErrMsg("");
    setimage2ErrMsg("");
  }
  async function createAB() {
    setLoading(true);
    allErrorMsg1Null();
    allErrorMsg2Null();
    // allErrorMsgNull();
    let accessToken = localStorage.getItem("accessToken");

    const formData = new FormData();
    formData.append("title_1", title1);
    formData.append("title_2", title2);
    formData.append("body_text_1", body_text1);
    formData.append("body_text_2", body_text2);

    formData.append("website_id", parseInt(website_id));
    formData.append("redirect_url_2", redirect_url2);
    formData.append("redirect_url_1", redirect_url1);
    if (segmentno !== null) {
      formData.append("segment_id", segmentno);
    }
    if (scheduledate !== "" && scheduletime !== "") {
      formData.append("schedule_date", scheduledate);

      let timearray = scheduletime.split(" ");
      timearray.push("00");

      formData.append("schedule_time", timearray.join(":"));
    }
    if (image1 != null) {
      formData.append("image_1", image1);
    }
    if (image2 != null) {
      formData.append("image_2", image2);
    }

    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_BASE}/abtests/addTest`,
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
        navigate(`/website/${website_id}/ab`);
      });
    } else {
      if (
        response.data.status === false &&
        response.data.errorType === "VALIDATION_ERROR"
      ) {
        if (response.data.errors.hasOwnProperty("title_1")) {
          setvariant(1);
          settitle1ErrMsg(response.data.errors.title_1);
        }
        if (response.data.errors.hasOwnProperty("title_2")) {
          setvariant(2);
          settitle2ErrMsg(response.data.errors.title_2);
        }
        if (response.data.errors.hasOwnProperty("body_text_1")) {
          setvariant(1);
          setbody_text1ErrMsg(response.data.errors.body_text_1);
        }
        if (response.data.errors.hasOwnProperty("body_text_2")) {
          setvariant(2);
          setbody_text2ErrMsg(response.data.errors.body_text_2);
        }

        if (response.data.errors.hasOwnProperty("redirect_url_2")) {
          setvariant(2);
          setredirect_url2ErrMsg(response.data.errors.redirect_url_2);
        }
        if (response.data.errors.hasOwnProperty("redirect_url_1")) {
          setvariant(1);
          setredirect_url1ErrMsg(response.data.errors.redirect_url_1);
        }
        if (response.data.errors.hasOwnProperty("image_2")) {
          setvariant(2);
          setimage2ErrMsg(response.data.errors.image_2);
        }
        if (response.data.errors.hasOwnProperty("image_1")) {
          setvariant(1);

          setimage1ErrMsg(response.data.errors.image_1);
        }
        if (response.data.errors.hasOwnProperty("segment_id")) {
          setsegmentnoErrMsg(response.data.errors.segment_id);
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
  ///////////////
  const [loggedin, setloggedin] = useState(false);
  let navigate = useNavigate();
  let { website_id } = useParams();
  ///////////////////////////
  const [showschedule, setshowschedule] = useState(false);

  //////
  const [scheduledate, setscheduledate] = useState("");
  const [scheduletime, setscheduletime] = useState("");
  //////
  function onFileChange1(event) {
    // this.setState({ selectedFile: event.target.files[0] });

    setimage1(event.target.files[0]);
    setimage1path(URL.createObjectURL(event.target.files[0]));
  }
  ////
  function onFileChange2(event) {
    // this.setState({ selectedFile: event.target.files[0] });

    setimage2(event.target.files[0]);
    setimage2path(URL.createObjectURL(event.target.files[0]));
  }
  ////
  const [image1, setimage1] = useState(null);
  const [image1path, setimage1path] = useState(null);
  const [image1ErrMsg, setimage1ErrMsg] = useState("");
  const [image2, setimage2] = useState(null);
  const [image2path, setimage2path] = useState(null);
  const [image2ErrMsg, setimage2ErrMsg] = useState("");
  ////
  const [showaddimage1, setshowaddimage1] = useState(false);
  const [showaddimage2, setshowaddimage2] = useState(false);
  const [title1, settitle1] = useState("");
  const [title1ErrMsg, settitle1ErrMsg] = useState("");
  const [title2, settitle2] = useState("");
  const [title2ErrMsg, settitle2ErrMsg] = useState("");
  ////////////////////////////////
  const [body_text1, setbody_text1] = useState("");
  const [body_text1ErrMsg, setbody_text1ErrMsg] = useState("");
  const [body_text2, setbody_text2] = useState("");
  const [body_text2ErrMsg, setbody_text2ErrMsg] = useState("");
  ////
  const [redirect_url1ErrMsg, setredirect_url1ErrMsg] = useState("");
  const [redirect_url1, setredirect_url1] = useState("");
  const [redirect_url2ErrMsg, setredirect_url2ErrMsg] = useState("");
  const [redirect_url2, setredirect_url2] = useState("");
  ///
  // handleChange_IMAGE_TOGGLE_1
  function handleChange_IMAGE_TOGGLE_1() {
    if (showaddimage1) {
      setshowaddimage1(false);
      setimage1(null);
      setimage1path(null);
    } else {
      setshowaddimage1(true);
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
  function handleChange_PREVIEW() {
    set_android_preview(!android_preview);
  }

  function handleChange_IMAGE_TOGGLE_2() {
    if (showaddimage2) {
      setshowaddimage2(false);
      setimage2(null);
      setimage2path(null);
    } else {
      setshowaddimage2(true);
    }
  }
  //
  const [segments, setsegments] = useState([]);
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

  return (
    <>
      {" "}
      <PageTitle title="Add A/B" />
      {loggedin && <NavbarLogin page="prompts" />}
      <div className="container">
        {" "}
        <div className="  md:w-full   block  my-3 p-3  mx-2">
          <span className="block text-gray-500  text-lg my-2 ">Variant {variant}</span>{" "}
          <div className="flex">
            <button
              onClick={() => {
                setvariant(1);
              }}
              className={` ${
                variant === 1 &&
                "  bg-blue-500 px-2 py-1 text-white"
              }    font-semibold border-l border-t border-b text-blue-500  border-blue-500 px-2`}
            >
              Button 1
            </button>
            <button
              onClick={() => {
                setvariant(2);
              }}
              className={` ${
                variant === 2 &&
                "  bg-blue-500 px-2 py-1 text-white"
              } font-semibold border-r border-t border-b text-blue-500  border-blue-500 px-2 `}
            >
              Button 2
            </button>
          </div>
          {/* <Switch
            onChange={handleChange_VARIANT}
            checked={variant === 2 ? true : false}
          /> */}
        </div>
        <div className="  grid grid-cols-2   ">
          <div className="col-span-2 md:col-span-1  shadow-sm mx-2 px-0 sm:px-3 my-4  rounded-2">
            {variant === 1 ? (
              <form className="w-5/6 md:w-3/4  mx-auto  my-8  ">
                <span className="text-3xl block">Variant 1 details </span>

                <div className="my-3 ">
                  <label className="block text-sm text-gray-500 ">Title</label>
                  <input
                    value={title1}
                    className="border rounded py-1 px-2 block w-5/6 md:w-3/4 "
                    onChange={(e) => {
                      settitle1(e.target.value);
                    }}
                  />
                  <span className="text-red-500 text-sm  mt-2">
                    {title1ErrMsg}
                  </span>
                </div>
                <div className="my-3 ">
                  <label className="block text-sm text-gray-500 ">
                    Body Text
                  </label>
                  <input
                    value={body_text1}
                    className="border rounded py-1 px-2 block w-5/6 md:w-3/4 "
                    onChange={(e) => {
                      setbody_text1(e.target.value);
                    }}
                  />{" "}
                  <span className="text-red-500 text-sm  mt-2">
                    {body_text1ErrMsg}
                  </span>
                </div>
                <div className="my-3 ">
                  <label className="block text-sm text-gray-500 ">
                    {" "}
                    Redirect URL{" "}
                  </label>
                  <input
                    value={redirect_url1}
                    className="border rounded py-1 px-2 block w-5/6 md:w-3/4 "
                    onChange={(e) => {
                      setredirect_url1(e.target.value);
                    }}
                  />{" "}
                  <span className="text-red-500 text-sm  mt-2">
                    {redirect_url1ErrMsg}
                  </span>
                </div>

                <div className="my-3 ">
                  <div className=" inline-block ">
                    <span className="block text-gray-500   ">Add image</span>{" "}
                    <Switch
                      onChange={handleChange_IMAGE_TOGGLE_1}
                      checked={showaddimage1}
                    />
                  </div>

                  {showaddimage1 && (
                    <div>
                      <div className="my-2 ">
                        <input type="file" onChange={onFileChange1} />
                      </div>
                      <span className="text-red-500 text-sm  block ">
                        {image1ErrMsg}
                      </span>
                    </div>
                  )}

                  {image1 != null &&
                    (image1.type === "image/png" ||
                      image1.type === "image/jpeg") && (
                      <img
                        src={image1path}
                        alt="chosen preview"
                        width={250}
                        className="border rounded py-1 px-2  block w-2/3 sm:w-1/3"
                        height={250}
                      />
                    )}
                </div>
              </form>
            ) : (
              <form className="w-5/6 md:w-3/4  mx-auto  my-8   ">
                <span className="text-3xl block">Variant 2 details </span>

                <div className="my-3 ">
                  <label className="block text-sm text-gray-500 ">Title </label>
                  <input
                    value={title2}
                    className="border rounded py-1 px-2 block w-5/6 md:w-3/4 "
                    onChange={(e) => {
                      settitle2(e.target.value);
                    }}
                  />
                  <span className="text-red-500 text-sm  mt-2">
                    {title2ErrMsg}
                  </span>
                </div>
                <div className="my-3 ">
                  <label className="block text-sm text-gray-500 ">
                    Body Text
                  </label>
                  <input
                    value={body_text2}
                    className="border rounded py-1 px-2 block w-5/6 md:w-3/4 "
                    onChange={(e) => {
                      setbody_text2(e.target.value);
                    }}
                  />{" "}
                  <span className="text-red-500 text-sm  mt-2">
                    {body_text2ErrMsg}
                  </span>
                </div>
                <div className="my-3 ">
                  <label className="block text-sm text-gray-500 ">
                    {" "}
                    Redirect URL{" "}
                  </label>
                  <input
                    value={redirect_url2}
                    className="border rounded py-1 px-2 block w-5/6 md:w-3/4 "
                    onChange={(e) => {
                      setredirect_url2(e.target.value);
                    }}
                  />{" "}
                  <span className="text-red-500 text-sm  mt-2">
                    {redirect_url2ErrMsg}
                  </span>
                </div>

                <div className="my-3 ">
                  <div className=" inline-block ">
                    <span className="block text-gray-500   ">Add image</span>{" "}
                    <Switch
                      onChange={handleChange_IMAGE_TOGGLE_2}
                      checked={showaddimage2}
                    />
                  </div>

                  {showaddimage2 && (
                    <div>
                      <div className="my-2 ">
                        <input type="file" onChange={onFileChange2} />
                      </div>
                      <span className="text-red-500 text-sm  block ">
                        {image2ErrMsg}
                      </span>
                    </div>
                  )}

                  {image2 != null &&
                    (image2.type === "image/png" ||
                      image2.type === "image/jpeg") && (
                      <img
                        src={image2path}
                        alt="chosen preview"
                        width={250}
                        className="border rounded py-1 px-2  block w-2/3 sm:w-1/3"
                        height={250}
                      />
                    )}
                </div>
              </form>
            )}
          </div>
          <div className="col-span-2 rounded-2 md:col-span-1    mx-2 px-0 sm:px-3 my-4 shadow-sm  sm:shadow-none">
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
                <div className=" mobileview flex items-center   w-full h-96 py-3 ">
                  {" "}
                  <div className=" mx-auto bg-gray-50  h-fit w-52 sm:w-42 md:w-42 lg:w-80 rounded-3 shadow mt-5  px-2 py-2 ">
                    <div className="h-1/6  flex justify-between">
                      <div>
                        <img
                          className="inline-block h-3 lg:h-4 w-3 lg:w-4 "
                          src={chromeicon}
                        />
                        <span className="mx-2 text-xs lg:text-sm  text-gray-500">
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
                        {variant === 1 ? title1 : title2}
                      </span>
                      <span className="block my-1 text-xs lg:text-sm ">
                        {" "}
                        {variant === 1 ? body_text1 : body_text2}
                      </span>{" "}
                      {variant === 1 && image1path !== null && (
                        <img
                          alt="preview of chosen "
                          className="h-16 md:h-20 lg:h-24 mb-0 lg:mb-2 w-full rounded-3 "
                          src={image1path}
                        />
                      )}
                      {variant === 2 && image2path !== null && (
                        <img
                          alt="preview of chosen "
                          className="h-16 md:h-20 lg:h-24 mb-0 lg:mb-2 w-full rounded-3 "
                          src={image2path}
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
                      <div className="  rounded h-1/2">
                        {variant === 2 && image2path !== null && (
                          <img
                            alt="preview of chosen "
                            className="lg:h-32 md:h-28 h-24 w-full rounded-3 "
                            src={image2path}
                          />
                        )}
                        {variant === 1 && image1path !== null && (
                          <img
                            alt="preview of chosen "
                            className="lg:h-32 md:h-28 h-24 w-full rounded-3 "
                            src={image1path}
                          />
                        )}
                      </div>
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
                        <div className="grid grid-cols-3  px-2 ">
                          {/* <div className="col-span-1">asdf</div> */}
                          <div className="col-span-3">
                            <span className="block ">
                              {variant === 1 ? title1 : title2}
                            </span>
                            <span className="block  text-xs lg:text-sm text-gray-500">
                              {variant === 1 ? body_text1 : body_text2}
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
          </div>{" "}
        </div>{" "}
        <div className="shadow-sm shadow-cyan-500/50  p-3 mx-2 w-1/2 ">
          <div className="my-3 ">
            <label className="block text-sm text-gray-500 capitalize">
              Segments
            </label>
            <select
              onChange={(event) => {
                handleChange_SEGMENT(event);
              }}
              className="border rounded py-1 px-2  block w-2/3 sm:w-1/3 "
            >
              {segmentno === null && (
                <option value="" selected disabled hidden>
                  Choose here
                </option>
              )}
              {segments.map((segment, index) => {
                return (
                  <option value={segment.id} key={index}>
                    {segment.name}
                  </option>
                );
              })}{" "}
              {segmentno !== null && (
                <option value={null} className="bg-gray-500 py-3">
                  Remove
                </option>
              )}
            </select>{" "}
            <span className="text-red-500 text-sm  mt-2">
              {segmentnoErrMsg}
            </span>
            {/* <span className="text-red-500 text-sm  mt-2">{titleErrMsg}</span> */}
          </div>
          <div className="  ">
            <span className="block text-gray-500 mb-2">
              {" "}
              Schedule notification
            </span>
            <Switch onChange={handleChange_SCHEDULE} checked={showschedule} />

            {showschedule && (
              <div>
                <div>
                  <label className="block text-sm text-gray-500 ">date</label>
                  <input
                    onChange={(event) => setscheduledate(event.target.value)}
                    type="date"
                    max="2024-01-01"
                    className="border rounded py-1 px-2  block w-2/3 sm:w-1/3"
                  />
                </div>
                <div className="my-3 ">
                  <label className="block text-sm text-gray-500 ">time</label>
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
        </div>
        <div className="my-3 mx-2 ">
          {" "}
          <button
            disabled={loading}
            onClick={() => {
              createAB();
            }}
            type="submit"
            className={`text-white py-1 px-2 block rounded ${
              loading
                ? "hover:bg-blue-400 bg-blue-400 hover:cursor-not-allowed"
                : "hover:bg-blue-600 bg-blue-500 cursor-pointer"
            }   `}
          >
            {loading ? "Loading..." : "Add ab test"}
          </button>
        </div>
      </div>
    </>
  );
}
