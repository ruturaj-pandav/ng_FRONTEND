import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import MoreInfoNotifications from "./MoreInfoNotifications";
import swal from "sweetalert";
import moment from "moment";
import axios from "axios";

export default function NotificationsList({
  notifications,
  getnotifications,
  website_domain,
}) {
  async function deletenotification(notification_id) {
    let accessToken = localStorage.getItem("accessToken");

    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_BASE}/notifications/deleteNotification`,

      { notification_id: parseInt(notification_id) },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response) {
      if (response.data.status === true) {
        // getnotifications();
        swal("Deleted ", response.data.message, "success").then((response) => {
          getnotifications();
        });
      }
      if (response.data.status === false) {
        swal("Something went wrong ", response.data.message, "error");
      }
    } else {
    }
  }
  let { website_id } = useParams();
  const [loader, setloader] = useState(true);

  useEffect(() => {
    if (notifications.status === true) {
      setloader(false);
    }
  }, [notifications]);

  let navigate = useNavigate();
  const [moreinfo, setmoreinfo] = useState(false);
  const [infoon, setinfoon] = useState(null);

  function closemoreinfo() {
    setmoreinfo(false);
    setinfoon(null);
  }
  const [image, setimage] = useState("");
  // async function getimage(index) {
  //   let notification_id = notifications_list[index].id;
  //   let image_type = notifications_list[index].image_type;

  //   let response = await axios.get(
  //     `${process.env.REACT_APP_BACKEND_BASE}/ntimages/${notification_id}.${image_type}`
  //   );
  //   if (response.data) {
  //     setmoreinfo(true);
  //     setinfoon(index);
  //   }
  // }

  return (
    <div className="container mx-auto my-8 ">
      {moreinfo === true && (
        <MoreInfoNotifications
          notification={notifications.notifications[infoon]}
          closemoreinfo={setmoreinfo}
        />
      )}
      <div className="w-full lg:w-3/4 mx-auto">
        {" "}
        <div className="w-full  flex justify-between ">
          <span className="text-2xl block my-2 ">Your Notifications</span>
          <button
            onClick={() => {
              navigate(`/website/${website_id}/notification/add`, {
                state: { website_domain: website_domain },
              });
            }}
            className="text-white   bg-gray-700 hover:bg-gray-900 rounded-1 py-1 px-2 my-2"
          >
            Add new notification
          </button>
        </div>
        {loader && <Loader message="Getting Notifications ... please wait " />}
        {notifications.status === true &&
        notifications.notifications.length > 0 ? (
          <table className="w-full my-4 border-black text-left ">
            <thead className=" capitalize  bg-gray-800 text-white ">
              <tr className="  text-sm ">
                <th scope="col" className="px-1 md:px-6 py-3">
                  Sr. No
                </th>
                <th scope="col" className="px-1 md:px-6 py-3">
                  Notification title{" "}
                </th>
                {/* <th className="p-1   border  text-xl ">Schedule date</th> */}
                {/* <th className="p-1  border  text-xl ">Schedule time </th> */}
                <th scope="col" className="px-1 md:px-6 py-3">
                  Schedule date-time
                </th>
                <th scope="col" className="px-1 md:px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-1 md:px-6 py-3">
                  Actions
                </th>

                
              </tr>
            </thead>

            <tbody>
              {notifications.notifications.map((notification, index) => {
                // var localDate = new Date(notification.schedule_datetime);
                let dt = new Date(notification.schedule_datetime);

                function subtractMinutes(date, minutes) {
                  date.setMinutes(date.getMinutes() - minutes);

                  return date;
                }

                const newDate = subtractMinutes(dt, 330);

                return (
                  <tr
                    className={`text-left  text-sm cursor-pointer ${
                      index % 2 == 0
                        ? `bg-white`
                        : `bg-gray-50 hover:bg-gray-100`
                    }`}
                    key={index}
                  >
                    <td className=" px-1 md:px-6 py-2  ">{index + 1}</td>
                    {/* <td className=" px-6 py-2  ">{notification.id}</td> */}
                    <td className="px-1 lg: px-6 py-2  ">
                      {notification.title}
                    </td>
                    <td className=" px-1 md:px-6 py-2  ">
                      <span className="block  my-1 ">
                        {" "}
                        {moment(newDate).format("DD/MM/YYYYY")}
                      </span>{" "}
                      <span className="block  my-1 font-semibold lg:font-normal ">
                        {" "}
                        {moment(newDate).format("hh:mm:ss")}
                      </span>{" "}
                    </td>
                    <td className="px-1   md:px-6 py-2 ">
                      <span
                        className={`${
                          notification.status === "Completed" &&
                          "text-green-500 font-semibold   block   py-1 px-2 "
                        } ${
                          notification.status === "Pending" &&
                          " text-orange-300 font-semibold   block   py-1 px-2 "
                        } ${
                          notification.status === "Error" &&
                          " text-red-500 font-semibold   block   py-1 px-2 "
                        }`}
                      >
                        {notification.status}
                      </span>
                    </td>
                    <td className=" px-1 md:px-6 py-2   ">
                      <button
                        onClick={() => {
                          setmoreinfo(true);
                          setinfoon(index);
                        }}
                        className="bg-blue-400 hover:bg-blue-500 text-sm my-1 lg:my-0 block lg:inline w-full lg:w-fit  text-white py-1 px-2 mx-1 uppercase rounded-1 text-lg"
                      >
                        more info
                      </button>
                      <button
                        onClick={() => {
                          navigate(
                            `/website/${website_id}/notifications/${notification.id}/view`
                          );
                        }}
                        className="bg-green-400 hover:bg-green-500 text-sm my-1 lg:my-0  block lg:inline w-full lg:w-fit text-white py-1 px-2 mx-1  uppercase rounded-1 text-lg"
                      >
                        analytics
                      </button>
                      {/* <button
                        onClick={() => {
                          navigate(
                            `/website/${website_id}/notifications/edit/${notification.id}`,
                            { state: { notification } }
                          );
                        }}
                        className="bg-green-400 hover:bg-green-500 text-sm  text-white py-1 px-2 mx-1  rounded-1 text-lg"
                      >
                        view
                      </button> */}
                      <button
                        onClick={() => {
                          //
                          swal({
                            title: "Are you sure?",
                            text: "You cant reverse this once done ",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                          }).then((willDelete) => {
                            if (willDelete) {
                              deletenotification(notification.id);
                              // navigate(`/website/${website_id}/notifications`)
                            }
                          });
                        }}
                        className="bg-red-400 hover:bg-red-500 text-sm my-1 lg:my-0  block lg:inline w-full lg:w-fit text-white py-1 px-2 mx-1  uppercase rounded-1 text-lg"
                      >
                        delete
                      </button>
                    </td>
                   
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <span className="  text-gray-500 my-8 block text-xl ">
            No Notifications Found
          </span>
        )}
      </div>
    </div>
  );
}
