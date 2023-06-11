import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { baseUrl, clientId } from "./api/clientId";
import { SearchForm } from "./components/SearchForm";
import { RenderPhoto } from "./components/RenderPhoto";

const LOCAL_STORAGE_KEY = "Enjoy_the_photo_galery";

const App = () => {
  const inputRef = useRef("");
  const [galery, setGalery] = useState(() => {
    const getGalery = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (getGalery == null || undefined) return [];
    return JSON.parse(getGalery);
  });
  const [result, setResult] = useState([]);
  const [isInputError, setInputError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previousSearch, setPreviouSearch] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  console.log("result", result);
  console.log("galery: ", galery);
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(galery));
  }, [galery]);

  function getAxios(pageNo, query) {
    const url =
      baseUrl +
      pageNo +
      "&per_page=15&query=" /* photos per page */ +
      query +
      "&client_id=" +
      clientId;
    return axios.get(url).then((res) => setResult(res.data.results));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const clickedButton = e.nativeEvent.submitter;
    const buttonName = clickedButton.getAttribute("name");

    switch (buttonName) {
      case "query":
        if (inputRef.current.value == "") {
          setInputError("Please write a word for query");
        } else {
          setPageNo(1);
          setInputError(false);
          setIsLoading(true);
          getAxios(pageNo, inputRef.current.value);
          setIsLoading(false);
          setPageNo((current) => current + 1);
          setPreviouSearch((current) => [inputRef.current.value, ...current]);
        }

        break;
      case "nextQuery":
        setIsLoading(true);
        setInputError(false);
        getAxios(pageNo, previousSearch[0]);
        setIsLoading(false);
        setPageNo((current) => current + 1);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="dashboard">
        <div className="dashboard-item dashboard-heading">
          <h1 id="app-name">Enjoy the photos</h1>
        </div>
        <SearchForm
          handleSubmit={handleSubmit}
          inputRef={inputRef}
          result={result}
          isInputError={isInputError}
          isLoading={isLoading}
          previousSearch={previousSearch}
        />
      </div>

      <div className="grid-wrapper ">
        {result.map((photo) => {
          return (
            <RenderPhoto
              key={photo.id}
              photo={photo}
              galery={galery}
              setGalery={setGalery}
            />
          );
        })}
      </div>
    </>
  );
};

export default App;
