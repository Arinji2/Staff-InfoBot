import React from "react";
import { Link } from "react-router-dom";
import Create from "../../assets/icons/create.svg";
import Pattern from "../../assets/icons/pattern.svg";
import Choose from "../../assets/icons/choose.svg";
import "../pages.css";
function Home({ docObj }) {
  return (
    <div>
      <div className="hero">
        <div className="absolute h-screen hero  w-screen -z-10 blur-sm"></div>
        <p className="p-20"></p>
        <div className=" flex flex-col items-center justify-center">
          <h1 className="text-2xl md:text-6xl pt-10 text-white text-center os font-bold">
            Welcome <span className="text-green-400 ">{docObj.userName}</span>
          </h1>
          <p className="p-10"></p>
          <div className="flex flex-col md:flex-row items-center justify-evenly w-screen">
            <Link
              to="/DevUploader"
              state={{ docObj: docObj }}
              className="flex flex-col text-center justify-evenly w-1/2 h-1/2 md:w-1/6 md:h-1/6 bg-blue-600 md:bg-transparent hover:bg-blue-600 scale-90 hover:scale-100 hover:shadow-lg hover:shadow-black p-3 rounded-lg transition-all ease-in-out duration-500"
            >
              <h2 className="text-green-400 text-2xl border-b-2 border-green-400 os">
                Uploader
              </h2>
              <img
                src={Create}
                alt={"Create"}
                className="mt-3 text-green-400"
              />
            </Link>
            <Link
              to="/DevPattern"
              state={{ docObj: docObj }}
              className="flex flex-col text-center justify-evenly w-1/2 h-1/2 md:w-1/6 md:h-1/6 bg-blue-600 md:bg-transparent hover:bg-blue-600 scale-90 hover:scale-100 hover:shadow-lg hover:shadow-black p-3 rounded-lg transition-all ease-in-out duration-500"
            >
              <h2 className="text-green-400 text-2xl border-b-2 border-green-400 os">
                Patterns
              </h2>
              <img src={Pattern} alt={"Create"} className="mt-3" />
            </Link>
            <Link
              to="/Choose"
              state={{ docObj: docObj }}
              className="flex flex-col text-center items-stretch justify-center w-1/2 h-1/2 md:w-1/6 md:h-1/6 bg-blue-600 md:bg-transparent hover:bg-blue-600 scale-90 hover:scale-100 hover:shadow-lg hover:shadow-black p-3 rounded-lg transition-all ease-in-out duration-500"
            >
              <h2 className="text-green-400 text-2xl border-b-2 border-green-400 os">
                Choose
              </h2>
              <img src={Choose} alt={"Choose"} className="mt-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
