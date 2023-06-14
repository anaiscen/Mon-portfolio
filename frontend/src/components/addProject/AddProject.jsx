import React, { useState } from "react";
import "./AddProject.css";
import useApi from "../../services/useApi";

function AddProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [webSiteLink, setWebSiteLink] = useState("");
  const [gitHubLink, setGitHubLink] = useState("");
  const [success, setSuccess] = useState(false);
  const api = useApi();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      title,
      description,
      date,
      webSiteLink,
      gitHubLink,
    };
    api
      .post("/project", newProject)
      .then((res) => {
        console.warn(res);
        setSuccess(true);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  return (
    <div className="addProjectContainer">
      <h1>AJOUTER UN PROJET</h1>
      {success ? (
        <section className="addProjectSection successMessage">
          Projet créé
        </section>
      ) : (
        <form onSubmit={handleSubmit} className="addProjectForm">
          <label htmlFor="title" className="addProjectLabel">
            Titre :
            <input
              type="text"
              className="addProjectFormInput"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label htmlFor="description" className="addProjectFormLabel">
            Description :
            <input
              type="text"
              className="addProjectFormInput"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label htmlFor="date" className="addProjectFormLabel">
            Date de création :
            <input
              type="date"
              className="addProjectFormInput"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <label htmlFor="webSiteLink" className="addProjectFormLabel">
            Lien vers le site :
            <input
              type="text"
              className="addProjectFormInput"
              id="webSiteLink"
              value={webSiteLink}
              onChange={(e) => setWebSiteLink(e.target.value)}
            />
          </label>
          <label htmlFor="gitHubLink" className="addProjectFormLabel">
            Lien vers GitHub :
            <input
              type="text"
              className="addProjectFormInput"
              id="gitHubLink"
              value={gitHubLink}
              onChange={(e) => setGitHubLink(e.target.value)}
            />
          </label>
          <button type="submit" className="addUserFormButton">
            Ajouter
          </button>
        </form>
      )}
    </div>
  );
}

export default AddProject;
