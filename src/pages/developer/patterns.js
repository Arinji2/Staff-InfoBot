import "../pages.css";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { setDoc, doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/fontawesome-free-solid";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/fontawesome-free-regular";
import { Oval, Triangle } from "react-loader-spinner";
export default function Uploader({ docObj }) {
  useEffect(() => {
    // if (docObj.developer !== true) window.location.assign("/Error-Perms");
  });

  const [number, setNumber] = useState("");
  const [display, setDisplay] = useState("");
  const [code, setCode] = useState("");
  const [logic, setLogic] = useState("");
  const [chapter, setChapter] = useState("patterns");
  const [chapterSelected, setChapterSelected] = useState(true);

  const [uploading, setUploading] = useState(false);
  const [indexing, setIndexing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  const [error, setError] = useState(false);
  const [errorCode, setErrorCode] = useState(0);

  const checkForErrors = () => {
    if (chapterSelected === false) {
      setError(true);
      setErrorCode(1);
    } else if (
      display.length === 0 ||
      code.length === 0 ||
      logic.length === 0
    ) {
      setError(true);
      setErrorCode(2);
    } else getNumber();
  };

  const getNumber = async () => {
    setLoading(true);
    const docRef = doc(db, "locations", "patterns");
    const list = await getDoc(docRef);
    setNumber(list.data().files.length);
  };
  useEffect(() => {
    if (number !== "") {
      setError(false);
      setUploading(true);
      uploadFile();
    }
    // eslint-disable-next-line
  }, [number]);

  const uploadFile = async () => {
    const num = number.toString();
    const docRef = doc(db, chapter, num);
    setDoc(docRef, {
      code: code,
      display: display,
      logic: logic,
    })
      .then(() => {
        setUploading(false);
        setIndexing(true);
        indexFile();
      })
      .catch(() => {
        setError(true);
        setErrorCode(3);
      });
  };

  const indexFile = async () => {
    const docsRef = doc(db, `locations`, chapter);
    updateDoc(docsRef, {
      files: arrayUnion(display),
    })
      .then(() => {
        setIndexing(false);
        setComplete(true);
        setTimeout(() => {
          setComplete(false);
          setLoading(false);
          clearSelections();
        }, 2000);
      })
      .catch(() => {
        setError(true);
        setErrorCode(4);
      });
  };

  const clearSelections = () => {
    setChapter(false);
    setChapterSelected(false);
    setError(false);
    setDisplay("");
    document.getElementById("displayBox").value = "";
    setCode("");
    document.getElementById("codeBox").value = "";
    setLogic("");
    document.getElementById("logicBox").value = "";
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
              Patterns Uploader
            </h1>

            <div className="flex flex-col items-center justify-center gap-5 border-b-2 border-white">
              <h2 className="text-2xl text-white m-5">
                Enter the Program Display
              </h2>
              <input
                type="text"
                className="rounded-lg bg-transparent outline-none shadow-lg shadow-black text-center"
                id="displayBox"
                autoComplete="off"
              />
              <p
                className="bg-green-400 text-white border-2 border-green-400 hover:bg-transparent hover:text-green-400 p-2 rounded-lg hover:border-2 hover:border-white transition-all ease-in-out duration-200 mb-5 hover:cursor-pointer "
                onClick={() => {
                  const text = document.getElementById("displayBox").value;
                  setDisplay(text);
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
          <div className="w-fit h-fit md:w-36 md:h-36 text-black p-3 shadow-lg shadow-black rounded-lg ">
            <h3 className="os text-lg md:text-2xl">Display</h3>
            {display.length > 0 ? iconRender(1) : iconRender(0)}
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
          <></>
        )}
        {errorCode === 2 ? (
          <h1 className="text-white text-xl">
            A value is missing, Please check the counters
          </h1>
        ) : (
          <></>
        )}
        {errorCode === 3 ? (
          <h1 className="text-white text-xl">Error Whilst Uploading</h1>
        ) : (
          <></>
        )}
        {errorCode === 4 ? (
          <h1 className="text-white text-xl">Error Whilst Indexing</h1>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
