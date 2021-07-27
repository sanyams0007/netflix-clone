import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./App.css";
import Row from "./Row";
import requests from "./requests";
import Banner from "./Banner";
import Navbar from "./Navbar";
import Modal from "./Modal";

function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({
    id: "",
    title: "",
    plot: "",
    wall: "",
    language: "",
    date: "",
    budget: "",
    genres: [],
    rev: "",
    time: "",
    status: "",
    ratings: 0,
    tagline: "",
  });

  const { keyword } = useParams();

  return (
    <div className="app">
      <Navbar searchResult={searchResult} setSearchResult={setSearchResult} />
      {keyword ? (
        <>
          <Row
            title="Search result"
            fetchUrl={`${requests.fetchSearchQuery}${keyword}`}
            isSearchRow
            setOpen={setIsOpen}
          />
        </>
      ) : (
        <>
          <Banner />
          <Modal
            open={isOpen}
            feature={modalData}
            onClose={() => setIsOpen(false)}
          />
          <Row
            title="NETFLIX ORIGINAL"
            fetchUrl={requests.fetchNetflixOriginals}
            isLargeRow
            setOpen={setIsOpen}
          />
          <Row
            title="Trending Now"
            fetchUrl={requests.fetchTrending}
            setOpen={setIsOpen}
          />
          <Row
            title="Top Rated"
            fetchUrl={requests.fetchTopRated}
            setOpen={setIsOpen}
          />
          <Row
            title="Action Movies"
            fetchUrl={requests.fetchActionMovies}
            setOpen={setIsOpen}
          />
          <Row
            title="Comedy Movies"
            fetchUrl={requests.fetchComedyMovies}
            setOpen={setIsOpen}
          />
          <Row
            title="Horror Movies"
            fetchUrl={requests.fetchHorrorMovies}
            setOpen={setIsOpen}
          />
          <Row
            title="Romance Movies"
            fetchUrl={requests.fetchRomanceMovies}
            setOpen={setIsOpen}
          />
          <Row
            title="Documentaries"
            fetchUrl={requests.fetchDocumentaries}
            setOpen={setIsOpen}
          />
        </>
      )}
    </div>
  );
}

export default App;
