import React from 'react';
import './Landing.css';
import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <header class="showcase">
            <div class="showcase-top">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" />
                <Link to="/app" class="log btn btn-rounded">Sign In</Link>
            </div>
            <div class="showcase-content">
                <h1>See what's next</h1>
                <p>Watch anywhere, cancel anytime</p>
                <Link to="/app" class="btn btn-xl">Watch Free For 30 Days <i class="fas fa-chevron-right btn-icon"></i></Link>
            </div>
        </header >
    )
}

export default Landing;
