import React from "react";
import "./Landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <header class="showcase">
        <div class="showcase-top">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix"
          />
          <Link to="/app" class="log btn btn-rounded">
            Sign In
          </Link>
        </div>
        <div class="showcase-content">
          <h1>Unlimited movies, TV shows and more.</h1>
          <h2>Watch anywhere. Cancel anytime.</h2>
          <Link to="/app" class="btn btn-xl">
            Watch Free For 30 Days <i class="fas fa-chevron-right btn-icon"></i>
          </Link>
        </div>
      </header>
      <div className="story-card">
        <div className="story-content">
          <div className="story-content-text">
            <h1>Enjoy on Your Tv</h1>
            <h2>
              Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
              Blu-ray players and more.
            </h2>
          </div>
          <div className="story-content-image">
            <img
              src="https://res.cloudinary.com/ignitegaming/image/upload/v1622833482/projects/Netflix%20Clone/card1_sh5sak.jpg"
              alt="story-content-image1"
            />
          </div>
        </div>
      </div>
      <div className="story-card">
        <div className="story-content">
          <div className="story-content-text">
            <h1>Download your shows to watch offline.</h1>
            <h2>
              Save your favourites easily and always have something to watch.
            </h2>
          </div>
          <div className="story-content-image2">
            <img
              src="https://res.cloudinary.com/ignitegaming/image/upload/v1622833484/projects/Netflix%20Clone/card2_oukrbd.jpg"
              alt="story-content-image2"
            />
          </div>
        </div>
      </div>
      <div className="story-card">
        <div className="story-content">
          <div className="story-content-text">
            <h1>Watch everywhere.</h1>
            <h2>
              Stream unlimited movies and TV shows on your phone, tablet,
              laptop, and TV.
            </h2>
          </div>
          <div className="story-content-image">
            <img
              src="https://res.cloudinary.com/ignitegaming/image/upload/v1622833488/projects/Netflix%20Clone/card3_axmqrk.jpg"
              alt="story-content-image3"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
