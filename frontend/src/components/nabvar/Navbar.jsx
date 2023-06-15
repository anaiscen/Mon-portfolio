import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="header-main">
      <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand page-scroll" href="/">
              ANAïS CEN
            </a>
          </div>
          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a className="page-scroll" href="accueil">
                  ACCUEIL
                </a>
              </li>
              <li>
                <a className="page-scroll" href="#experiencesPro">
                  EXPERIENCES PROFESSIONNELLES
                </a>
              </li>
              <li>
                <a className="page-scroll" href="#education">
                  FORMATION
                </a>
              </li>
              <li>
                <a className="page-scroll" href="#projets">
                  PORTFOLIO
                </a>
              </li>
              <li>
                <a className="page-scroll" href="/login/">
                  ADMIN
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
