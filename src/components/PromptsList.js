import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
export default function PromptsList({ prompts }) {
  let { website_id } = useParams();
  const [loader, setloader] = useState(true);
  useEffect(() => {
    if (prompts.status === true) {
      setloader(false);
    }
  }, [prompts]);
  let navigate = useNavigate();
  return (
    <div className="container  mx-auto  my-8">
      <div className="relative overflow-x-auto my-3  w-full lg:w-3/4 mx-auto">
        <div className="w-full flex justify-between">

        <span className="text-2xl block my-1">Prompts List</span>      <button
          onClick={() => {
            navigate(`/website/${website_id}/prompts/add`);
          }}
          className="text-white rounded-1 block  px-2 bg-gray-700 hover:bg-gray-900 text-right"
        >
          Add new prompt
        </button>
        </div>
        {loader ? (
          <Loader message="Getting Prompts ... please wait " />
        ) : prompts.prompts.length > 0 ? (
          <table className="w-full my-4 border-black   text-start ">
            {/* <thead>
              <tr className=" text-center">
                <th className="p-1   border  text-xl ">Prompt type</th>
                <th className="p-1   border  text-xl ">Prompt text</th>
                <th className="p-1  border  text-xl ">Button 1 Label</th>
                <th className="p-1 border  text-xl  ">Button 2 Label</th>
                <th className="p-1 border  text-xl  ">Delay</th>
                <th className="p-1  border text-xl  ">Actions</th>
              </tr>
            </thead> */}
            <thead className="   capitalize  bg-gray-800 text-white   ">
              <tr>
                <th scope="col" className="  px-6  py-3">
                  No.
                </th>
                <th scope="col" className="  px-6  py-3">
                  Prompt type
                </th>
                <th scope="col" className="px-6 py-3">
                  Prompt text
                </th>
                {/* <th scope="col" className="  px-6 py-3">
                  Button 1 Label
                </th>
                <th scope="col" className="  px-6 py-3">
                  Button 2 Label
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Delay
                </th>
                <th scope="col" className="  px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {prompts.prompts.map((prompt, index) => {
                return (
                  <tr
                    key={index}
                    className={`text-left    text-sm cursor-pointer ${
                      index % 2 == 0
                        ? `bg-white`
                        : `bg-gray-50 hover:bg-gray-100`
                    }`}
                  >
                    <td className="  px-6 py-2   ">{index + 1}</td>
                    <td className="  px-6 py-2   ">{prompt.prompt_type}</td>
                    <td className="  px-6 py-2  ">{prompt.prompt_text}</td>
                    {/* <td className="  px-6 py-2  ">{prompt.btn_1_label}</td>
                    <td className="px-6 py-2  ">{prompt.btn_2_label}</td> */}
                    <td className=" px-6 py-2  ">{prompt.settings.delay / 1000} seconds</td>
                    <td className=" px-6 py-2  ">
                      <button
                        onClick={() => {
                          navigate(
                            `/website/${website_id}/prompts/edit/${prompt.id}`,
                            { state: { prompt } }
                          );
                        }}
                        className="bg-orange-400 hover:scale-110 text-white p-1  capitalize rounded-1 text-sm"
                      >
                        customize
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <span className=" text-gray-500 my-8 block text-xl">
            No prompts Found
          </span>
        )}
  
      </div>
    </div>
  );
}
