import { useState } from "react";
import { goTo, logoutFunction } from "../helper.js";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
// import zomato from "../images/logo.png";
export default function NavbarLogout({ }) {
  let navigate = useNavigate();
  let { website_id } = useParams();

  const [open, setopen] = useState(false);
  const [showitems, setshowitems] = useState(false);
  const [showcontent, setshowcontent] = useState(false);
  return (
    <div>
      {" "}
      <nav className="flex justify-between  p-3  bg-black ">
        <div className=" flex  flex-start">
          <div className="inline-block ">
            <img
              // src={zomato}
              className="h-12 w-18"
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
          <div className="mx-8  justify-center items-center hidden md:flex">
          <>
                <span
                  onClick={() => {
                    navigate("/about-us");
                  }}
                  className=" mx-3 text-white  hover:text-gray-400 cursor-pointer duration-300"
                >
                  about us
                </span>
                <span
                  onClick={() => {
                    navigate("/contact-us");
                  }}
                  className=" mx-3 text-white  hover:text-gray-400 cursor-pointer duration-300"
                >
                  contact us
                </span>
              </>
     
          </div>
        </div>
        <div className=" flex justify-center items-center ">
         
        <div className=" hidden md:block  ">
              <button
                onClick={() => {
                  navigate(`/login`);
                }}
                className="bg-blue-500 hover:bg-blue-400 rounded-1 text-white mx-1  px-4 py-1 text-lg "
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate(`/signup`);
                }}
                className="bg-gray-50 hover:bg-gray-100 border-blue-500 border  text-blue-500 rounded-1  mx-1 px-4 py-1 text-lg "
              >
                Register
              </button>
            </div>

          <div className="block md:hidden">
            <span className="text-3xl block text-white">
              <ion-icon
                onClick={() => {
               
                  setopen(!open);
                }}
                name={`${open === true ? "close" : "menu"}`}
              />
            </span>
          </div>
        </div>
      </nav>
      {open && (
        <div className="absolute md:hidden w-4/6 z-[1]   top-20 ease-in duration-400  right-0  w-full h-fit bg-black text-white py-4">
       <div className="  grid grid-cols-1 my-3 px-2">
              <button
                onClick={() => {
                  navigate(`/login`);
                }}
                className="  bg-blue-500 hover:bg-blue-400 rounded-1 inline-block text-white mx-1 my-1  px-4 py-1 text-lg "
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                }}
                className="bg-gray-50 hover:bg-gray-100 rounded-1 inline-block text-blue-500 mx-1  my-1  px-4 py-1 text-lg "
              >
                Register
              </button>
            </div>
         
        </div>
      )}
    </div>

    
  );
}
