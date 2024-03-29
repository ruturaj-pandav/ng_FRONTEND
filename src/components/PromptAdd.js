import React from "react";
import axios from "axios";
import { verifyLogin } from "../helper";
import swal from "sweetalert";
import NavbarLogin from "./Navbar_Login"
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageTitle from "./PageTitle";
export default function PromptAdd({}) {
  let navigate = useNavigate();
  let { website_id } = useParams();

  let [delay, setdelay] = useState(5);
  let [prompt_type, setPromptType] = useState("SLIDE");
  let [prompt_text, setPromptText] = useState(
    "Subscribe to our push notifications. You can unsubscribe anytime."
  );
  let [btn_2_label, setBtn2Label] = useState("Subscribe");
  let [btn_1_label, setBtn1Label] = useState("Later");
  let [btn_2_label_errmsg, setBtn2LabelErrorMessage] = useState("");
  let [btn_1_label_errmsg, setBtn1LabelErrorMessage] = useState("");
  let [prompt_text_errmsg, setPromptTextErrorMessage] = useState("");
  let [prompt_type_errmsg, setPromptTypeErrorMessage] = useState("");

  function setEveryErrorNull() {
    setBtn2LabelErrorMessage("");
    setBtn1LabelErrorMessage("");
    setPromptTextErrorMessage("");
    setPromptTypeErrorMessage("");
  }
  function setEveryValueNull() {
    setBtn2Label("");
    setBtn1Label("");
    setPromptText("");
    setPromptType("");
  }
  async function addprompts() {
    setLoading(true)
    let accessToken = localStorage.getItem("accessToken");

    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_BASE}/websites/setprompt`,
      // `${process.env.BACKEND_URL}/websites/list`,
      {
        prompt_type,
        prompt_text,
        btn_1_label,
        btn_2_label,
        delay: delay * 1000,
        website_id,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.data.status) {
      // swal("Prompt Added ", "The prompt has been added ", "success");
      swal("Prompt updated ", "New details have been saved ", "success").then(
        (value) => {
          setEveryValueNull();
          navigate(`/website/${website_id}/prompts`);
        }
      );
      setEveryErrorNull();
      setEveryValueNull();

      // getlistprompt();
    } else {
      if (
        response.data.status === false &&
        response.data.errorType === "VALIDATION_ERROR"
      ) {
        setEveryErrorNull();
        if (response.data.errors.hasOwnProperty("prompt_text")) {
          setPromptTextErrorMessage(response.data.errors.prompt_text);
        }
        if (response.data.errors.hasOwnProperty("btn_2_label")) {
          setBtn2LabelErrorMessage(response.data.errors.btn_2_label);
        }
        if (response.data.errors.hasOwnProperty("btn_1_label")) {
          setBtn1LabelErrorMessage(response.data.errors.btn_1_label);
        }
        if (response.data.errors.hasOwnProperty("prompt_type")) {
          setPromptTypeErrorMessage(response.data.errors.prompt_type);
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
  const [loggedin, setloggedin] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    verifyLogin().then((data) => {
      if (data) {
        setloggedin(true);
        // goTo("dashboard");
      } else {
        navigate("/login");
      }
    });
  }, []);
  return (
    <> <PageTitle  title="Create prompt"/>
       {loggedin && <NavbarLogin page  ="prompts" />}
      <div className="container mx-auto grid grid-cols-2 sm:gap-4  my-8  ">
        <div className=" col-span-2  md:col-span-2 lg:col-span-1">
          {" "}
          <h1 className=" text-2xl block font-medium">
            Permission Prompt Setup
          </h1>
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border-black "
            onSubmit={(e) => {
              e.preventDefault();
              this.addprompts();
            }}
          >
            <div className="my-3">
              <label className="text-dark-800 font-medium block my-2 font-sans  ">
                Prompt Type
              </label>
              <select className="border rounded block py-1 px-2 w-full ">
                <option>Slide</option>
              </select>{" "}
              <span className="text-sm text-red-500 block  my-1 ">
                {prompt_type_errmsg}
              </span>
            </div>
            <div className="my-3">
              <label className="text-dark-800 font-medium block my-2 font-sans  ">
                Prompt Text
              </label>
              <input
                className="border rounded  block py-1 px-2  w-full"
                placeholder="Type here"
                value={prompt_text}
                maxlength="120"
                onChange={(e) => {
                  setPromptText(e.target.value);
                }}
              />{" "}
              <span className="text-sm text-red-500 block  my-1 ">
                {prompt_text_errmsg}
              </span>{" "}
              {prompt_text.length === 120 && (
                <span className="text-xs text-red-500 block  my-1 ">
                  You have reached maximum characters limit. 120/120
                </span>
              )}
            </div>
            <div className="my-3">
              <label className="text-dark-800 font-medium	 block my-1   ">
                Cancel Button Label
              </label>
              <input
                className="border rounded  block py-1 px-2  w-full"
                placeholder="enter value here "
                value={btn_1_label}
                maxlength="15"
                onChange={(e) => {
                  setBtn1Label(e.target.value);
                }}
              />
              <span className="text-sm text-red-500 block  my-1 ">
                {btn_1_label_errmsg}
              </span>
              {btn_1_label.length === 15 && (
                <span className="text-xs text-red-500 block  my-1 ">
                  You have reached maximum characters limit. 15/15
                </span>
              )}
            </div>
            <div className="my-3">
              <label className="text-dark font-medium block my-2 font-sans   ">
                Subscribe Button Label
              </label>
              <input
                value={btn_2_label}
                maxlength="15"
                className="border rounded  block py-1 px-2   w-full"
                placeholder="enter value here "
                onChange={(e) => {
                  setBtn2Label(e.target.value);
                }}
              />{" "}
              <span className="text-sm text-red-500 block  my-1 ">
                {btn_2_label_errmsg}
              </span>{" "}
              {btn_2_label.length === 15 && (
                <span className="text-xs text-red-500 block  my-1 ">
                  You have reached maximum characters limit. 15/15
                </span>
              )}
            </div>
            <div className="my-3">
              <label className="text-dark-800 font-medium block my-2 font-sans text-sm ">
                Set Delay :{" "}
                <span className="bg-lime-500 rounded border-2 border-black p-1 text-gray-800">
                  {delay} seconds
                </span>
              </label>
              <input
                min="0"
                max="120"
                step={1}
                value={delay}
                onChange={(e) => {
                  setdelay(e.target.value);
                }}
                type="range"
                className="border rounded  block    w-full "
              />
            </div>
            <center>
              <button
                type="submit"
                disabled ={loading}
                onClick={() => {
                  addprompts();
                }}
                className={`text-white ${
                  loading
                    ? "hover:bg-blue-400 bg-blue-400 hover:cursor-not-allowed"
                    : "hover:bg-blue-600 bg-blue-500 cursor-pointer"
                }   rounded py-1 px-2 my-2  `}
              >
                {loading ? "Loading,  Please wait ... " : "Add Prompt"}
              </button>
            </center>
          </form>
        </div>
        <div className="grid col-span-2 sm:col-span-1  md:col-span-2 lg:col-span-1   ">
          <div>
            {" "}
            <div
              className=" w-full  sm:w-2/3 mx-auto px-4 rounded py-4 border-2 "
              id="pushpromptcard"
            >
              <div className="grid grid-cols-4 ">
                <div className=" ">
                  {" "}
                  <svg
                    class="bellicon"
                    width="60"
                    height="60"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.1336 11C18.7155 16.3755 21 18 21 18H3C3 18 6 15.8667 6 8.4C6 6.70261 6.63214 5.07475 7.75736 3.87452C8.88258 2.67428 10.4087 2 12 2C12.3373 2 12.6717 2.0303 13 2.08949"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M19 8C20.6569 8 22 6.65685 22 5C22 3.34315 20.6569 2 19 2C17.3431 2 16 3.34315 16 5C16 6.65685 17.3431 8 19 8Z"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div className="  col-span-3  break-words">
                  {prompt_text ? prompt_text : " "}
                </div>
              </div>
              <div className="flex flex-row-reverse my-2">
                {btn_2_label !== "" && (
                  <span
                    class="bg-blue-600 mx-1  text-white py-2 px-3 rounded "
                    id="pushsubscribebtn"
                  >
                    {btn_2_label}
                  </span>
                )}{" "}
                {btn_1_label !== "" && (
                  <span
                    class="py-2 px-2 mx-1  rounded-1  text-blue-600 "
                    id="pushsubscribebtn"
                  >
                    {btn_1_label}
                  </span>
                )}
              </div>
              {/* <div class="icon-message">
                <svg
                  class="bellicon"
                  width="60"
                  height="60"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.1336 11C18.7155 16.3755 21 18 21 18H3C3 18 6 15.8667 6 8.4C6 6.70261 6.63214 5.07475 7.75736 3.87452C8.88258 2.67428 10.4087 2 12 2C12.3373 2 12.6717 2.0303 13 2.08949"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M19 8C20.6569 8 22 6.65685 22 5C22 3.34315 20.6569 2 19 2C17.3431 2 16 3.34315 16 5C16 6.65685 17.3431 8 19 8Z"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p className="mt-3">{prompt_text ? prompt_text : " "}</p>
              </div> */}
              <div class="buttons"></div>
            </div>
          </div>
          <div>
            <div
              className=" sm:mx-12  mt-10 bg-blue-100 border-t-4 border-blue-500 rounded-b text-teal-900 px-1 sm:px-4 py-3 shadow-md"
              role="alert"
            >
              <div className="flex">
                <div className="py-1">
                  <svg
                    className="fill-current h-6 w-6 text-blue-500 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">Why is Prompt Needed?</p>
                  <ul className="list-disc text-base">
                    <li className="m-2">
                      Prompt is a simple modal that appears on your website,
                      allowing users to subscribe to notifications or cancel
                      them. Using the prompt settings, you can configure the
                      prompt text, button labels, and other elements.
                    </li>
                    <li className="m-2">
                      if the user clicks the "block" button on the default
                      browser prompt, your web app will not be able to ask the
                      user for permission again. To overcome this limitation, we
                      have implemented a fake prompt that allows us to request
                      permission for notifications as many times as necessary.
                    </li>
                    <li className="m-2">
                      The delay in the prompt setup determines how many seconds
                      after the page loads that the prompt will appear on the
                      website.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="grid grid-flow-row sm:grid-flow-col gap-0">
        <div className="my-8 ml-24 col-span-1">
          <h1 className="text-2xl block font-medium">
            Permission Prompt Setup
          </h1>
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border-black"
            onSubmit={(e) => {
              e.preventDefault();
              this.addprompts();
            }}
          >
            <div className="my-3">
              <label className="text-dark-800 font-medium block my-2 font-sans  ">
                Prompt Type
              </label>
              <select className="border rounded block py-1 px-2 w-full ">
                <option>Slide</option>
              </select>{" "}
              <span className="text-sm text-red-500 block  my-1 ">
                {prompt_type_errmsg}
              </span>
            </div>
            <div className="my-3">
              <label className="text-dark-800 font-medium block my-2 font-sans  ">
                Prompt Text
              </label>
              <input
                className="border rounded  block py-1 px-2  w-full"
                placeholder="Type here"
                value={prompt_text}
                onChange={(e) => {
                  setPromptText(e.target.value);
                }}
              />{" "}
              <span className="text-sm text-red-500 block  my-1 ">
                {prompt_text_errmsg}
              </span>
            </div>
            <div className="my-3">
              <label className="text-dark-800 font-medium	 block my-1   ">
                Later Button Label
              </label>
              <input
                className="border rounded  block py-1 px-2  w-full"
                placeholder="enter value here "
                value={btn_1_label}
                onChange={(e) => {
                  setBtn1Label(e.target.value);
                }}
              />
              <span className="text-sm text-red-500 block  my-1 ">
                {btn_1_label_errmsg}
              </span>
            </div>
            <div className="my-3">
              <label className="text-dark font-medium block my-2 font-sans   ">
                Subscribe Button Label
              </label>
              <input
                value={btn_2_label}
                className="border rounded  block py-1 px-2   w-full"
                placeholder="enter value here "
                onChange={(e) => {
                  setBtn2Label(e.target.value);
                }}
              />{" "}
              <span className="text-sm text-red-500 block  my-1 ">
                {btn_2_label_errmsg}
              </span>
            </div>
            <div className="my-3">
              <label className="text-dark-800 font-medium block my-2 font-sans text-sm ">
                Set Delay :{" "}
                <span className="bg-lime-500 rounded border-2 border-black p-1 text-gray-800">
                  {delay} seconds
                </span>
              </label>
              <input
                min="0"
                max="120"
                step={1}
                value={delay}
                onChange={(e) => {
                  setdelay(e.target.value);
                }}
                type="range"
                className="border rounded  block    w-full "
              />
            </div>
            <center>
              <button
                type="submit"
                onClick={() => {
                  addprompts();
                }}
                className="text-white bg-blue-500 hover:bg-blue-600 rounded py-1 px-2 my-2 "
              >
                ADD PROMPT
              </button>
            </center>
          </form>
        </div>{" "}
        <div className="col-span-1 hidden lg:block">
          <div className="my-5">
            <div className="prompt-card border-2" id="pushpromptcard">
              <div class="icon-message">
                <svg
                  class="bellicon"
                  width="60"
                  height="60"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.1336 11C18.7155 16.3755 21 18 21 18H3C3 18 6 15.8667 6 8.4C6 6.70261 6.63214 5.07475 7.75736 3.87452C8.88258 2.67428 10.4087 2 12 2C12.3373 2 12.6717 2.0303 13 2.08949"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M19 8C20.6569 8 22 6.65685 22 5C22 3.34315 20.6569 2 19 2C17.3431 2 16 3.34315 16 5C16 6.65685 17.3431 8 19 8Z"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p className="mt-3">{prompt_text ? prompt_text : " "}</p>
              </div>
              <div class="buttons">
                <button class="allow-button" id="pushsubscribebtn">
                  {btn_2_label ? btn_2_label : " "}
                </button>
                <span class="reject-button" id="pushlaterbtn">
                  {btn_1_label ? btn_1_label : " "}
                </span>
              </div>
            </div>

            <div
              className="mx-24  mt-20 bg-blue-100 border-t-4 border-blue-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
              role="alert"
            >
              <div className="flex">
                <div className="py-1">
                  <svg
                    className="fill-current h-6 w-6 text-blue-500 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">Why is Prompt Needed?</p>
                  <ul className="list-disc text-base">
                    <li className="m-2">
                      Prompt is a simple modal that appears on your website,
                      allowing users to subscribe to notifications or cancel
                      them. Using the prompt settings, you can configure the
                      prompt text, button labels, and other elements.
                    </li>
                    <li className="m-2">
                      if the user clicks the "block" button on the default
                      browser prompt, your web app will not be able to ask the
                      user for permission again. To overcome this limitation, we
                      have implemented a fake prompt that allows us to request
                      permission for notifications as many times as necessary.
                    </li>
                    <li className="m-2">
                      The delay in the prompt setup determines how many seconds
                      after the page loads that the prompt will appear on the
                      website.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
