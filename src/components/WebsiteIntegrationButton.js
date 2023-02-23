import React from "react";
import axios from "axios";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function WebsiteIntegrationButton() {
  let navigate = useNavigate();
  let { website_id } = useParams();
  return (
    <div className="container my-3 mx-auto ">
      <button
        onClick={() => {
          navigate(`/website/${website_id}/integration`);
        }}
        className="py-1 px-2    my-2 w-full sm:w-fit      rounded-1 text-white bg-teal-400  block  hover:bg-teal-500"
      >
        website integration
      </button>
      <button
        onClick={() => {
          navigate(`/website/${website_id}/segments`);
        }}
        className="py-1 px-2   my-2   w-full sm:w-fit    rounded-1 text-white bg-yellow-400  block  hover:bg-yellow-500"
      >
        segments
      </button>
      <button
        onClick={() => {
          navigate(`/website/${website_id}/notifications`);
        }}
        className="py-1 px-2    my-2 w-full sm:w-fit      rounded-1 text-white bg-green-400  block  hover:bg-green-500"
      >
        notifications
      </button>
      <button
        onClick={() => {
          navigate(`/website/${website_id}/prompts`);
        }}
        className="py-1 px-2   w-full sm:w-fit     my-2   rounded-1 text-white bg-blue-400  block  hover:bg-blue-500"
      >
        prompt
      </button>
      <button
        onClick={() => {
          navigate(`/website/${website_id}/ab`);
        }}
        className="py-1 px-2    my-2 w-full sm:w-fit    rounded-1 text-white bg-orange-400  block  hover:bg-orange-500"
      >
        ab
      </button>
    </div>
  );
}
