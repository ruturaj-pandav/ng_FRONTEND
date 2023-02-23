import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { goTo, logoutFunction } from "../helper";
import { useNavigate } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";
export default function Websites({ loggedin, website_data }) {
  let navigate = useNavigate();

  const [loader, setloader] = useState(true);

  useEffect(() => {
   
    if (website_data.status === true) {
    
      setloader(false);
    } else if (
      website_data.status === false &&
      website_data.message == "No websites found."
    ) {
   
      setloader(false);
    }
  }, [website_data]);
  return (
    <div className=" container block mx-auto ">
      <div className="relative overflow-x-auto my-3   w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto ">
        <span className="text-2xl block my-3 uppercase">Your websites</span>{" "}
        {loader && <Loader message="Getting Websites ... please wait " />}
        {website_data.status === true && website_data.websites.length > 0 ? (
          <>
            <table className="w-full my-4 border-black table-auto  ">
              <thead className="  uppercase bg-gray-100 text-black  text-sm md:text-lg ">
                <tr>
                  <th scope="col" className="px-2 md:px-6 py-3">
                    No.
                  </th>
                  <th scope="col" className="px-2 md:px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-2 md:px-6 py-3">
                    Domain
                  </th>
                  <th scope="col" className="px-2 md:px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {website_data.status === true &&
                  website_data.websites.map((website, index) => {
                    return (
                      <tr
                        className={`text-left  text-xs md:text-sm cursor-pointer ${
                          index % 2 == 0
                            ? `bg-white`
                            : `bg-gray-50 hover:bg-gray-100`
                        }`}
                      >
                        <td className="px-2 md:px-6 py-2 ">{index + 1}</td>
                        <td className="px-2 md:px-6 py-2 ">{website.name}</td>
                        <td className="px-2 md:px-6 py-2 ">{website.domain}</td>
                        <td className="px-2 md:px-6 py-2  ">
                          <button
                            onClick={() => {
                              navigate(`/website/${website.id}`);
                            }}
                            className="bg-yellow-400 w-2/3 md:w-1/2 hover:scale-110 text-white p-1  rounded-1 text-sm"
                          >
                            {" "}
                            VIEW
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </>
        ) : (
          <span className="text-gray-500 my-8 block text-xl ">
            No websites found
          </span>
        )}
        <button
          className="mt-5 text-white bg-blue-700 block  p-2 rounded-1 hover:bg-blue-800"
          onClick={() => {
            // goTo("websites/add");
            navigate("/websites/add");
          }}
        >
          Add Website
        </button>
      </div>
    </div>
  );
}
