import "../pages.css";

import { useState, useEffect } from "react";
import {
  explainBoilerPlate,
  headBoilerPlate,
  logicBoilerPlate,
} from "../programs/boilerplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faPaperPlane,
} from "@fortawesome/fontawesome-free-regular";
import { Oval } from "react-loader-spinner";

export default function Creator() {
  const [head, setHead] = useState("");
  const [headComplete, setHeadComplete] = useState(false);
  const [explainComplete, setExplainComplete] = useState(false);
  const [codeComplete, setCodeComplete] = useState(false);
  const [logicComplete, setLogicComplete] = useState(false);
  const [mainItems] = useState([]);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked === true) {
      setTimeout(() => {
        setClicked(false);
      }, 2000);
    }
  });

  const inputHeading = () => {
    setHeadComplete(true);
    let headItems = [];
    let headTemp = document.getElementById("heading").value;
    setHead(document.getElementById("heading").value);
    let parent = document.getElementById("codeBox");
    headBoilerPlate(headItems, headTemp);
    headItems.forEach((e) => {
      mainItems.push(e);
      let tag = document.createElement("p");
      let content = document.createTextNode(e);
      tag.appendChild(content);
      parent.appendChild(tag);
    });
  };
  const inputExplanation = () => {
    setExplainComplete(true);
    let explainItems = [];
    let explain = document.getElementById("explanation").value;
    let parent = document.getElementById("codeBox");
    explainItems.push("<h3>" + explain + "</h3>");
    explainBoilerPlate(explainItems, explain, head);
    explainItems.forEach((e) => {
      mainItems.push(e);
      let tag = document.createElement("p");
      let content = document.createTextNode(e);
      tag.appendChild(content);
      parent.appendChild(tag);
    });
  };

  const inputCode = () => {
    setCodeComplete(true);
    let codeItems = [];
    let tempCodeItems = [];
    let code = document.getElementById("code").value;
    let parent = document.getElementById("codeBox");
    tempCodeItems = code.split("         ");
    tempCodeItems.forEach((e) => {
      codeItems.push("<p>" + e.trim() + "</p>");
    });
    codeItems.forEach((e) => {
      mainItems.push(e);
      let tag = document.createElement("p");
      let content = document.createTextNode(e);
      tag.appendChild(content);
      parent.appendChild(tag);
    });
  };
  const inputLogic = () => {
    setLogicComplete(true);
    let logicItems = [];
    let logic = document.getElementById("logic").value;
    let parent = document.getElementById("codeBox");
    logicBoilerPlate(logicItems, logic, head);
    logicItems.forEach((e) => {
      mainItems.push(e);
      let tag = document.createElement("p");
      let content = document.createTextNode(e);
      tag.appendChild(content);
      parent.appendChild(tag);
    });
  };

  const choiceRender = (option) => {
    if (option === 1) {
      return (
        <div
          onClick={() => {
            setClicked(true);
          }}
          id="codeBox"
          className="w-10/12 m-4 content text-sm break-words shadow-xl shadow-white rounded-lg p-4 transition-all ease-in-out duration-500 bg-slate-900 hover:cursor-pointer relative"
        ></div>
      );
    } else {
      navigator.clipboard.writeText(
        document.getElementById("codeBox").innerText
      );
      return (
        <div
          id="codeBox"
          className="w-10/12 m-4 content text-lg break-words shadow-xl shadow-white rounded-lg p-4 transition-all ease-in-out duration-500 bg-green-600 hover:cursor-pointer relative"
        >
          <h1 className="os font-bold text-2xl">Copied to Clipboard</h1>
        </div>
      );
    }
  };
  const iconRender = (option) => {
    if (option === 1) {
      return (
        <div className="relative flex flex-col items-center justify-center text-green-600">
          <Oval
            className="absolute top-0"
            color="yellow"
            secondaryColor="white"
          ></Oval>
          <FontAwesomeIcon icon={faCheckCircle} className="absolute " />
        </div>
      );
    } else
      return (
        <div className="relative flex flex-col items-center justify-center text-red-600">
          <Oval
            className="absolute top-0"
            color="yellow"
            secondaryColor="white"
          ></Oval>
          <FontAwesomeIcon icon={faTimesCircle} className="absolute " />
        </div>
      );
  };
  return (
    <div className="text-center text-3xl text-white flex flex-col items-center justify-center -z-20">
      <div className="w-full h-fit contentPic relative rounded-lg">
        {/*Heading Section */}
        <h1 className="text-yellow-400 os font-bold text-2xl md:text-3xl mt-5">
          Input the Heading
        </h1>
        <input
          autoComplete="off"
          placeholder="Heading..."
          id="heading"
          className="rounded-md p-1 bg-transparent shadow-lg shadow-black content text-lg text-white outline-none scale-90 md:hover:scale-100 md:focus:scale-100 hover:shadow-md focus:shadow-md hover:shadow-yellow-400 focus:shadow-yellow-400 w-screen md:w-3/12 transition-all ease-in-out duration-500"
        ></input>
        <br></br>
        <button
          onClick={inputHeading}
          className=" p-2 rounded-lg text-xl shadow-black shadow-lg hover:scale-90 os bg-slate-600 transition-all ease-out duration-200 m-4"
        >
          Submit
        </button>
        {/*Explanation Section */}
        <h1 className="text-yellow-400 os font-bold text-2xl md:text-3xl mt-5">
          Input the Explanation
        </h1>
        <input
          autoComplete="off"
          placeholder="Explanation..."
          id="explanation"
          className="rounded-md p-1 bg-transparent shadow-lg shadow-black content text-lg text-white outline-none scale-90 md:hover:scale-100 md:focus:scale-100 hover:shadow-md focus:shadow-md hover:shadow-yellow-400 focus:shadow-yellow-400 w-screen md:w-3/12 transition-all ease-in-out duration-500"
        ></input>
        <br></br>
        <button
          onClick={inputExplanation}
          className=" p-2 rounded-lg text-xl shadow-black shadow-lg hover:scale-90 os bg-slate-600 transition-all ease-out duration-200 m-4"
        >
          Submit
        </button>
        {/*Code Section */}
        <h1 className="text-yellow-400 os font-bold text-2xl md:text-3xl mt-5">
          Input the Code
        </h1>
        <input
          autoComplete="off"
          placeholder="Code..."
          id="code"
          className="rounded-md p-1 bg-transparent shadow-lg shadow-black content text-lg text-white outline-none scale-90 md:hover:scale-100 md:focus:scale-100 hover:shadow-md focus:shadow-md hover:shadow-yellow-400 focus:shadow-yellow-400 w-screen md:w-3/12 transition-all ease-in-out duration-500"
        ></input>
        <br></br>
        <button
          onClick={inputCode}
          className=" p-2 rounded-lg text-xl shadow-black shadow-lg hover:scale-90 os bg-slate-600 transition-all ease-out duration-200 m-4"
        >
          Submit
        </button>
        {/*Logic Section */}
        <h1 className="text-yellow-400 os font-bold text-2xl md:text-3xl mt-5">
          Input the Logic
        </h1>
        <input
          autoComplete="off"
          placeholder="Logic..."
          id="logic"
          className="rounded-md p-1 bg-transparent shadow-lg shadow-black content text-lg text-white outline-none scale-90 md:hover:scale-100 md:focus:scale-100 hover:shadow-md focus:shadow-md hover:shadow-yellow-400 focus:shadow-yellow-400 w-screen md:w-3/12 transition-all ease-in-out duration-500"
        ></input>
        <br></br>
        <button
          onClick={inputLogic}
          className=" p-2 rounded-lg text-xl shadow-black shadow-lg hover:scale-90 os bg-slate-600 transition-all ease-out duration-200 m-4"
        >
          Submit
        </button>
      </div>
      {/*Counter Section */}
      <div className="flex flex-row items-center justify-evenly mt-5 w-10/12 gap-5 flex-wrap">
        <div className="w-fit h-fit      md:w-36 md:h-36 text-black p-3 shadow-lg shadow-black rounded-lg">
          <h3 className="os text-lg md:text-2xl">Heading</h3>
          {headComplete ? iconRender(1) : iconRender(0)}
        </div>
        <div className="w-fit h-fit      md:w-36 md:h-36 text-black p-3 shadow-lg shadow-black rounded-lg">
          <h3 className="os text-lg md:text-2xl">Explain</h3>
          {explainComplete ? iconRender(1) : iconRender(0)}
        </div>
        <div className="w-fit h-fit      md:w-36 md:h-36 text-black p-3 shadow-lg shadow-black rounded-lg">
          <h3 className="os text-2xl">Code</h3>
          {codeComplete ? iconRender(1) : iconRender(0)}
        </div>
        <div className="w-fit h-fit      md:w-36 md:h-36 text-black p-3 shadow-lg shadow-black rounded-lg">
          <h3 className="os text-2xl">Logic</h3>
          {logicComplete ? iconRender(1) : iconRender(0)}
        </div>
      </div>
      {clicked ? choiceRender(0) : choiceRender(1)}
      <div className="text-black text-2xl shadow-black shadow-lg p-3 rounded-lg">
        <a href="mailTo:articles@infobot.uk">
          <h1>Email your Article</h1>
          <FontAwesomeIcon icon={faPaperPlane} />
        </a>
      </div>
      <p className="mb-20"></p>
    </div>
  );
}
