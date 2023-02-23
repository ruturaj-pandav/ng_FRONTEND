import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { goTo } from "../../src/helper.js";
import { RxCross1 } from "react-icons/rx";
export default function Pricing() {
  let navigate = useNavigate();
  let thcontents = ["Plan", "Free", "Basic", "Pro"];
  let tablecontents = [
    {
      param: "Number of notifications",
      value1: "100/month",
      value2: "1,000/month",
      value3: "10,000/month",
    },
    {
      param: "Scheduling",
      value1: <span className="text-green-500"><FaCheck /></span>,
      value2: <span className="text-green-500"><FaCheck /></span>,
      value3: <span className="text-green-500"><FaCheck /></span>,
    },
    {
      param: "Targeting",
      value1:  <span className="text-red-500 "><RxCross1 /></span>,
      value2: <span className="text-green-500"><FaCheck /></span>,
      value3: <span className="text-green-500"><FaCheck /></span>,
    },
    {
      param: "Analytics",
      value1: <span className="text-red-500"><RxCross1 /></span>,
      value2: <span className="text-green-500"><FaCheck /></span>,
      value3: <span className="text-green-500"><FaCheck /></span>,
    },
    {
      param: "Price",
      value1: "free",
      value2: "$20 / month",
      value3: "$200 / month",
    },
  ];
 
  return (
    <div className="bg-white py-3">
      {" "}
      <div className="block container-sm mx-auto ">
        <div className=" relative overflow-x-auto my-3  w-full lg:w-3/4 mx-auto ">
          <span className="block text-center my-3 text-xl md:text-3xl">
            Pricing
          </span>
          <table className="w-full mx-auto my-4 ">
            <thead className="">
              <tr>
                {thcontents.map((th, index) => {
                  return (
                    <th
                      className="border border-black p-1.5 text-lg md:text-xl font-bold"
                      key={index}
                    >
                      {th}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {tablecontents.map((row, index) => {
                return (
                  <tr key={index}>
                    <td className="border border-black p-2 text-sm md:text-lg">
                      {row.param}
                    </td>
                    <td
                      className={`border  border-black p-2 text-sm md:text-lg  `}
                    >
                      {row.value1}
                    </td>
                    <td
                      className={`border border-black p-2 text-sm md:text-lg  `}
                    >
                      {row.value2}
                    </td>
                    <td
                      className={`border border-black p-2 text-sm md:text-lg    `}
                    >
                      {row.value3}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <center>
            <button
              className="mt-3 text-white bg-blue-700 p-2 px-5 rounded-1 hover:bg-blue-800"
              onClick={() => {
                // goTo("signup");
                navigate("/signup");
              }}
            >
              Sign up
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}
