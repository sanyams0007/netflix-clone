import React, { useEffect, useState } from "react";
import "./Navbar.css";

const Navbar = ({ setSearchData, searchData }) => {
  const [show, handleShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  const getSearchResult = () => {
    if (searchTerm) {
      fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchTerm}`
      )
        .then((res) => res.json())
        .then(({ results }) => {
          console.table(results);
          setSearchData(results);
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        className="nav_logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix Logo"
      />

      <div className="searchbar">
        <input
          type="text"
          placeholder="Search titles, people"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={getSearchResult}>
          <i class="fas fa-search"></i>
        </button>
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
