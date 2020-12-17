import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer class="footer">
            <p>Questions? Call 000-800-040-1843</p>
            <div class="footer-cols">
                <ul>
                    <li><Link to="/app">FAQ</Link></li>
                    <li><Link to="/app">Invester Relation</Link></li>
                    <li><Link to="/app">Ways To Watch</Link></li>
                    <li><Link to="/app">Corporate Information</Link></li>
                    <li><Link to="/app">NetFlix Originals</Link></li>
                </ul>
                <ul>
                    <li><Link to="/app">Help Center</Link></li>
                    <li><Link to="/app">Jobs</Link></li>
                    <li><Link to="/app">Terms Of Use</Link></li>
                    <li><Link to="/app">Contact Us</Link></li>
                </ul>
                <ul>
                    <li><Link to="/app">Account</Link></li>
                    <li><Link to="/app">Redeem Gift Cards</Link></li>
                    <li><Link to="/app">Privacy</Link></li>
                    <li><Link to="/app">Speed Test</Link></li>
                </ul>
                <ul>
                    <li><Link to="/app">Media Center</Link></li>
                    <li><Link to="/app">Buy Gift Cards</Link></li>
                    <li><Link to="/app">Cookie Preference</Link></li>
                    <li><Link to="/app">Legal Notices</Link></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;
