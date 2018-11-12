import React from "react";
import { NavLink } from "react-router-dom";
import navPhoto from "../../images/MyReadingRoom-nav-photo.jpg";
import navLogo from "../../images/MyReadingRoom-logo.svg";
import "./Navbar.css";

function Navbar(props) {
  return (
    <nav className="navbar navbar-dark navbar-expand-lg mrr-primary-bg">
      <div className="navbar-brand" href="#">
        <img src={navPhoto} width="324" height="70" alt="Books and a reading lamp"/>
      </div>
      <div>
        <img src={navLogo} className="mrr-logo" alt="MyReadingRoom logo"/>
      </div>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/my-books" className="nav-link">
              My Books
            </NavLink>
          </li>
          <li className="nav-item active">
            <NavLink to="/search" className="nav-link">
              Search
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;