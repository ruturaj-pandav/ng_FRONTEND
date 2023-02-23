import React from "react";
import moment from "moment";
export default function MoreInfoNotifications({ notification, closemoreinfo }) {
  let dt = new Date(notification.schedule_datetime);

  function subtractMinutes(date, minutes) {
    date.setMinutes(date.getMinutes() - minutes);

    return date;
  }

  const newDate = subtractMinutes(dt, 330);
  return (
    <div className=" ">
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-5/6 sm:2/3 md:w-1/2 my-6 mx-auto ">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between px-4 py-3 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-xl md:text-3xl font-semibold">
                  {" "}
                  More information
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => closemoreinfo(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative px-5 py-3  ">
                <div className="my-1 md:my-3">
                  <span className="text text-gray-600 my-1 block ">Title</span>
                  <span className="text-xl block "> {notification.title}</span>
                </div>
                <div className="my-1 md:my-3">
                  {" "}
                  <span className="text text-gray-600 my-1 block ">
                    Body Text
                  </span>
                  <span className="text-xl block ">
                    {" "}
                    {notification.body_text}
                  </span>
                </div>
                <div className="my-1 md:my-3">
                  {" "}
                  <span className="text text-gray-600 my-1 block ">
                    Schedule date time
                  </span>
                  <span className="text-lg block ">
                    {" "}
                    {/* {notification.schedule_datetime} */}
                    <span className="">
                      {" "}
                      newDate        {moment(newDate).format("DD MMMM YYYY")}
                    </span>
                    <span className="mx-2 ">
                      {" "}
                      {moment(newDate).format("hh:mm:ss")}
                    </span>
                  </span>
                </div>

                <div className="grid grid-cols-2  my-1 md:my-3 gap-4  ">
                  <div className="col-span-2 lg:col-span-1">
                    <span className="block  text-gray-500 my-1   ">
                      Redirect Url
                    </span>
                    <span className="block text-lg text-gray-600  my-1 ">
                      {" "}
                      {notification.redirect_url}
                    </span>
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <span className="block  text-gray-500 my-1    ">
                      Status
                    </span>
                    <span className="block text-lg text-gray-600  my-1  ">
                      {" "}
                      {notification.status}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2  my-1 md:my-3 gap-4  ">
                  <div className="col-span-2 lg:col-span-1">
                    <span className="block  text-gray-500 my-1    ">
                      Created at
                    </span>
                    <span className="block text-lg text-gray-600  my-1">
                      {" "}
                      {/* {notification.createdAt}{" "} */}
                      <span className="">
                        {" "}
                        {moment(new Date(notification.createdAt)).format(
                          "DD MMMM YYYY"
                        )}
                      </span>
                      <span className="mx-2 ">
                        {" "}
                        {moment(new Date(notification.createdAt)).format(
                          "hh:mm:ss"
                        )}
                      </span>
                    </span>
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <span className="block  text-gray-500 my-1    ">
                      Segment id
                    </span>
                    <span className="block text-lg text-gray-600  my-1  ">
                      {" "}
                      {notification.segment_id !== null
                        ? notification.segment_id
                        : " - "}
                    </span>
                  </div>
                </div>

                {notification.image_type !== null && (
                  <span>
                    <img alt="test" src=""></img>
                  </span>
                )}
              </div>
              {/*footer*/}
              <div className="text-center ">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => closemoreinfo()}
                >
                  Close
                </button>
              </div>
              {/* <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => closemoreinfo(false)}
                >
                  Save Changes
                </button>
              </div> */}
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    </div>
  );
}
