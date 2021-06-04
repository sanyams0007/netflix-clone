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
            <img src="/images/card1.jpg" alt="" />
          </div>
        </div>
      </div>
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
            <img src="/images/card2.jpg" alt="" />
          </div>
        </div>
      </div>
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
            <img src="/images/card3.jpg" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
