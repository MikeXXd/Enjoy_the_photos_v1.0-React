import { useEffect } from "react";

export function SearchForm({
  handleSubmit,
  inputRef,
  result,
  isInputError,
  isLoading,
  previousSearch,
}) {


  useEffect(() => {
    inputRef.current.value = "";
  }, [result]);

  return (
    <>
      <div className="dashboard-item dashboard-input-search ">
        <form onSubmit={handleSubmit} >
          <div className="input-group form-control bg-dark" id="form">
            {isInputError ? (
              <label htmlFor="inputQuery" className="input-error">
                {isInputError}
              </label>
            ) : previousSearch[0] !== undefined ? (
              <label htmlFor="inputQuery" className="input-label">
                Current search of: <strong>{previousSearch[0]} </strong>
              </label>
            ) : undefined}

            <input
            autoFocus
              className="btn btn-outline-info input-search"
              id="inputQuery"
              type="text"
              name="photo"
              placeholder={
                previousSearch[0] !== undefined
                  ? "search another photos"
                  : "search for photos"
              }
              ref={inputRef}
              aria-label="search photos"
            />
            <button className="btn btn-outline-info" type="submit" name="query">
              Search
            </button>
            {previousSearch.length > 0 ? (
              <button
                type="onSubmit"
                name="nextQuery"
                className="btn btn-outline-info"
              >
                {"more of " + previousSearch[0]}
              </button>
            ) : undefined}
          </div>
          {isLoading && <h2>Is loading...</h2>}
        </form>
      </div>
    </>
  );
}
