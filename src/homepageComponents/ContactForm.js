import React from "react";

export default function ContactForm() {
  return (
    <div className="bg-white py-3 px-3">
      <div className="block w-full md:w-1/2 mx-auto ">
        <span className="my-5 block text-center text-3xl">
          Send us your message
        </span>
        <form>
          <div className="my-2">
            <label className="text-xl block mb-1"> Name</label>
            <input
              className="border border-red-100 w-100 p-2 rounded"
              placeholder="your name"
            />
          </div>
          <div className="my-2">
            <label className="text-xl block mb-1">Email</label>
            <input
              className="border border-red-100 w-100 p-2 rounded"
              placeholder="your email"
            />
          </div>
          <div>
            <label className="text-xl block mb-1">Message</label>
            <textarea
              rows="4"
              className="border border-red-100 w-100 p-2 rounded"
              placeholder="Your message"
            >
              {" "}
            </textarea>
          </div>
          <button
            type="submit"
            className="mt-3 text-white bg-blue-700 p-2 rounded-1 hover:bg-blue-800"
          >
            Send message
          </button>
        </form>
      </div>
    </div>
  );
}
