import { useEffect } from "react";

export function SearchForm({
  handleSubmit,
  inputRef,
  results,
  isInputError,
  previousSearch,
  galery,
  activatedGalery
}) {
  useEffect(() => {
    inputRef.current.value = "";
  }, [results]);

  return (
    <>
      <div className="dashboard-item dashboard-input-search ">
        <form onSubmit={handleSubmit}>
          <div className="input-group form-control bg-dark" id="form">
            {isInputError ? (
              <label htmlFor="inputQuery" className="input-error">
                {isInputError}
              </label>
            ) : previousSearch !== "" || activatedGalery ? (
              <label htmlFor="inputQuery" className="input-label">
                {activatedGalery ? (<strong> Your GALERY</strong>) : (<span>Current search of: <strong> {previousSearch} </strong></span>)}
              </label>
            ) : undefined}

            <input
              autoFocus
              className="btn btn-outline-info input-search"
              id="inputQuery"
              type="text"
              name="photo"
              placeholder={
                previousSearch !== ""
                  ? "search another photos"
                  : "search for photos"
              }
              ref={inputRef}
              aria-label="search photos"
            />
            <button className="btn btn-outline-info" type="submit" name="query">
              Search
            </button>
            {galery.length > 0 ? <button className={`btn btn-outline-info ${activatedGalery && "active"}`}  type="submit" name="galery">
              GALERY
            </button> : undefined}

            {previousSearch !== "" ? (
              <button
                type="onSubmit"
                name="nextQuery"
                className="btn btn-outline-info"
              >
                {"more of " + previousSearch}
              </button>
            ) : undefined}
          </div>
        </form>
      </div>
    </>
  );
}
