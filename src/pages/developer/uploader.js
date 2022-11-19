import "../pages.css";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { setDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/fontawesome-free-solid";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/fontawesome-free-regular";
import { Oval, Triangle } from "react-loader-spinner";
export default function Uploader({ docObj }) {
  useEffect(() => {
    if (docObj.developer !== true) window.location.assign("/Error-Perms");
  });

  const [name, setName] = useState("");
  const [explanation, setExplanation] = useState("");
  const [code, setCode] = useState("");
  const [logic, setLogic] = useState("");
  const [chapter, setChapter] = useState("");
  const [chapterSelected, setChapterSelected] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [indexing, setIndexing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  const [error, setError] = useState(false);
  const [errorCode, setErrorCode] = useState(0);

  const handleUpload = () => {
    setLoading(true);
    setUploading(true);
    const docsRef = doc(db, `${chapter}/${name.toLowerCase()}`);
    setDoc(docsRef, {
      code: code,
      explanation: explanation,
      logic: logic,
      title: `<h1>${name}</h1>`,
    }).then(() => {
      setUploading(false);
      setIndexing(true);
      indexFile();
    });
  };

  const indexFile = async () => {
    const docsRef = doc(db, `locations/${chapter}`);
    const id = Math.round(Math.random() * 1000000);

    updateDoc(docsRef, {
      paths: arrayUnion({
        id: id,
        name: name.toLowerCase(),
      }),
    }).then(() => {
      setTimeout(() => {
        setIndexing(false);
        setComplete(true);
        setTimeout(() => {
          setComplete(false);
          setLoading(false);
          clearSelections();
        }, 500);
      }, 1000);
    });
  };
  const checkForErrors = () => {
    if (chapterSelected === false) {
      setError(true);
      setErrorCode(1);
    } else if (name.length === 0) {
      setError(true);
      setErrorCode(2);
    } else handleUpload();
  };
  const clearSelections = () => {
    setChapter(false);
    setChapterSelected(false);

    setName("");
    document.getElementById("nameBox").value = "";
    setCode("");
    document.getElementById("codeBox").value = "";
    setLogic("");
    document.getElementById("logicBox").value = "";
    setExplanation("");
    document.getElementById("explainBox").value = "";
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
          <FontAwesomeIcon icon={faCheckCircle} className="absolute text-3xl" />
        </div>
      );
    } else
      return (
        <div className="relative flex flex-col items-center justify-center text-red-600">
          <Oval
            className="absolute top-0"
            color="yellow"
            secondaryColor="white"
            height="80"
            width="80"
          ></Oval>
          <FontAwesomeIcon icon={faTimesCircle} className="absolute text-3xl" />
        </div>
      );
  };

  return (
    <div>
      <div className={loading ? "hidden" : "block"}>
        <div className="text-center text-sm text-white flex flex-col items-center justify-center -z-20 os gap-5 ">
          <div className="w-full h-fit contentPic relative rounded-lg os">
            <h1 className="text-4xl os font-bold text-green-400">
              Programs Uploader
            </h1>
            <div className="border-b-2 border-white">
              <h2 className="text-2xl text-white m-5">Choose a Chapter</h2>
              {chapterSelected ? (
                <div>
                  <h1 className="text-white text-xl inline">{`Chapter Selected:`}</h1>{" "}
                  <span className="text-green-400 text-xl ">{chapter}</span>
                </div>
              ) : (
                <div className="flex flex-row flex-wrap items-center justify-evenly mb-5">
                  <div
                    onClick={() => {
                      setChapter("loops");
                      setChapterSelected(true);
                    }}
                  >
                    <Chapters name="Loops" />
                  </div>
                  <div
                    onClick={() => {
                      setChapter("methods");
                      setChapterSelected(true);
                    }}
                  >
                    <Chapters name="Methods" />
                  </div>
                  <div
                    onClick={() => {
                      setChapter("strings");
                      setChapterSelected(true);
                    }}
                  >
                    <Chapters name="Strings" />
                  </div>
                  <div
                    onClick={() => {
                      setChapter("array");
                      setChapterSelected(true);
                    }}
                  >
                    <Chapters name="Arrays" />
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col items-center justify-center gap-5 border-b-2 border-white">
              <h2 className="text-2xl text-white m-5">
                Enter the Program Name
              </h2>
              <input
                type="text"
                className="rounded-lg bg-transparent outline-none shadow-lg shadow-black text-center"
                id="nameBox"
                autoComplete="off"
              />
              <p
                className="bg-green-400 text-white border-2 border-green-400 hover:bg-transparent hover:text-green-400 p-2 rounded-lg hover:border-2 hover:border-white transition-all ease-in-out duration-200 mb-5 hover:cursor-pointer "
                onClick={() => {
                  const text = document.getElementById("nameBox").value;
                  setName(text);
                }}
              >
                Submit
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-5 border-b-2 border-white">
              <h2 className="text-2xl text-white m-5">
                Enter the Program Explanation
              </h2>
              <input
                type="text"
                className="rounded-lg bg-transparent outline-none shadow-lg shadow-black w-[95vw]"
                id="explainBox"
                autoComplete="off"
              />
              <p
                className="bg-green-400 text-white border-2 border-green-400 hover:bg-transparent hover:text-green-400 p-2 rounded-lg hover:border-2 hover:border-white transition-all ease-in-out duration-200 mb-5 hover:cursor-pointer "
                onClick={() => {
                  const text = document.getElementById("explainBox").value;

                  setExplanation(text);
                }}
              >
                Submit
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-5 border-b-2 border-white">
              <h2 className="text-2xl text-white m-5">
                Enter the Program Code
              </h2>
              <input
                type="text"
                className="rounded-lg bg-transparent outline-none shadow-lg shadow-black w-[95vw]"
                id="codeBox"
                autoComplete="off"
              />
              <p
                className="bg-green-400 text-white border-2 border-green-400 hover:bg-transparent hover:text-green-400 p-2 rounded-lg hover:border-2 hover:border-white transition-all ease-in-out duration-200 mb-5 hover:cursor-pointer "
                onClick={() => {
                  var text = document.getElementById("codeBox").value;

                  setCode(text);
                }}
              >
                Submit
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-5 border-b-2 border-white">
              <h2 className="text-2xl text-white m-5">
                Enter the Program Logic
              </h2>
              <input
                type="text"
                className="rounded-lg bg-transparent outline-none shadow-lg shadow-black w-[95vw] h-fit"
                id="logicBox"
                autoComplete="off"
              />
              <p
                className="bg-green-400 text-white border-2 border-green-400 hover:bg-transparent hover:text-green-400 p-2 rounded-lg hover:border-2 hover:border-white transition-all ease-in-out duration-200 mb-5 hover:cursor-pointer "
                onClick={() => {
                  const text = document.getElementById("logicBox").value;

                  setLogic(text);
                }}
              >
                Submit
              </p>
            </div>
          </div>
        </div>
        {/*Counter Section */}
        <div className="flex flex-row items-center justify-evenly mt-5  gap-5 flex-wrap">
          <div className="w-fit h-fit  md:w-36 md:h-36 text-black p-3 shadow-lg shadow-black rounded-lg ">
            <h3 className="os text-lg md:text-2xl">Heading</h3>
            {name.length > 0 ? iconRender(1) : iconRender(0)}
          </div>
          <div className="w-fit h-fit md:w-36 md:h-36 text-black p-3 shadow-lg shadow-black rounded-lg ">
            <h3 className="os text-lg md:text-2xl">Explain</h3>
            {explanation.length > 0 ? iconRender(1) : iconRender(0)}
          </div>
          <div className="w-fit h-fit md:w-36 md:h-36 text-black p-3 shadow-lg shadow-black rounded-lg ">
            <h3 className="os text-2xl text-center">Code</h3>
            {code.length > 0 ? iconRender(1) : iconRender(0)}
          </div>
          <div className="w-fit h-fit md:w-36 md:h-36 text-black p-3 shadow-lg shadow-black rounded-lg ">
            <h3 className="os text-2xl text-center">Logic</h3>
            {logic.length > 0 ? iconRender(1) : iconRender(0)}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-20">
          <p
            className=" os text-2xl bg-green-500 text-white border-2 border-green-500 hover:scale-125  p-2 rounded-lg  transition-all ease-in-out duration-200 mb-5"
            onClick={checkForErrors}
          >
            Start Uploading <FontAwesomeIcon icon={faRocket} />
          </p>
        </div>
        <p className="mb-20"></p>
        {error ? <Error errorCode={errorCode} /> : <></>}
        <p className="mb-20"></p>
      </div>
      <div
        className={
          loading
            ? "contentPic h-screen w-screen flex flex-col items-center justify-center"
            : "hidden"
        }
      >
        <div className={uploading ? "block" : "hidden"}>
          <Triangle color="green" height="300" width="300" />
          <h2 className="os text-white text-3xl text-center">
            Uploading Files
          </h2>
        </div>
        <div className={indexing ? "block" : "hidden"}>
          <Triangle color="green" height="300" width="300" />
          <h2 className="os text-white text-3xl text-center">Indexing Files</h2>
        </div>
        <div
          className={
            complete ? "flex flex-col items-center justify-center" : "hidden"
          }
        >
          <div className="relative">
            <Triangle color="green" height="300" width="300" />

            <FontAwesomeIcon
              className="text-5xl text-green-400 absolute  icon"
              icon={faCheckCircle}
            />
          </div>
          <h2 className="os text-white text-3xl text-center">
            Successfully Uploaded Files
          </h2>
        </div>
      </div>
    </div>
  );
}

const Error = ({ errorCode }) => {
  return (
    <div className="flex flex-col items-center justify-center  w-screen h-fit os">
      <div className="p-2 rounded-lg bg-red-600 text-center">
        <h1 className="text-2xl text-white">Error While Uploading</h1>
        <p>{`Error Code: ${errorCode}`}</p>
        {errorCode === 1 ? (
          <h1 className="text-white text-xl">
            Chapter Not Selected, Please Select a Chapter
          </h1>
        ) : (
          <h1 className="text-white text-xl">
            A value is missing, Please check the counters
          </h1>
        )}
      </div>
    </div>
  );
};

const Chapters = ({ name }) => {
  return (
    <div className="p-2 rounded-lg shadow-md shadow-black os hover:cursor-pointer">
      <h1 className="text-green-400 text-xl ">{`${name}`}</h1>
    </div>
  );
};
