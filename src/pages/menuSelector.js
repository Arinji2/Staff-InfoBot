import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheckCircle } from "@fortawesome/fontawesome-free-regular";
import { faCode, faUserTie } from "@fortawesome/fontawesome-free-solid";
import { Oval } from "react-loader-spinner";
import { Link } from "react-router-dom";
import "./pages.css";
function MenuSelector({ docObj }) {
  const [writer, setWriter] = useState(false);
  const [verifier, setVerifier] = useState(false);
  const [developer, setDeveloper] = useState(false);
  const [executive, setExecutive] = useState(false);

  useEffect(() => {
    if (docObj.email !== undefined) {
      setWriter(docObj.writer);
      setVerifier(docObj.verifier);
      setDeveloper(docObj.developer);
      setExecutive(docObj.executive);
    }
  }, [docObj]);

  const showBox = (option) => {
    if (option === 1) {
      return (
        <Link to="/WriterHome" state={{ docObj: docObj }}>
          <div className="w-40 h-20 flex flex-col items-center text-black shadow-black shadow-lg p-2 bg-blue-600 rounded-lg hover:scale-90 transition-all duration-300 ease-in-out hover:cursor-pointer">
            <h1>Writer</h1>
            <FontAwesomeIcon className="" icon={faEdit} />
          </div>
        </Link>
      );
    } else if (option === 2) {
      return (
        <div className="w-40 h-20 flex flex-col items-center text-black shadow-black shadow-lg p-2 bg-yellow-400 rounded-lg hover:scale-90 transition-all duration-300 ease-in-out hover:cursor-pointer">
          <h1>Verifier</h1>
          <FontAwesomeIcon className="" icon={faCheckCircle} />
        </div>
      );
    } else if (option === 3) {
      return (
        <div className="w-40 h-20 flex flex-col items-center text-black shadow-black shadow-lg p-2 bg-green-400 rounded-lg hover:scale-90 transition-all duration-300 ease-in-out hover:cursor-pointer">
          <h1>Developer</h1>
          <FontAwesomeIcon className="" icon={faCode} />
        </div>
      );
    } else if (option === 4) {
      return (
        <Link to="/Uploader" state={{ docObj: docObj }}>
          <div className="w-40 h-20 flex flex-col items-center text-black shadow-black shadow-lg p-2 bg-white rounded-lg hover:scale-90 transition-all duration-300 ease-in-out hover:cursor-pointer">
            <h1>Executive</h1>
            <FontAwesomeIcon className="" icon={faUserTie} />
          </div>
        </Link>
      );
    }
  };
  const menuShow = (option) => {
    if (option === 1) {
      return (
        <div>
          <h1 className="os text-4xl text-yellow-400">Choose a Role</h1>
          <div className="flex flex-row flex-wrap gap-7 justify-evenly items-center mt-10 w-screen text-2xl md:text-3xl content ">
            {writer ? showBox(1) : showBox(0)}
            {verifier ? showBox(2) : showBox(0)}
            {developer ? showBox(3) : showBox(0)}
            {executive ? showBox(4) : showBox(0)}
          </div>
        </div>
      );
    } else {
      return (
        <div className=" flex flex-col items-center justify-center">
          <h1 className="text-5xl md:text-8xl pt-10 text-yellow-400 text-center">
            InfoBot Staff
          </h1>
          <p className="p-10"></p>
          <div className="flex flex-col items-center justify-center">
            <button className="mt-10 text-2xl  os text-white scale-90 h  text-black-950 rounded-lg p-3 transition-all ease-in-out duration-300 os">
              Checking for Login...
            </button>

            <Oval
              width="100"
              height="100"
              secondaryColor="transparent"
              color="white"
            />
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <div className="absolute h-screen hero w-screen -z-10 blur-sm"></div>
      <p className="p-20"></p>
      <div className=" flex flex-col items-center justify-center m-4 text-center">
        {docObj.uid !== undefined ? menuShow(1) : menuShow(0)}
      </div>
    </div>
  );
}

export default MenuSelector;
