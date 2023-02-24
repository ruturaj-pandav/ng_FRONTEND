import React from "react";
import fileDownload from "js-file-download";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import NavbarLogin from "./Navbar_Login";
import { useState, useEffect } from "react";
import { goTo, verifyLogin } from "../helper.js";
import { useNavigate, useParams } from "react-router-dom";
// const { htmlToText } = require("html-to-text");
export default function WebsiteIntegration() {
  let { website_id } = useParams();
  let navigate = useNavigate();
  const [loggedin, setloggedin] = useState(true);
  // const text = htmlToText(
  //   "<div>Nope Its not Ashton Kutcher. It is Kevin Malone. <p>Equally Smart and equally handsome</p></div>",
  //   {
  //     wordwrap: 130,
  //   }
  // );
  let url = `${process.env.REACT_APP_BACKEND_BASE}/js/service-worker.js`;
  async function handleDownload(url, filename) {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  }

  const [text, setText] = useState(
    `<script src="https://example.com/pushnotification.js" async=""></script>`
  );
  const [isCopied, setIsCopied] = useState(false);
  useEffect(() => {
    verifyLogin().then((data) => {
      if (data) {
        setloggedin(true);
        // goTo("dashboard");
      } else {
        setloggedin(false);
        navigate("/login");
      }
    });
  }, []);
  return (
    <>
   {loggedin &&    <NavbarLogin />}
      <div className="container mx-auto ">
        <div className="  px-4 rounded my-3 w-full md:w-2/3 lg:w-1/2 mx-auto  p-2  sm:shadow sm:border-gray-200">
          <span className="text-4xl block my-6 text-gray-500 font-sans">
            Steps
          </span>
          <div className="my-5  ">
            {" "}
            <span className="text-xl font-sans block text-gray-600 ">
              STEP 1
            </span>
            <span className="text-gray-500  my-3   block ">
              Next, you will need to download our service-worker.js file and
              upload it to the top-level root of your site directory.
            </span>
            <button
              className="bg-gray-500 hover:bg-gray-600 duration-300 text-white rounded py-1 px-2"
              onClick={() =>
                handleDownload(
                  `${process.env.REACT_APP_BACKEND_BASE}/js/service-worker.js`,
                  "service-worker.js"
                )
              }
            >
              Download File
            </button>
          </div>
          <div className="my-5">
            <span className="text-xl font-sans  block text-gray-600 ">
              STEP 2
            </span>
            <span className="text-gray-500 my-3   block">
              If you haven't already, add this code to the head . section on all
              pages of your site that users can subscribe to.
            </span>{" "}
            <span
              onClick={() => {
                navigator.clipboard.writeText(text);
              }}
              class="block border-1 border-gray-500 text-sm sm:text-base my-3 rounded bg-gray-100 px-3 py-2 "
            >
              {/* &lt;script src="https://example.com/pushnotification.js" async=""
              &gt; &lt;/script&gt; */}
              {text}
            </span>{" "}
            {isCopied ? (
              <span className="text-green-500 my-3 block ">
                Text copied to clipboard
              </span>
            ) : null}
            <CopyToClipboard
              text={text}
              onCopy={() => {
                setIsCopied(true);
                setTimeout(() => {
                  setIsCopied(false);
                }, 2000);
              }}
            >
              <button className="bg-gray-500 hover:bg-gray-600 duration-300 text-white rounded py-1 px-2">
                Copy Code
              </button>
            </CopyToClipboard>
            <span className="text-lg block">
              <script
                src="https://example.com/pushnotification.js"
                async=""
              ></script>
            </span>
          </div>
          <button
            onClick={() => {
              navigate(`/website/${website_id}`);
            }}
            className="my-3 bg-red-500  text-white rounded py-1 px-2 hover:bg-red-600"
          >
            Back{" "}
          </button>
        </div>
      </div>
    </>
  );
}
