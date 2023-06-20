import { useEffect, useState } from "react";
import { FaInfo } from "react-icons/fa";
import { RxOpenInNewWindow } from "react-icons/rx";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { SlSizeFullscreen, SlSizeActual } from "react-icons/sl";
import { IoIosResize } from "react-icons/io";
import img from "../images/jahoda.png";

const imageSizeOptions = [
  { size: "big", url: "regular" },
  { size: null, url: "small" },
  { size: null, url: "small" },
  { size: "tall", url: "regular" },
  { size: "wide", url: "regular" },
  { size: "big", url: "full" } /* this position is for enlargedOver */,
];

export function RenderPhoto({ photo, galery, setGalery, results }) {
  const [imageSize, setImageSize] = useState(
    () =>
      results.length < 4
        ? 0
        : Math.floor(Math.random() * (imageSizeOptions.length - 1)) //by default it  sets random size of image, length -1 for not including last array position with url:"full" reserved for enlargedOver
  );
  const [showIcons, setShowIcons] = useState(false);
  const [imageHaveBorder, setImageHaveBorder] = useState(false);
  const [loadingBorder, setLoadingBoarder] = useState(false);
  const [enlargedOver, setEnlargedOver] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isInGalery, setIsInGalery] = useState(() => {
    if (galery.length < 1) return false;
    else return galery.some((item) => photo.id === item.id);
  });

  useEffect(() => {
    setLoadingBoarder(true);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowInfo(false);
    }, 20000);
  }, [showInfo]);

  const handleMouseEnter = () => {
    setShowIcons(true);
    setImageHaveBorder(false);
  };

  const handleMouseLeave = () => {
    setShowIcons(false);
  };

  const handleIconClick = (action) => {
    switch (action) {
      case "like":
        if (!isInGalery) {
          setGalery((state) => [{ ...photo }, ...state]);
          setIsInGalery(true);
        } else {
          setGalery((current) =>
            current.filter((item) => {
              return item.id !== photo.id;
            })
          );
          setIsInGalery(false);
        }
        break;
      case "download":
        window.open(photo.urls.full);
        break;
      case "info":
        setShowInfo(true);
        console.log("info icon");
        break;
      case "enlarge":
        setImageSize(0);
        setImageHaveBorder(true);
        break;
      case "enlargeOver":
        setEnlargedOver((value) => !value);
        setImageSize(imageSizeOptions.length - 1);
        break;
      default:
        break;
    }
  };

  const handleLoaded = () => {
    setLoadingBoarder(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`photo-container blur-load ${
        imageSizeOptions[imageSize].size
      } ${imageHaveBorder  && "photo-container-border"} ${
        enlargedOver && "enlarged-over"
      } ${loadingBorder && "loading-border color-transition"}`}
      style={{ backgroundImage: `url(${photo.urls.thumb})`}}
    >
      <img
      className={loadingBorder? "img-loading" : "img-loaded"}
        src={photo.urls[imageSizeOptions[imageSize].url]}
        alt={photo.alt_description + ' "unsplash.com" '}
        loading="lazy"
        onLoad={handleLoaded}
      />
      {showIcons && (
        <div className="icon-container-enlarge">
          {imageSizeOptions[imageSize].size !== "big" && (
            <IoIosResize onClick={() => handleIconClick("enlarge")} />
          )}
          {enlargedOver ? (
            <SlSizeActual onClick={() => handleIconClick("enlargeOver")} />
          ) : (
            <SlSizeFullscreen onClick={() => handleIconClick("enlargeOver")} />
          )}
        </div>
      )}
      {showIcons && (
        <div className="icon-container">
          {isInGalery ? (
            <AiFillHeart onClick={() => handleIconClick("like")} color="red" />
          ) : (
            <AiOutlineHeart
              onClick={() => handleIconClick("like")}
              color="pink"
            />
          )}
          <FaInfo color="pink" onClick={() => handleIconClick("info")} />
          <RxOpenInNewWindow
            color="pink"
            onClick={() => handleIconClick("download")}
          />
        </div>
      )}
      {showInfo && (
        <div className="photo-info-container">
          <figure class="text-center">
            <blockquote class="blockquote">
              <p>{photo.description}</p>
            </blockquote>
            <figcaption class="blockquote-footer custom-figcaption">
              taken by {photo.user.name}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
