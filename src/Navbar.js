import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [show, handleShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  const getSearchResult = () => {
    if (searchTerm.trim()) {
      history.push(`/search/${searchTerm}`);
    }
  };

  const isVisible = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else handleShow(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isVisible);
    return () => {
      window.removeEventListener("scroll", isVisible);
    };
  }, []);

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <Link to="/app">
        <img
          className="nav_logo"
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
        />
      </Link>

      <div className="searchbar">
        <button onClick={getSearchResult}>
          <i className="fas fa-search"></i>
        </button>
        <input
          className="search-input"
          type="text"
          placeholder="Search titles, people"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <img
        className="nav_avatar"
        src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
        alt="Avatar Img"
      />
    </div>
  );
};

export default Navbar;
