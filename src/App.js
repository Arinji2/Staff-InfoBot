import React, { useState } from "react";
import { auth, db } from "./firebase-config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Uploader from "./pages/executive/uploader";
import MenuSelector from "./pages/menuSelector";
import Choose from "./pages/writer/choose";
import Creator from "./pages/writer/creator";
import WHome from "./pages/writer/home";
import DHome from "./pages/developer/home";
import DevUploader from "./pages/developer/uploader";
import DevPattern from "./pages/developer/patterns";
function App() {
  const [docObj, setDocObj] = useState({});
  const loginwithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then(() => {
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

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Main login={loginwithGoogle} docObj={docObj} />}
          ></Route>
          <Route path="/WriterHome" element={<WHome docObj={docObj} />}></Route>
          <Route path="/Creator" element={<Creator docObj={docObj} />}></Route>
          <Route path="/Choose" element={<Choose docObj={docObj} />}></Route>
          <Route
            path="/Uploader"
            element={<Uploader docObj={docObj} />}
          ></Route>
          <Route
            path="/menu"
            element={<MenuSelector docObj={docObj} />}
          ></Route>
          <Route path="/DevHome" element={<DHome docObj={docObj} />}></Route>
          <Route
            path="/DevUploader"
            element={<DevUploader docObj={docObj} />}
          ></Route>
          <Route
            path="/DevPattern"
            element={<DevPattern docObj={docObj} />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

function Main({ login, docObj }) {
  return (
    <div>
      <div>
        <div className="absolute h-screen hero w-screen -z-10 blur-sm"></div>
        <p className="p-20"></p>
        <div className=" flex flex-col items-center justify-center">
          <h1 className="text-5xl md:text-8xl pt-10 text-yellow-400 text-center">
            InfoBot Staff
          </h1>
          <p className="p-10"></p>
          <Link to="/menu" state={{ docObj: docObj }}>
            <button
              className="mt-10 text-2xl  bg-white scale-90 hover:scale-100 hover:bg-yellow-400  text-black-950 rounded-lg p-3 transition-all ease-in-out duration-300 os"
              onClick={login}
            >
              Login with Google
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default App;
