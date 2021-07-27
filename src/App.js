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
      <Modal
        open={isOpen}
        feature={modalData}
        onClose={() => {
          setIsOpen(false);
          document.body.style.overflow = "auto";
        }}
        setModalData={setModalData}
      />
      {keyword ? (
        <>
          <Row
            title="Search result"
            fetchUrl={`${requests.fetchSearchQuery}${keyword}`}
            isSearchRow
            setOpen={setIsOpen}
            setModalData={setModalData}
          />
        </>
      ) : (
        <>
          <Banner />
          <Row
            title="NETFLIX ORIGINAL"
            fetchUrl={requests.fetchNetflixOriginals}
            isLargeRow
            setOpen={setIsOpen}
            setModalData={setModalData}
          />
          <Row
            title="Trending Now"
            fetchUrl={requests.fetchTrending}
            setOpen={setIsOpen}
            setModalData={setModalData}
          />
          <Row
            title="Top Rated"
            fetchUrl={requests.fetchTopRated}
            setOpen={setIsOpen}
            setModalData={setModalData}
          />
          <Row
            title="Action Movies"
            fetchUrl={requests.fetchActionMovies}
            setOpen={setIsOpen}
            setModalData={setModalData}
          />
          <Row
            title="Comedy Movies"
            fetchUrl={requests.fetchComedyMovies}
            setOpen={setIsOpen}
            setModalData={setModalData}
          />
          <Row
            title="Horror Movies"
            fetchUrl={requests.fetchHorrorMovies}
            setOpen={setIsOpen}
            setModalData={setModalData}
          />
          <Row
            title="Romance Movies"
            fetchUrl={requests.fetchRomanceMovies}
            setOpen={setIsOpen}
            setModalData={setModalData}
          />
          <Row
            title="Documentaries"
            fetchUrl={requests.fetchDocumentaries}
            setOpen={setIsOpen}
            setModalData={setModalData}
          />
        </>
      )}
    </div>
  );
}

export default App;
