import React, { useState, useEffect } from "react";
import "./AddImg.css";
import { useParams } from "react-router-dom";
import useApi from "../../services/useApi";

function AddImg() {
  // const [src, setSrc] = useState("");
  // const [projectId, setPorjectId] = useState("");
  const [file, setFile] = useState();
  const api = useApi();
  const { projectId } = useParams();
  const [images, setImages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("projectId", projectId);

    api.post("/img", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  useEffect(() => {
    api
      .get(`/img/project/${projectId}`)
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, [api, projectId]);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          accept="image/*"
        />
        <button type="submit">Submit</button>
      </form>
      {images.map((image) => (
        <img
          key={image.id}
          src={`${import.meta.env.VITE_BACKEND_URL}/img/${image.src}`}
          alt="pic"
        />
      ))}
    </div>
  );
}

export default AddImg;
