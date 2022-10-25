import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheckCircle } from "@fortawesome/fontawesome-free-regular";
import { faCode, faUserTie } from "@fortawesome/fontawesome-free-solid";
import { auth, db } from "../firebase-config";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import "./pages.css";
function MenuSelector() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [docObj, setDocObj] = useState({});
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

  const loginwithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then(() => {
        setIsLoggedIn(true);
        getDocs();
      })
      .catch((error) => {
        console.log("Error" + error);
      });
  };
  const getDocs = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    setDocObj(docSnap.data());
  };
  const showBox = (option) => {
    if (option === 1) {
      return (
        <div
          className="w-40 h-20 flex flex-col items-center text-black shadow-black shadow-lg p-2 bg-blue-600 rounded-lg hover:scale-90 transition-all duration-300 ease-in-out hover:cursor-pointer"
          onClick={() => {
            window.location.assign("/CreateProgram");
          }}
        >
          <h1>Writer</h1>
          <FontAwesomeIcon className="" icon={faEdit} />
        </div>
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
        <div className="w-40 h-20 flex flex-col items-center text-black shadow-black shadow-lg p-2 bg-white rounded-lg hover:scale-90 transition-all duration-300 ease-in-out hover:cursor-pointer">
          <h1>Executive</h1>
          <FontAwesomeIcon className="" icon={faUserTie} />
        </div>
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
        <div>
          <h1 className="os text-yellow-400 text-3xl">Login to Access</h1>
          <button
            className="mt-10 text-2xl  bg-white scale-90 hover:scale-100 hover:bg-yellow-400  text-black-950 rounded-lg p-3 transition-all ease-in-out duration-300 os"
            onClick={loginwithGoogle}
          >
            Login with Google
          </button>
        </div>
      );
    }
  };

  return (
    <div>
      <div className="absolute h-screen hero w-screen -z-10 blur-sm"></div>
      <p className="p-20"></p>
      <div className=" flex flex-col items-center justify-center m-4 text-center">
        {isLoggedIn ? menuShow(1) : menuShow(0)}
      </div>
    </div>
  );
}

export default MenuSelector;
