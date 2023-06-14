import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <div>
      <header id="header" className="header-main">
        <nav
          id="main-navbar"
          className="navbar navbar-default navbar-fixed-top"
          role="navigation"
        >
          {/* <!-- Classes: navbar-default, navbar-inverse, navbar-fixed-top, navbar-fixed-bottom, navbar-transparent. 
        Note: If you use non-transparent navbar, set "height: 98px;" to #header --> */}
          <div className="container">
            {/* <!-- Brand and toggle get grouped for better mobile display --> */}
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <a className="navbar-brand page-scroll" href="index.html">
                Anaïs CEN
              </a>
            </div>
            {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
            <div
              className="collapse navbar-collapse"
              id="bs-example-navbar-collapse-1"
            >
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a className="page-scroll" href="body">
                    Home
                  </a>
                </li>
                <li>
                  <a className="page-scroll" href="#about-section">
                    About
                  </a>
                </li>
                <li>
                  <a className="page-scroll" href="#services-section">
                    Services
                  </a>
                </li>
                <li>
                  <a className="page-scroll" href="#portfolio-section">
                    Works
                  </a>
                </li>
                <li>
                  <a className="page-scroll" href="#team-section">
                    Team
                  </a>
                </li>
                <li>
                  <a className="page-scroll" href="#prices-section">
                    Prices
                  </a>
                </li>
                <li>
                  <a className="page-scroll" href="#contact-section">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
