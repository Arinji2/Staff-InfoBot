import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus, faMinus } from "@fortawesome/fontawesome-free-solid";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import { storage } from "../../firebase-config";
import { getDownloadURL, ref } from "firebase/storage";
import { Oval, Triangle } from "react-loader-spinner";
function Choose({ docObj }) {
  const [weekNum, setWeekNum] = useState(0);
  const [fileUrl, setFileUrl] = useState("");
  const [showPdf, setShowPdf] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [changeView, setChangeView] = useState(false);
  const [view] = useState("w-full h-screen contentPic relative rounded-lg ");
  const [openView] = useState("w-full h-full contentPic relative rounded-lg ");

  function onDocumentLoadSuccess({ numPages }) {
    setChangeView(true);
    setNumPages(numPages);
    setPageNumber(1);
  }

  function loading() {
    setChangeView(false);
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-yellow-400 os text-2xl">Loading...</h1>
        <Oval secondaryColor="transparent" color="blue" />
      </div>
    );
  }
  function error() {
    setChangeView(false);
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-red-600 os text-2xl">File Cannot Be Found.</h1>
      </div>
    );
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const locate = () => {
    const fileName = "week-" + weekNum;
    const docsRef = ref(storage, "Lists/" + fileName);
    getDownloadURL(docsRef)
      .then((e) => {
        setFileUrl(e);
        setShowPdf(true);
      })
      .catch((error) => {
        setFileUrl("error");
      });
  };

  const render = (option) => {
    if (option === 1) {
      return (
        <div className="mt-5">
          <Document
            file={fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={loading}
            error={error}
          >
            <Page
              pageNumber={pageNumber}
              width={700}
              scale={1.0}
              className="hidden md:block"
            />
            <Page
              pageNumber={pageNumber}
              width={450}
              scale={1.0}
              className="block md:hidden"
            />
          </Document>
          <div>
            <p className="text-blue-600 os text-xl">
              {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
            </p>
            <div className="flex flex-row items-center justify-center">
              <button
                type="button"
                disabled={pageNumber >= numPages}
                onClick={nextPage}
                className="m-2 text-yellow-400 scale-90 hover:scale-100 transition-all ease-in-out duration-300 os border-2 border-white rounded-lg p-2"
              >
                +
              </button>

              <button
                type="button"
                disabled={pageNumber <= 1}
                onClick={previousPage}
                className="m-2 text-yellow-400 scale-90 hover:scale-100 transition-all ease-in-out duration-300 os border-2 border-white rounded-lg p-2"
              >
                -
              </button>
            </div>
          </div>
          <p className="m-20"></p>
        </div>
      );
    }
  };

  return (
    <div className="text-center text-3xl text-white flex flex-col items-center justify-center -z-20">
      <div className={changeView ? openView : view}>
        <h1 className="os font-bold text-blue-600 text-4xl">List Viewer</h1>
        <h2 className="mt-5 os">Type a Week Number to See its List</h2>
        <input
          autoComplete="off"
          placeholder="0"
          id="heading"
          className="text-center rounded-md p-1 bg-transparent shadow-lg shadow-black content text-lg text-white outline-none scale-90 md:hover:scale-100 md:focus:scale-100 hover:shadow-md focus:shadow-md hover:shadow-yellow-400 focus:shadow-yellow-400 w-14  transition-all ease-in-out duration-500"
          onChange={(event) => {
            event.target.value = parseInt(
              event.target.value.toLowerCase().trim()
            );
            if (isNaN(event.target.value) === true) event.target.value = "";
            setWeekNum(event.target.value);
          }}
        ></input>
        <div className="flex flex-col items-center justify-center mt-10">
          <h2
            className="text-xl border-2 border-blue-600 os w-fit bg-blue-600 p-2 rounded-lg scale-90 hover:scale-100 focus:scale-100 transition-all ease-in-out duration-300 hover:cursor-pointer"
            onClick={locate}
          >
            Search <FontAwesomeIcon icon={faSearch} />
          </h2>
          {showPdf ? render(1) : render(0)}
        </div>
      </div>
    </div>
  );
}

export default Choose;
