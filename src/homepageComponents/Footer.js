import React from "react";

export default function Footer() {
  return (
    <div className="container-sm  mx-auto py-3 ">
      <div className="text-center mb-3">
        Copyright © 2023 Push Notifications SaaS Platform
      </div>
      <div className="text-center">
        <span className="text-gray-700 hover:text-gray-400 mx-3 cursor-pointer ">Terms of Use</span>
        <span className="text-gray-700 hover:text-gray-400 mx-3 cursor-pointer">Privacy Policy</span>
      </div>
    </div>
  );
}
