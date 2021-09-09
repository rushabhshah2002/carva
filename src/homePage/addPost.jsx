import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
const AddPost = ({setMode,setpostDetail,postDetail,handlePost}) => {
  const [cropImage, setCropedImage] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 16 / 9 });
  const [completedCrop, setCompletedCrop] = useState(null);

  const onSelectFile = (e) => {
    setShowImage(false);
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };


  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
    var dataURL = canvas.toDataURL();

    setCropedImage(dataURL);
  }, [completedCrop]);

  return (
    <div
      className=""
      style={{ width: "400px", height: "500px", backgroundColor: "red" }}
    >
        <div className="">
            <button onClick={()=>{
                setMode(false)
            }}>close</button>
        </div>
      <div className="">
        {" "}
        <input
          type="text"
          placeholder="title"
          style={{ width: "350px", height: "50px" }}
          onChange={(e)=>{
setpostDetail({...postDetail,title:e.target.value})
          }}
        />
        <input
          type="text"
          placeholder="des"
          style={{ width: "350px", height: "50px" }}
          onChange={(e)=>{
            setpostDetail({...postDetail,text_des:e.target.value})
                      }}
        />
        {cropImage && showImage && (
          <div className="">
            <img
              src={cropImage}
              alt="reload"
              style={{
                width: Math.round(completedCrop?.width ?? 0),
                height: Math.round(completedCrop?.height ?? 0),
              }}
            ></img>
            <button
              onClick={() => {
                setCropedImage("");
                setUpImg("");
                setpostDetail({...postDetail,image:'none'})
              }}
            >
              delete
            </button>
          </div>
        )}
      </div>
      <div className="addImage">
        <input
          type="file"
          id="1"
          accept="image/*"
          onChange={onSelectFile}
          style={{ display: "none" }}
        />
        <label htmlFor="1">add Image</label>
      </div>

      {upImg && (
        <div className="">
          <ReactCrop
            src={upImg}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
          />
          <canvas
            ref={previewCanvasRef}
            // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
            style={{
              display: "none",
              width: Math.round(completedCrop?.width ?? 0),
              height: Math.round(completedCrop?.height ?? 0),
            }}
          />
          <button
            onClick={() => {
              var a = document.getElementById("1");
              console.log(a.value);
              setShowImage(true);
              setUpImg("");
              setpostDetail({...postDetail,image:cropImage})
    
            }}
          >
            add
          </button>
          <button
            onClick={() => {
              setCropedImage("");
              setUpImg("");
            }}
          >
            back
          </button>
        </div>
      )}
      <button onClick={handlePost}>post</button>
    </div>
  );
};

export default AddPost;
