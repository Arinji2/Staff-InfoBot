import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheckCircle } from "@fortawesome/fontawesome-free-regular";

import { faCode, faUserTie } from "@fortawesome/fontawesome-free-solid";
import "./pages.css";
function MenuSelector() {
  return (
    <div>
      <div className="absolute h-screen hero w-screen -z-10 blur-sm"></div>
      <p className="p-20"></p>
      <div className=" flex flex-col items-center justify-center">
        <h1 className="os text-4xl text-yellow-400">Choose a Role</h1>
        <div className="flex flex-row justify-evenly items-center mt-10 w-screen text-3xl content">
          <div
            className="flex flex-col items-center text-black shadow-black shadow-lg p-2 bg-white rounded-lg hover:scale-90 transition-all duration-300 ease-in-out hover:cursor-pointer"
            onClick={() => {
              window.location.assign("/CreateProgram");
            }}
          >
            <h1>Writer</h1>
            <FontAwesomeIcon className="" icon={faEdit} />
          </div>
          <div className="flex flex-col items-center text-black shadow-black shadow-lg p-2 bg-white rounded-lg hover:scale-90 transition-all duration-300 ease-in-out hover:cursor-pointer">
            <h1>Verifier</h1>
            <FontAwesomeIcon className="" icon={faCheckCircle} />
          </div>
          <div className="flex flex-col items-center text-black shadow-black shadow-lg p-2 bg-white rounded-lg hover:scale-90 transition-all duration-300 ease-in-out hover:cursor-pointer">
            <h1>Developer</h1>
            <FontAwesomeIcon className="" icon={faCode} />
          </div>
          <div className="flex flex-col items-center text-black shadow-black shadow-lg p-2 bg-white rounded-lg hover:scale-90 transition-all duration-300 ease-in-out hover:cursor-pointer">
            <h1>Executive</h1>
            <FontAwesomeIcon className="" icon={faUserTie} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuSelector;
