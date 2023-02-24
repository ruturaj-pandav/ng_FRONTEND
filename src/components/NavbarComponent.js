import { useState } from "react";
import { goTo, logoutFunction } from "../helper.js";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import zomato from "../images/zomato-removebg-preview.png";
export default function NavbarComponent({ loggedin, page }) {
  let navigate = useNavigate();
  let { website_id } = useParams();

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
            {loggedin && (
              <span
                onClick={() => {
                  navigate(`/dashboard`);
                }}
                className=" mx-3 text-white  hover:text-gray-400 cursor-pointer duration-300"
              >
                Dashboard
              </span>
            )}
            {!loggedin && (
              <>
                <span
                  onClick={() => {
                    navigate("/about-us");
                  }}
                  className=" mx-3 text-white  hover:text-gray-400 cursor-pointer duration-300"
                >
                  about us
                </span>
                <span
                  onClick={() => {
                    navigate("/contact-us");
                  }}
                  className=" mx-3 text-white  hover:text-gray-400 cursor-pointer duration-300"
                >
                  contact us
                </span>
              </>
            )}
            {page === "notifications" && (
              <>
                <span
                  onClick={() => {
                    navigate(`/website/${website_id}/notification/add`);
                  }}
                  className=" mx-3 text-white  hover:text-gray-400 cursor-pointer duration-300"
                >
                  Create notification
                </span>
                <span
                  onClick={() => {
                    navigate(`/website/${website_id}/notifications`);
                  }}
                  className=" mx-3 text-white  hover:text-gray-400 cursor-pointer duration-300"
                >
                  List notification
                </span>
              </>
            )}
            {page === "prompts" && (
              <>
                <span
                  onClick={() => {
                    navigate(`/website/${website_id}/prompts/add`);
                  }}
                  className=" mx-3 text-white  hover:text-gray-400 cursor-pointer duration-300"
                >
                  Create prompts
                </span>
                <span
                  onClick={() => {
                    navigate(`/website/${website_id}/prompts`);
                  }}
                  className=" mx-3 text-white  hover:text-gray-400 cursor-pointer duration-300"
                >
                  List prompts
                </span>
              </>
            )}
            {page === "ab" && (
              <>
                <span
                  onClick={() => {
                    navigate(`/website/${website_id}/ab/add`);
                  }}
                  className=" mx-3 text-white  hover:text-gray-400 cursor-pointer duration-300"
                >
                  Create AB Test
                </span>
                <span
                  onClick={() => {
                    navigate(`/website/${website_id}/ab`);
                  }}
                  className=" mx-3 text-white  hover:text-gray-400 cursor-pointer duration-300"
                >
                  List AB
                </span>
              </>
            )}
            {page === "segments" && (
              <>
                <span
                  onClick={() => {
                    navigate(`/website/${website_id}/segments/add`);
                  }}
                  className=" mx-3 text-white  hover:text-gray-400 cursor-pointer duration-300"
                >
                  Create segment
                </span>
                <span
                  onClick={() => {
                    navigate(`/website/${website_id}/segments`);
                  }}
                  className=" mx-3 text-white  hover:text-gray-400 cursor-pointer duration-300"
                >
                  List segments
                </span>
              </>
            )}
          </div>
        </div>
        <div className=" flex justify-center items-center ">
          {!loggedin && (
            <div className=" hidden md:block  ">
              <button
                onClick={() => {
                  navigate(`/login`);
                }}
                className="bg-blue-500 hover:bg-blue-400 rounded-1 text-white mx-1  px-4 py-1 text-lg "
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate(`/signup`);
                }}
                className="bg-gray-50 hover:bg-gray-100 border-blue-500 border  text-blue-500 rounded-1  mx-1 px-4 py-1 text-lg "
              >
                Register
              </button>
            </div>
          )}
          {loggedin && (
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
          )}

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
          {!loggedin && (
            <div className="  grid grid-cols-1 my-3 px-2">
              <button
                onClick={() => {
                  navigate(`/login`);
                }}
                className="  bg-blue-500 hover:bg-blue-400 rounded-1 inline-block text-white mx-1 my-1  px-4 py-1 text-lg "
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                }}
                className="bg-gray-50 hover:bg-gray-100 rounded-1 inline-block text-blue-500 mx-1  my-1  px-4 py-1 text-lg "
              >
                Register
              </button>
            </div>
          )}
          {loggedin && (
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
          )}
        </div>
      )}
    </div>

    // <nav className="bg-gray-800 text-white border-bottom shadow shadow-red-500  p-3   h-16 ">
    //   <div className=" container-sm grid grid-cols-6 gap-4">
    //     <div
    //       className="text-2xl font-bold cursor-pointer"
    //       onClick={() => {
    //         // goTo("");
    //         navigate("/");
    //       }}
    //     >
    //       Web Push
    //     </div>

    //     <div className="flex justify-between col-span-5 ">
    //       <div className="content-center">
    //         {!loggedin && (
    //           <>
    //             <span
    //               className="mx-2 my-1 hover:text-gray-500 cursor-pointer   text-lg "
    //               onClick={() => {
    //                 // goTo("about-us")
    //                 navigate("/about-us");
    //               }}
    //             >
    //               About us
    //             </span>
    //             <span
    //               className="mx-2 hover:text-gray-500 cursor-pointer text-lg "
    //               onClick={() => {
    //                 // goTo("contact-us")
    //                 navigate("/contact-us");
    //               }}
    //             >
    //               Contact us
    //             </span>
    //           </>
    //         )}
    //         <span className="mx-2 hover:text-gray-500 cursor-pointer text-lg ">
    //           {loggedin ? (
    //             <span
    //               onClick={() => {
    //                 // goTo("about-us")
    //                 navigate("/dashboard");
    //               }}
    //             >
    //               Websites
    //             </span>
    //           ) : null}
    //         </span>
    //         <span className="mx-2 hover:text-gray-500 cursor-pointer text-lg">
    //           {loggedin && page === "segments" && (
    //             <select className="bg-gray-800  text-white border-white border  py-1 px-2 rounded-1 ">
    //               <option value="" selected disabled hidden>
    //                 Segments
    //               </option>
    //               <option
    //                 onClick={() => {
    //                   navigate(`/website/${website_id}/segments/add`);
    //                 }}
    //               >
    //                 Create segment
    //               </option>
    //               <option
    //                 onClick={() => {
    //                   navigate(`/website/${website_id}/segments`);
    //                 }}
    //               >
    //                 list segment
    //               </option>
    //             </select>
    //           )}
    //           {loggedin && page === "ab" && (
    //             <select className="bg-gray-800  text-white border-white border  py-1 px-2 rounded-1 ">
    //               <option value="" selected disabled hidden>
    //                 A/B Testing
    //               </option>
    //               <option
    //                 onClick={() => {
    //                   navigate(`/website/${website_id}/segments/add`);
    //                 }}
    //               >
    //                 Create A/B
    //               </option>
    //               <option
    //                 onClick={() => {
    //                   navigate(`/website/${website_id}/segments`);
    //                 }}
    //               >
    //                 List A/B
    //               </option>
    //             </select>
    //           )}
    //           {loggedin && page === "notification" && (
    //             <select className="bg-gray-800  text-white border-white border  py-1 px-2 rounded-1 ">
    //               <option className="py-1 " value="" selected disabled hidden>
    //                 Notification
    //               </option>
    //               <option
    //                 className="py-1 "
    //                 onClick={() => {
    //                   navigate(`/website/${website_id}/segments/add`);
    //                 }}
    //               >
    //                 Create Notification
    //               </option>
    //               <option
    //                 className="py-1 "
    //                 onClick={() => {
    //                   navigate(`/website/${website_id}/segments`);
    //                 }}
    //               >
    //                 List Notification
    //               </option>
    //             </select>
    //           )}
    //         </span>
    //       </div>

    //       <div>
    //         {" "}
    //         {loggedin === true ? (
    //           <>
    //             <button
    //               className="  text-lg  mx-2 text-white bg-green-500   py-1 px-2 rounded-1 hover:bg-green-600"
    //               onClick={() => {
    //                 // goTo("profile");
    //                 navigate("/profile");
    //               }}
    //             >
    //               Profile
    //             </button>
    //             <button
    //               className="  text-lg text-white bg-red-500   py-1 px-2 rounded-1 hover:bg-red-600"
    //               // onClick={() => {
    //               //   logoutFunction();
    //               // }}
    //               onClick={() => {
    //                 swal({
    //                   title: "Confirm Logout ?",

    //                   icon: "warning",
    //                   buttons: true,
    //                   dangerMode: true,
    //                 }).then((logout) => {
    //                   if (logout) {
    //                     logoutFunction();
    //                   }
    //                 });
    //               }}
    //             >
    //               Logout
    //             </button>
    //           </>
    //         ) : (
    //           <>
    //             <button
    //               className="  text-lg    text-white bg-blue-700   py-1 px-2 rounded-1 hover:bg-blue-800"
    //               onClick={() => {
    //                 // goTo("login");
    //                 navigate("/login");
    //               }}
    //             >
    //               Login
    //             </button>
    //             <button
    //               className="   text-lg mx-2   text-blue-700 border-blue-900 border  hover:bg-gray-100  border-2   py-1 px-2 rounded-1 hover:text-blue-800"
    //               onClick={() => {
    //                 // goTo("signup");
    //                 navigate("/signup");
    //               }}
    //             >
    //               Register
    //             </button>
    //           </>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </nav>
  );
}
