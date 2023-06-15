import React, { useEffect, useState } from "react";
import useApi from "../../services/useApi";
import "./CV.css";

function CV() {
  const api = useApi();
  const [projectList, setProjectList] = useState([]);
  const [projectImages, setProjectImages] = useState({});

  useEffect(() => {
    api
      .get("/project")
      .then((res) => {
        setProjectList(res.data);
        return res.data;
      })
      .then((projectList3) => {
        const imagePromises = projectList3.map((project) =>
          api.get(`/img/project/${project.id}`).then((resImg) => {
            setProjectImages((prevImages) => ({
              ...prevImages,
              [project.id]: resImg.data,
            }));
          })
        );
        return Promise.all(imagePromises);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, [api]);

  return (
    <div className="cvcontainer">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Développeuse Web</h1>
          <h2 className="hero-subtitle">REACT - NODE.JS</h2>
        </div>
      </section>
      <section id="experiencesPro">
        <div className="experiencescontainer">
          <h2>EXPÉRIENCES PROFESSIONNELLES</h2>
          <div className="timeline">
            <div className="timeline__event  animated fadeInUp delay-3s timeline__event--type1">
              <div className="timeline__event__icon ">
                <i className="lni-cake" />
              </div>
              <div className="timeline__event__date">
                juin - 2017 <br /> février - 2020
              </div>
              <div className="timeline__event__content ">
                <div className="timeline__event__title">
                  New Yorker, Lyon - Vendeuse polyvalente
                </div>
                <div className="timeline__event__description">
                  <p>
                    * Accueillir et conseiller les clients
                    <br /> * Approvisionner les rayons
                    <br /> * Encaisser les achats
                  </p>
                </div>
              </div>
            </div>
            <div className="timeline__event animated fadeInUp delay-2s timeline__event--type2">
              <div className="timeline__event__icon">
                <i className="lni-burger" />
              </div>
              <div className="timeline__event__date">
                octobre - 2015 <br /> février - 2016
              </div>
              <div className="timeline__event__content">
                <div className="timeline__event__title">
                  Primark, Lyon - Vendeuse polyvalente
                </div>
                <div className="timeline__event__description">
                  <p>
                    * Accueillir et conseiller les clients
                    <br /> * Approvisionner les rayons
                    <br /> * Encaisser les achats
                  </p>
                </div>
              </div>
            </div>
            <div className="timeline__event animated fadeInUp delay-1s timeline__event--type3">
              <div className="timeline__event__icon">
                <i className="lni-slim" />
              </div>
              <div className="timeline__event__date">
                janvier - 2006 <br /> février - 2014
              </div>
              <div className="timeline__event__content">
                <div className="timeline__event__title">
                  Parfumerie Ciudad Paris, C.A., Venezuela - Responsable de
                  magasin
                </div>
                <div className="timeline__event__description">
                  <p>
                    * Négociations fournisseur, suivi des commandes et gestion
                    des stocks
                    <br /> * Gestion comptable, suivi de la trésorerie,
                    facturation, déclarations fiscales et sociales
                    <br /> * Management d'une équipe de 4 personnes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="separator" />
      <section id="education">
        <div className="formationcontainer">
          <h2>FORMATIONS</h2>
          <div className="timeline">
            <div className="timeline__event  animated fadeInUp delay-3s timeline__event--type1">
              <div className="timeline__event__icon ">
                <i className="lni-cake" />
              </div>
              <div className="timeline__event__date">
                sept - 2015 <br /> sept - 2018
              </div>
              <div className="timeline__event__content ">
                <div className="timeline__event__title">
                  Licence LEA - Université Jean Moulin (Lyon)
                </div>
              </div>
            </div>
            <div className="timeline__event animated fadeInUp delay-2s timeline__event--type2">
              <div className="timeline__event__icon">
                <i className="lni-burger" />
              </div>
              <div className="timeline__event__date">
                janvier - 2013 <br /> juin - 2013
              </div>
              <div className="timeline__event__content">
                <div className="timeline__event__title">
                  Stage linguistique Anglais - KIC Manchester, Angleterre
                </div>
              </div>
            </div>
            <div className="timeline__event animated fadeInUp delay-1s timeline__event--type3">
              <div className="timeline__event__icon">
                <i className="lni-slim" />
              </div>
              <div className="timeline__event__date">juin - 2012</div>
              <div className="timeline__event__content">
                <div className="timeline__event__title">
                  Baccalauréat Scientifique - Institut Paulo Freire,
                  Bucaramanga, Colombie
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="projets">
        <h2>PORTFOLIO</h2>
        <div className="listProjectCards">
          {projectList.map((project) => (
            <div key={project.id} className="listProjectCard">
              <div className="listProjectCardDetails">
                <div className="listProjectCardTitle">
                  Projet : {project.title}
                </div>
                <div className="listProjectCardDescription">
                  {project.description}
                </div>
                <div className="listProjectCardDescription">
                  créé le {project.date}
                </div>
                <div className="listProjectCardDescription">
                  Lien vers le site : {project.webSiteLink}
                </div>
                <div className="listProjectCardDescription">
                  Repository GitHub : {project.gitHubLink}
                </div>
                <div className="listProjectCardImages">
                  {projectImages[project.id] &&
                    projectImages[project.id].map((img) => (
                      <div key={`${img.id}`} className="projectImageWrapper">
                        <img
                          src={`${import.meta.env.VITE_BACKEND_URL}/img/${
                            img.src
                          }`}
                          alt={`${img.id}`}
                          key={`${img.id}`}
                          className="projectImage"
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CV;
