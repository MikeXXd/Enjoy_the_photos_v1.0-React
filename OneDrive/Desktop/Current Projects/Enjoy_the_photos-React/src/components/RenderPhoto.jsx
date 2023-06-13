import { useEffect, useState } from "react";
import { FaHeart, FaDownload, FaInfo } from "react-icons/fa";
import { ImEnlarge, ImEnlarge2 } from "react-icons/im";

const imageSizeOptions = [
  { size: "big", url: "regular" },
  { size: null, url: "small" },
  { size: null, url: "small" },
  { size: "tall", url: "regular" },
  { size: "wide", url: "regular" },
  { size: "big", url: "full" } /* this position is for enlargedOver */,
];

export function RenderPhoto({
  photo,
  galery,
  setGalery,
  activatedGalery,
  setActivatedGalery,
}) {
  const [imageSize, setImageSize] = useState(
    Math.floor(Math.random() * (imageSizeOptions.length - 1)) //by default it  sets random size of image, length -1 for not including last array position with url:"full" reserved for enlargedOver
  );
  const [showIcons, setShowIcons] = useState(false);
  const [imageHaveBorder, setImageHaveBorder] = useState(false);
  const [enlargedOver, setEnlargedOver] = useState(false);
  const [isInGalery, setIsInGalery] = useState(() => {
    if (galery.length < 1) return false;
    else return galery.some((item) => photo.id === item.id);
  });

  useEffect(() => {
    setImageHaveBorder(true);

    setTimeout(() => {
      setImageHaveBorder(false);
    }, 1000);
  }, [imageSize]);

  const handleMouseEnter = () => {
    setShowIcons(true);
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
        console.log("download icon");
        break;
      case "info":
        console.log("info icon");
        break;
      case "enlarge":
        setImageSize(0);
        break;
      case "enlargeOver":
        setEnlargedOver((value) => !value);
        setImageSize(imageSizeOptions.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`photo-container lazy-load ${
        imageSizeOptions[imageSize].size
      } ${imageHaveBorder && "photo-container-border"} ${
        enlargedOver && "enlarged-over"
      }`}
      style={{ backgroundImage: photo.urls.thumb }}
    >
      <img
        src={photo.urls[imageSizeOptions[imageSize].url]}
        alt={photo.alt_description + ' "unsplash.com" '}
        // className={null}
        loading="lazy"
      />
      {showIcons && (
        <div className="icon-container-enlarge">
          {imageSizeOptions[imageSize].size !== "big" && (
            <ImEnlarge2 onClick={() => handleIconClick("enlarge")} />
          )}
          <ImEnlarge onClick={() => handleIconClick("enlargeOver")} />
        </div>
      )}
      {showIcons && (
        <div className="icon-container">
          <FaHeart
            onClick={() => handleIconClick("like")}
            color={isInGalery ? "red" : "pink"}
          />
          <FaDownload
            color="pink"
            onClick={() => handleIconClick("download")}
          />
          <FaInfo color="pink" onClick={() => handleIconClick("info")} />
        </div>
      )}
    </div>
  );
}
