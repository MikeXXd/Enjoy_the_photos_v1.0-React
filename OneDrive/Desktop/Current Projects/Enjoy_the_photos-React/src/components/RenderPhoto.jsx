import { useEffect, useState } from "react";
import { FaHeart, FaDownload, FaInfo } from "react-icons/fa";
import { ImEnlarge } from "react-icons/im";

const imageSizeOptions = [
  { size: "big", url: "regular" },
  { size: null, url: "small" },
  { size: null, url: "small" },
  { size: "tall", url: "regular" },
  { size: "wide", url: "regular" },
];

export function RenderPhoto({ photo, galery, setGalery }) {
  const [imageSize, setImageSize] = useState(
    Math.floor(Math.random() * imageSizeOptions.length) //by default it  sets random size of image
  );
  const [showIcons, setShowIcons] = useState(false);
  const [ imageHaveBorder, setImageHaveBorder ] = useState(false);

useEffect(() => {
  setImageHaveBorder(true)

  setTimeout(() => { setImageHaveBorder(false)}, 500 )
}, [imageSize])

  const handleMouseEnter = () => {
    setShowIcons(true);
  };

  const handleMouseLeave = () => {
    setShowIcons(false);
  };

  const handleIconClick = (action) => {
    switch (action) {
      case "like":
        setGalery(state => [...state, photo])
        break;
      case "download":
        console.log("download icon");
        break;
      case "info":
        console.log("info icon");
        break;
      case "enlarge":
        setImageSize(0);
        break;
      default:
        break;
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`photo-container lazy-load ${imageSizeOptions[imageSize].size} ${imageHaveBorder && "photo-container-border"}`}
      style={{ backgroundImage: photo.urls.thumb }}
    >
      <img
        src={photo.urls[imageSizeOptions[imageSize].url]}
        alt={photo.alt_description + ' "unsplash.com" '}
        loading="lazy"
      />
      {imageSizeOptions[imageSize].size !== "big" && showIcons && (
        <div className="icon-container-enlarge">
          <ImEnlarge
            // size="2.5rem"
            onClick={() => handleIconClick("enlarge")}
          />
        </div>
      )}
      {showIcons && (
        <div className="icon-container">
          <FaHeart
            onClick={() => handleIconClick("like")}
          />
          <FaDownload
            onClick={() => handleIconClick("download")}
          />
          <FaInfo
            onClick={() => handleIconClick("info")}
          />
        </div>
      )}
    </div>
  );
}
