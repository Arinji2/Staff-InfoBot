import "../pages.css";
import React, { useState, useEffect } from "react";
import { storage, auth } from "../../firebase-config";
import { uploadBytes, ref } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faArrowAltCircleLeft,
} from "@fortawesome/fontawesome-free-solid";
import { faCheckCircle } from "@fortawesome/fontawesome-free-regular";
import { ThreeCircles } from "react-loader-spinner";
export default function Uploader({ docObj }) {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [questions, setQuestions] = useState();
  const [securityCode, setSecurityCode] = useState(0);
  const [received, setReceived] = useState(false);
  const [fileUid, setFileUid] = useState();
  const [upload, setUpload] = useState(0);
  const [reRender, setReRender] = useState(false);

  function beginUpload() {
    if (securityCode !== "453212") {
      window.location.assign("/Error?ScCode");
    }

    setFileUid(Math.round(Math.random() * 1000));
    const metadata = {
      customMetadata: {
        Uid: fileUid,
        Questions: questions,
        User: auth.currentUser.displayName,
        Email: auth.currentUser.email,
      },
    };
    const docsRef = ref(storage, "Lists/" + fileName);
    uploadBytes(docsRef, file, metadata).then(() => {
      setReRender(true);
      setUpload(1);
      setTimeout(() => {
        setUpload(2);
      }, 2000);
    });
  }

  function handleUpload(event) {
    setFile(event.target.files[0]);
    setReceived(true);
  }

  const uploadStatus = (option) => {
    if (option === 1)
      return (
        <div className="h-screen flex flex-col items-center justify-center relative bottom-32">
          <h1 className="os text-3xl mb-5 font-bold">Uploading</h1>
          <ThreeCircles
            height="150"
            width="150"
            innerCircleColor="green"
            middleCircleColor="green"
            outerCircleColor="green"
          />
        </div>
      );
    else if (option === 2)
      return (
        <div className="h-screen flex flex-col items-center justify-center relative bottom-32">
          <h1 className="os text-3xl mb-5 font-bold">Uploaded</h1>
          <FontAwesomeIcon
            className="text-green-500 text-4xl"
            icon={faCheckCircle}
          />
          <div className="flex flex-row items-center justify-center mt-5">
            <h2
              className="text-xl  os w-fit bg-white text-yellow-400 p-2 rounded-lg scale-90 hover:scale-100 focus:scale-100 transition-all ease-in-out duration-300 hover:cursor-pointer"
              onClick={() => {
                window.location.assign("/");
              }}
            >
              Back to Menu <FontAwesomeIcon icon={faArrowAltCircleLeft} />
            </h2>
          </div>
        </div>
      );
  };
  const showLoader = (option) => {
    if (option === 1 && reRender === false) {
      return (
        <div className="transition-all duration-200 ease-in-out">
          <span className="os">File Name: </span>
          <input
            type="text"
            autoComplete="off"
            placeholder="week-4"
            className="mt-5 text-2xl bg-black text-white shadow-lg shadow-black text-center p-2 rounded-lg w-40 outline-none"
            onChange={(event) => {
              event.target.value = event.target.value.toLowerCase().trim();
              setFileName(event.target.value);
              console.log();
            }}
          ></input>
          <br></br>
          <span className="os">Number of Questions: </span>
          <input
            type="text"
            placeholder="14"
            autoComplete="off"
            className="mt-5 text-2xl bg-black text-white shadow-lg shadow-black text-center p-2 rounded-lg w-12 outline-none"
            onChange={(event) => {
              event.target.value = parseInt(
                event.target.value.toLowerCase().trim()
              );
              if (isNaN(event.target.value) === true) event.target.value = "";
              setQuestions(event.target.value);
            }}
          ></input>
          <br></br>
          <span className="os">Security Key: </span>
          <input
            type="password"
            placeholder="******"
            autoComplete="off"
            className="mt-5 text-2xl bg-black text-white shadow-lg shadow-black text-center p-2 rounded-lg w-20 outline-none"
            onChange={(event) => {
              event.target.value = parseInt(
                event.target.value.toLowerCase().trim()
              );
              if (isNaN(event.target.value) === true) event.target.value = "";
              if (event.target.value.length > 6) {
                alert("Greater than 6 Digits");
                event.target.value = "";
                setSecurityCode("");
              }
              setSecurityCode(event.target.value);
            }}
          ></input>
          <h2 className="text-2xl text-red-600 os font-bold mt-5">
            Your Email will be Logged during this Operation.
          </h2>
          <div className="text-xl text-yellow-400 content mt-5">
            <span className="text-2xl text-white os">Current User: </span>
            {auth.currentUser.email}
          </div>
          <div className="flex flex-row items-center justify-center mt-5">
            <h2
              className="text-xl border-2 border-green-500 os w-fit bg-green-500 p-2 rounded-lg scale-90 hover:scale-100 focus:scale-100 transition-all ease-in-out duration-300 hover:cursor-pointer"
              onClick={beginUpload}
            >
              Click to Start Upload <FontAwesomeIcon icon={faRocket} />
            </h2>
          </div>
        </div>
      );
    } else return <div></div>;
  };
  useEffect(() => {
    if (docObj.executive !== true) window.location.assign("/Error?Perms");
  });
  return (
    <div className="text-center text-3xl text-white flex flex-col items-center justify-center -z-20">
      <div className="w-full h-screen contentPic relative rounded-lg">
        <h1 className="text-4xl os font-bold text-yellow-400">Uploader</h1>
        <div className="flex flex-col items-center justify-center">
          <form>
            <input
              id="image"
              type="file"
              name="image"
              onChange={handleUpload}
            />
            <button
              className="os text-white shadow-black shadow-lg mt-10 p-3 rounded-lg scale-90 hover:scale-100"
              id="image_alt"
              type="button"
              onClick={() => {
                document.getElementById("image").click();
              }}
            >
              Select File
            </button>
          </form>
          {received ? showLoader(1) : showLoader(0)}
          {reRender ? uploadStatus(upload) : uploadStatus(0)}
        </div>
      </div>

      <p className="mb-20"></p>
    </div>
  );
}
