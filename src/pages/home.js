import React from "react";

import "./pages.css";
function Home() {
  return (
    <div>
      <div className="absolute h-screen hero w-screen -z-10 blur-sm"></div>
      <p className="p-20"></p>
      <div className=" flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-8xl pt-10 text-yellow-400 text-center">
          InfoBot Staff
        </h1>
        <p className="p-10"></p>
        <p
          className="text-white text-2xl p-2 border-2 border-white rounded-md  hover:border-yellow-400 hover:text-3xl hover:cursor-pointer transition-all ease-in-out duration-300"
          onClick={() => {
            window.location.assign("/CreateProgram");
          }}
        >
          Create Memories!
        </p>
      </div>
    </div>
  );
}

export default Home;
