import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../services/useApi";
import "./EditProject.css";

function EditProject() {
  const api = useApi();
  const { id } = useParams();
  const [updatedProject, setUpdatedProject] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    api
      .put(`/project/${updatedProject.id}`, updatedProject)
      .then((res) => {
        console.warn(res);
        setSuccess(true);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const handleInputChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setUpdatedProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    api
      .get(`/project/${id}`)
      .then((res) => {
        setUpdatedProject(res.data);
        console.warn(res.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, [api, id]);

  return (
    <div>
      <h1>MODIFIER LE PROJET</h1>
      {success ? (
        <section className="editProjectSection successMessage">
          Projet mis à jour
        </section>
      ) : (
        <form className="editProjectForm" onSubmit={handleUpdate}>
          <label htmlFor="title" className="editProjectFormLabel">
            Titre :
            <input
              type="text"
              className="editProjectFormInput"
              name="titre"
              value={updatedProject.title}
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor="description" className="editProjectFormLabel">
            Description :
            <input
              type="text"
              className="editProjectFormInput"
              name="description"
              value={updatedProject.description}
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor="date" className="editProjectFormLabel">
            Date de création :
            <input
              type="date"
              className="editProjectFormInput"
              name="date"
              value={updatedProject.date}
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor="webSiteLink" className="editProjectFormLabel">
            Lien vers le site :
            <input
              type="text"
              className="editProjectFormInput"
              name="webSiteLink"
              value={updatedProject.webSiteLink}
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor="gitHubLink" className="editProjectFormLabel">
            Lien vers le répository :
            <input
              type="text"
              className="editProjectFormInput"
              name="gitHubLink"
              value={updatedProject.gitHubLink}
              onChange={handleInputChange}
            />
          </label>
          <button
            className="editProjectButton"
            type="submit"
            onClick={() => handleUpdate(updatedProject)}
          >
            Modifier
          </button>
        </form>
      )}
    </div>
  );
}

export default EditProject;
