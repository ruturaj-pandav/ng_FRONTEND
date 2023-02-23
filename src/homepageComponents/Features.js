import React from "react";
import { SiGoogleanalytics, SiTarget } from "react-icons/si";
import { MdOutlineSchedule } from "react-icons/md";
export default function Features() {
  return (
    <div className="bg-white">
      <div className=" container mb-5 w-full mx-2 lg:w-3/4 md:py-4  mx-auto">
        <span className="text-center mb-3  block text-3xl">Features</span>
        <div className="grid grid-cols-3 gap-4">
          <div className="  col-span-3 md:col-span-1 rounded py-4 px-2 text-center border-bottom shadow-sm">
            <span className="mx-auto inline-block text-center    text-4xl text-blue-400">
              <MdOutlineSchedule />
            </span>
            <span className="block text-2xl mb-2 ">Scheduling</span>
            <span className="text-muted ">
              Schedule your notifications to be sent at the best time for your
              audience.
            </span>
          </div>
          <div className=" col-span-3 md:col-span-1 rounded py-4 px-2  text-center border-bottom shadow-sm">
            <span className=" text-orange-400 mx-auto inline-block text-center   text-4xl">
              <SiGoogleanalytics />
            </span>
            <span className="block text-2xl mb-2 ">Analytics</span>
            <span className="text-muted">
              Track the performance of your notifications and make data-driven
              decisions.
            </span>
          </div>
          <div className=" col-span-3 md:col-span-1  rounded py-4 px-2  text-center border-bottom shadow-sm">
            <span className="text-green-400 mx-auto inline-block text-center text-4xl ">
              <SiTarget />
            </span>
            <span className="block text-2xl mb-2 ">Targeting</span>
            <span className="text-muted">
              Target specific audiences based on demographics, behavior, and
              more.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
