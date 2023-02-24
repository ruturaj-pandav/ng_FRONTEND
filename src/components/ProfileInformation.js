import React, { useState , useEffect } from "react";
import { verifyLogin } from "../helper";
import swal from "sweetalert";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
export default function ProfileInformation({ user }) {

  let navigate  = useNavigate();
  const [loggedin  , setloggedin] = useState(false)
  useEffect(() => {
    console.log("donig this in profile information")
    verifyLogin().then((data) => {
      if (data) {
        setloggedin(true);
      } else {
        setloggedin(false);
        navigate("/login");
      }
    });
  }, []);
  async function changepassword() {
    setLoading(true)
    setnew_passwordErrMsg("");
    setcurrent_passwordErrMsg("");

    let accessToken = localStorage.getItem("accessToken");

    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_BASE}/users/changePassword`,
      // `${process.env.BACKEND_URL}/websites/list`,
      {
        current_password: currentpass,
        new_password: newpass,
      },

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.data.status) {
      swal("Success", "Password has been changed successfully", "success");
      setcurrentpass("");
      setnewpass("");
      setshowchangepassword(false);
    } else {
      if (
        response.data.status === false &&
        response.data.errorType === "VALIDATION_ERROR"
      ) {
        if (response.data.errors.hasOwnProperty("new_password")) {
          setnew_passwordErrMsg(response.data.errors.new_password);
        }
        if (response.data.errors.hasOwnProperty("current_password")) {
          setcurrent_passwordErrMsg(response.data.errors.current_password);
        }
      } else if (
        response.data.status === false &&
        response.data.message !== ""
      ) {
        swal("Error ", response.data.message, "error").then(() => {
          // window.location.href = `http://localhost:3000/profile`;
          window.location.href = `${process.env.REACT_APP_FRONTEND_BASE}/profile`;
        });
      }
    }
    setLoading(false)
  }
  const [currentpass, setcurrentpass] = useState("");
  const [newpass, setnewpass] = useState("");
  const [current_passwordErrMsg, setcurrent_passwordErrMsg] = useState("");
  const [new_passwordErrMsg, setnew_passwordErrMsg] = useState("");
  const [showchangepassword, setshowchangepassword] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <div className=" lg:w-1/2  mx-auto py-1">
      <div className="border-2 shadow-lg rounded  p-5 my-2">
        <span className="text-3xl block pb-3 ">Your account details</span>
        <div className="my-3 ">
          <label className="block my-1 text-gray-500 ">First name</label>{" "}
          <input
            className="w-5/6 sm:w-2/3 lg:w-3/4 block border rounded-1 px-2 py-1 cursor-not-allowed"
            disabled
            value={user.firstname}
          />
        </div>
        <div className="my-3 ">
          <label className="block my-1 text-gray-500 ">Last name</label>{" "}
          <input
            className="cursor-not-allowed w-5/6  sm:w-2/3 lg:w-3/4  block border rounded-1 px-2 py-1"
            disabled
            value={user.lastname}
          />
        </div>
        <div className="my-3 ">
          <label className="block my-1 text-gray-500 ">Email</label>{" "}
          <input
            className="w-5/6 sm:w-2/3 lg:w-3/4 block border rounded-1 px-2 py-1 cursor-not-allowed"
            disabled
            value={user.email}
          />
        </div>
        <div className="my-3 ">
          <label className="block my-1 text-gray-500 ">User since</label>{" "}
          <input
            className="w-5/6  sm:w-2/3 lg:w-3/4 block border rounded-1 px-2 py-1 cursor-not-allowed"
            disabled
            value={moment(new Date(user.createdAt)).format("DD MMMM YYYY ")}
          />
        </div>{" "}
        {!showchangepassword && (
          <button
            className="bg-yellow-500 text-white py-1 px-2 mt-3 rounded "
            onClick={() => {
              setshowchangepassword(!showchangepassword);
            }}
          >
            Change password
          </button>
        )}
      </div>

      {showchangepassword && (
        <>
          {" "}
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-5/6 md:w-1/2 lg:w-1/3 my-6 mx-auto max-w-3xl ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="text-start  py-4  px-3 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Change Password</h3>
                </div>
                {/*body*/}
                <div className="relative p-3 flex-auto">
                  <form>
                    <div className="my-3 ">
                      <span className="my-1  block ">Current password</span>
                      <input
                        value={currentpass}
                        type="password"
                        className="block border rounded-1 px-2 py-1 lg:w-3/4"
                        onChange={(e) => {
                          setcurrentpass(e.target.value);
                        }}
                      />
                      {current_passwordErrMsg !== "" && (
                        <span className="text-red-500 block  text-sm my-1">
                          {current_passwordErrMsg}
                        </span>
                      )}
                    </div>
                    <div className="my-3 ">
                      <span className="my-1 block  ">New password</span>
                      <input
                        value={newpass}
                        type="password"
                        className="block border rounded-1 px-2 py-1 lg:w-3/4"
                        onChange={(e) => {
                          setnewpass(e.target.value);
                        }}
                      />
                      {new_passwordErrMsg !== "" && (
                        <span className="text-red-500 block text-sm my-1 ">
                          {new_passwordErrMsg}
                        </span>
                      )}
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setnew_passwordErrMsg("");
                      setcurrent_passwordErrMsg("");
                      setcurrentpass("");
                      setnewpass("");
                      setshowchangepassword(false);
                    }}
                  >
                    Close
                  </button>
                  <button
                    disabled={loading}
                    className={`bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                    onClick={() => {
                      changepassword();
                    }}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
        // <div className="border shadow-lg   px-4 py-4  rounded z-3">
        //   <form
        //     onSubmit={(e) => {
        //       e.preventDefault();
        //       changepassword();
        //     }}
        //   >
        //     <span className="block text-3xl mb-4 ">Change your password</span>
        //     <div className="my-2 ">
        //       <span className="my-1  block ">Current password</span>
        //       <input
        //         value={currentpass}
        //         className="block border rounded-1 px-2 py-1 lg:w-3/4"
        //         onChange={(e) => {
        //           setcurrentpass(e.target.value);
        //         }}
        //       />
        //       {current_passwordErrMsg !== "" && (
        //         <span className="text-red-500 block  text-sm my-1">
        //           {current_passwordErrMsg}
        //         </span>
        //       )}
        //     </div>
        //     <div className="my-2 ">
        //       <span className="my-1 block  ">New password</span>
        //       <input
        //         value={newpass}
        //         className="block border rounded-1 px-2 py-1 lg:w-3/4"
        //         onChange={(e) => {
        //           setnewpass(e.target.value);
        //         }}
        //       />
        //       {new_passwordErrMsg !== "" && (
        //         <span className="text-red-500 block text-sm my-1 ">
        //           {new_passwordErrMsg}
        //         </span>
        //       )}
        //     </div>
        //     <div className="mt-3">
        //       <button
        //         onClick={() => {
        //           setshowchangepassword(false);
        //         }}
        //         class="text-white bg-red-400 hover:bg-red-600 py-1  px-2 rounded-1 "
        //       >
        //         Back
        //       </button>
        //       <button
        //         type="submit"
        //         class="text-white bg-green-400 hover:bg-green-600 mx-1 py-1 px-2 rounded-1 "
        //       >
        //         Change password{" "}
        //       </button>
        //     </div>
        //   </form>
        // </div>
      )}
    </div>
  );
}
