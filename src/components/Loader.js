import React, { useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
export default function Loader({ message }) {
  return (
    <div className="  mx-auto py-4  ">
      <div className="mx-auto ">
        <span className=" block w-fit mx-auto ">
          <MoonLoader color="#222" size={44} />
        </span>
        <span className="block text-gray-400 w-fit mx-auto mt-2">
          {message != null ? message : "getting data"}
        </span>{" "}
      </div>
    </div>
  );
}
