import { useState } from "react";
import { goTo, logoutFunction } from "../helper.js";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import zomato from "../images/logo.png";
export default function NavbarLogin({ page }) {
  let navigate = useNavigate();
  let { website_id } = useParams();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [openAB, setOpenAB] = useState(false);
  const [openSegment, setOpenSegment] = useState(false);
  const [openPrompt, setOpenPrompt] = useState(false);
  const handleOpenNavigation = () => {
    setOpenNavigation(!openNavigation);
    setOpenAB(false);

    setOpenPrompt(false);
    setOpenSegment(false);
  };
  const handleOpenAB = () => {
    setOpenAB(!openAB);
    setOpenNavigation(false);
    setOpenPrompt(false);
    setOpenSegment(false);
  };
  const handleOpenPrompt = () => {
    setOpenPrompt(!openPrompt);
    setOpenAB(false);
    setOpenNavigation(false);

    setOpenSegment(false);
  };
  const handleOpenSegment = () => {
    setOpenSegment(!openSegment);
    setOpenPrompt(false);
    setOpenAB(false);
    setOpenNavigation(false);
  };
  const [open, setopen] = useState(false);
  const [showitems, setshowitems] = useState(false);
  const [showcontent, setshowcontent] = useState(false);
  return (
    <div>
      {" "}
      <nav className="flex justify-between  p-3  bg-black ">
        <div className=" flex  flex-start">
          <div className="inline-block ">
            <img
              src={zomato}
              className="h-12 w-18"
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
          <div className="mx-8  justify-center items-center hidden md:flex">
            <span
              onClick={() => {
                navigate(`/dashboard`);
              }}
              className=" mx-3 text-white  hover:text-gray-400 cursor-pointer duration-300"
            >
              Your websites
            </span>
            {page !== "your_websites" && (
              <div className=" flex  mx-16 ">
                <div className="mx-4 text-white ">
                  <button onClick={handleOpenNavigation}>
                    Notification{" "}
                    <ion-icon
                      name="chevron-down-outline"
                      className="my-3 block "
                    ></ion-icon>
                  </button>
                  {openNavigation ? (
                    <ul className="menu">
                      <li
                        onClick={() => {
                          navigate(`/website/${website_id}/notification/add`);
                        }}
                        className="menu-item my-2 hover:bg-gray-900 hover:px-3 hover:py-1 duration-200 cursor-pointer  "
                      >
                        Create Notification
                      </li>
                      <li
                        onClick={() => {
                          navigate(`/website/${website_id}/notifications`);
                        }}
                        className="menu-item my-2 hover:bg-gray-900 hover:px-3 hover:py-1 duration-200 cursor-pointer  "
                      >
                        List Notification
                      </li>
                    </ul>
                  ) : null}
                </div>
                <div className="mx-4 text-white ">
                  <button onClick={handleOpenSegment}>
                    Segments{" "}
                    <ion-icon
                      name="chevron-down-outline"
                      className="my-3 block "
                    ></ion-icon>
                  </button>
                  {openSegment ? (
                    <ul className="menu">
                      <li
                        onClick={() => {
                          navigate(`/website/${website_id}/segments/add`);
                        }}
                        className="menu-item my-2 hover:bg-gray-900 hover:px-3 hover:py-1 duration-200 cursor-pointer  "
                      >
                        Create segment
                      </li>
                      <li
                        onClick={() => {
                          navigate(`/website/${website_id}/segments`);
                        }}
                        className="menu-item my-2 hover:bg-gray-900 hover:px-3 hover:py-1 duration-200 cursor-pointer  "
                      >
                        List segment
                      </li>
                    </ul>
                  ) : null}
                </div>
                <div className="mx-4 text-white ">
                  <button onClick={handleOpenPrompt}>
                    Prompts{" "}
                    <ion-icon
                      name="chevron-down-outline"
                      className="my-3 block "
                    ></ion-icon>
                  </button>
                  {openPrompt ? (
                    <ul className="menu">
                      <li
                        className="menu-item my-2 hover:bg-gray-900 hover:px-3 hover:py-1 duration-200 cursor-pointer  "
                        onClick={() => {
                          navigate(`/website/${website_id}/prompts/add`);
                        }}
                      >
                        Create Prompt
                      </li>
                      <li
                        className="menu-item my-2 hover:bg-gray-900 hover:px-3 hover:py-1 duration-200 cursor-pointer  "
                        onClick={() => {
                          navigate(`/website/${website_id}/prompts`);
                        }}
                      >
                        List prompt
                      </li>
                    </ul>
                  ) : null}
                </div>
                <div className="mx-4 text-white z-10 ">
                  <button onClick={handleOpenAB}>
                    A/B{" "}
                    <ion-icon
                      name="chevron-down-outline"
                      className="my-3 block "
                    ></ion-icon>
                  </button>
                  {openAB ? (
                    <ul className="menu z-10">
                      <li
                        onClick={() => {
                          navigate(`/website/${website_id}/ab/add`);
                        }}
                        className="menu-item my-2 hover:bg-gray-900 hover:px-3 hover:py-1 duration-200 cursor-pointer  "
                      >
                        Create A/B
                      </li>
                      <li
                        className="menu-item my-2 hover:bg-gray-900 hover:px-3 hover:py-1 duration-200 cursor-pointer "
                        onClick={() => {
                          navigate(`/website/${website_id}/ab`);
                        }}
                      >
                        List A/B
                      </li>
                    </ul>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className=" flex justify-center items-center ">
          <div className=" hidden md:block  ">
            <button
              onClick={() => {
                navigate(`/profile`);
              }}
              className="bg-green-500 hover:bg-green-400 rounded-1  mx-1 px-4 py-1 text-lg "
            >
              Profile
            </button>
            <button
              onClick={() => {
                swal({
                  title: "Confirm Logout ?",

                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                }).then((logout) => {
                  if (logout) {
                    logoutFunction();
                  }
                });
              }}
              className="bg-red-500 hover:bg-red-400 rounded-1 text-white mx-1  px-4 py-1 text-lg "
            >
              Logout
            </button>
          </div>

          <div className="block md:hidden">
            <span className="text-3xl block text-white">
              <ion-icon
                onClick={() => {
                  setopen(!open);
                }}
                name={`${open === true ? "close" : "menu"}`}
              />
            </span>
          </div>
        </div>
      </nav>
      {open && (
        <div className="absolute md:hidden w-4/6 z-[1]   top-20 ease-in duration-400  right-0  w-full h-fit bg-black text-white py-4">
          {page === "ab" && (
            <div className="my-3 px-2">
              <span
                onClick={() => {
                  navigate(`/website/${website_id}/ab/add`);
                }}
                className=" mx-3 text-lg text-white block  hover:bg-gray-500 py-3 cursor-pointer duration-300"
              >
                Create AB test
              </span>
              <span
                onClick={() => {
                  navigate(`/website/${website_id}/ab`);
                }}
                className=" mx-3 text-lg text-white  block  hover:bg-gray-400 py-3 cursor-pointer duration-300"
              >
                List AB test
              </span>
            </div>
          )}{" "}
          {page === "segments" && (
            <div className="my-3 px-2">
              <span
                onClick={() => {
                  navigate(`/website/${website_id}/segments/add`);
                }}
                className=" mx-3 text-lg text-white block  hover:bg-gray-500 py-3 cursor-pointer duration-300"
              >
                Add new segment
              </span>
              <span
                onClick={() => {
                  navigate(`/website/${website_id}/segments`);
                }}
                className=" mx-3 text-lg text-white  block  hover:bg-gray-400 py-3 cursor-pointer duration-300"
              >
                List segments
              </span>
            </div>
          )}{" "}
          {page === "notifications" && (
            <div className="my-3 px-2">
              <span
                onClick={() => {
                  navigate(`/website/${website_id}/notification/add`);
                }}
                className=" mx-3 text-lg text-white block  hover:bg-gray-500 py-3 cursor-pointer duration-300"
              >
                Add new notification
              </span>
              <span
                onClick={() => {
                  navigate(`/website/${website_id}/notifications`);
                }}
                className=" mx-3 text-lg text-white  block  hover:bg-gray-400 py-3 cursor-pointer duration-300"
              >
                List notifications
              </span>
            </div>
          )}{" "}
          {page === "prompts" && (
            <div className="my-3 px-2">
              <span
                onClick={() => {
                  navigate(`/website/${website_id}/prompts/add`);
                }}
                className=" mx-3 text-lg text-white block  hover:bg-gray-500 py-3 cursor-pointer duration-300"
              >
                Add new prompt
              </span>
              <span
                onClick={() => {
                  navigate(`/website/${website_id}/prompts`);
                }}
                className=" mx-3 text-lg text-white  block  hover:bg-gray-400 py-3 cursor-pointer duration-300"
              >
                List prompts
              </span>
            </div>
          )}{" "}
          <div className="  grid grid-cols-1 my-3 px-2">
            <button
              onClick={() => {
                navigate(`/profile`);
              }}
              className="  bg-green-500 hover:bg-green-400 rounded-1 inline-block text-white mx-1 my-1  px-4 py-1 text-lg "
            >
              Profile
            </button>
            <button
              onClick={() => {
                swal({
                  title: "Confirm Logout ?",

                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                }).then((logout) => {
                  if (logout) {
                    logoutFunction();
                  }
                });
              }}
              className="bg-red-500 hover:bg-red-400 rounded-1 inline-block text-white mx-1  my-1  px-4 py-1 text-lg "
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
