import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { baseUrl, clientId } from "./api/clientId";
import { SearchForm } from "./components/SearchForm";
import { RenderPhoto } from "./components/RenderPhoto";
import { FaUnsplash } from "react-icons/fa";

const LOCAL_STORAGE_KEY = "Enjoy_the_photo_galery";

const App = () => {
  const inputRef = useRef("");
  const [galery, setGalery] = useState(() => {
    const getGalery = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (getGalery == null || undefined) return [];
    return JSON.parse(getGalery);
  });
  const [activatedGalery, setActivatedGalery] = useState(false);
  const [results, setResults] = useState([]);
  const [isInputError, setInputError] = useState(false);
  const [isError, setIsError] = useState("");
  const [previousSearch, setPreviouSearch] = useState("");
  const [pageNo, setPageNo] = useState(1);

  console.log("results: ", results);
  console.log("galery: ", galery);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(galery));
  }, [galery]);


  function getData(pageNo, query) {
    const controller = new AbortController();
    const signal = controller.signal;
  
    const url =
      baseUrl +
      pageNo +
      "&per_page=15&query=" /* photos per page */ +
      query +
      "&client_id=" +
      clientId;
  
    return axios
      .get(url, {
        signal,
      })
      .then((res) => {
        const results = res.data.results;
        setResults(results);
        if (results.length === 0) {
          setIsError('no result for search of "' + query + '"');
          setPreviouSearch("")
        }
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Request aborted:", error.message);
        } else {
          setIsError(error.message);
          console.log(error.message);
        }
      });
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    setInputError(false);
    setIsError("");

    const clickedButton = e.nativeEvent.submitter;
    const buttonName = clickedButton.getAttribute("name");

    switch (buttonName) {
      case "query":
        if (inputRef.current.value == "") {
          setInputError("Please write a word for query");
        } else {
          setActivatedGalery(false);
          setResults([]);
          setPageNo(1);
          getData(pageNo, inputRef.current.value);
          setPageNo((current) => current + 1);
          setPreviouSearch(inputRef.current.value);
        }

        break;
      case "nextQuery":
        setActivatedGalery(false);
        setResults([]);
        getData(pageNo, previousSearch);
        setPageNo((current) => current + 1);
        break;
      case "galery":
        setActivatedGalery(true);
        setResults(galery);
        // setPageNo((current) => current + 1);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="dashboard">
        <div className="dashboard-item dashboard-heading">
          <div className="app-name">
            <h1>Enjoy the photos</h1>
            <span>
              powered by{""}
              <a href="https://unsplash.com/">
                <FaUnsplash size="20" /> Unsplash
              </a>
            </span>
          </div>
        </div>
        <SearchForm
          handleSubmit={handleSubmit}
          inputRef={inputRef}
          isError={isError}
          results={results}
          isInputError={isInputError}
          previousSearch={previousSearch}
          galery={galery}
          activatedGalery={activatedGalery}
        />
      </div>
      {isError && (
        <h2 style={{ color: "red", textAlign: "center" }}>{isError}</h2>
      )}
      <div className="grid-wrapper ">
        {results.map((photo) => {
          return (
            <RenderPhoto
              key={photo.id}
              photo={photo}
              galery={galery}
              setGalery={setGalery}
              results={results}
            />
          );
        })}
      </div>
    </>
  );
};

export default App;
