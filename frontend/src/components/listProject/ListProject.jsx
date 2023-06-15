import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ListProject.css";
import useApi from "../../services/useApi";

function ListProject() {
  const api = useApi();
  const [projectList, setProjectList] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  useEffect(() => {
    api
      .get("/project")
      .then((res) => {
        console.warn(res);
        setProjectList(res.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, [api]);

  const confirmDelete = (project) => {
    setProjectToDelete(project);
    setShowConfirmation(true);
  };

  const handleDelete = (projectId) => {
    api
      .delete(`/project/${projectId}`)
      .then(() => {
        setShowConfirmation(false);
        setProjectList((prevList) =>
          prevList.filter((project) => project.id !== projectId)
        );
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  return (
    <div className="listProjectContainer">
      <h2>Liste de projets</h2>
      <Link to="/project/add" className="addProjectButton">
        Ajouter un projet
      </Link>
      <div className="listProjectCards">
        {projectList.map((project) => (
          <div key={project.id} className="listProjectCard">
            <div className="listProjectCardDetails">
              <div className="listProjectCardTitle">
                Projet : {project.title}
              </div>
              <Link to={`/project/${project.id}`}>Modifier</Link>
              <Link to={`/img/${project.id}`}>Modifier img</Link>
              <button
                type="submit"
                className="deleteButton"
                onClick={() => confirmDelete(project)}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
      {showConfirmation && (
        <div className="deleteContainer">
          <div className="deleteConfirmation">
            <p>
              Voulez-vous vraiment supprimer le projet "{projectToDelete.title}"
              ?
            </p>
            <div className="deleteConfirmationButtons">
              <button
                type="submit"
                className="deleteConfirmationButton"
                onClick={() => handleDelete(projectToDelete.id)}
              >
                Oui
              </button>
              <button
                type="submit"
                className="deleteConfirmationButton"
                onClick={() => setShowConfirmation(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListProject;
