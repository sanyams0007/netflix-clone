import React, { useEffect, useState } from 'react';
import './Navbar.css';
//import SearchIcon from "@material-ui/icons/Search";

const Navbar = () => {
    const [show, handleShow] = useState(false);
    /* const [searchMovie, setSearchMovie] = useState('') */


    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false);
        });
        return () => {
            window.removeEventListener('scroll');
        };
    }, []);

    return (
        <div className={`nav ${show && 'nav_black'}`}>
            <img
                className='nav_logo'
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                alt="Netflix Logo"
            />

            {/* <span className='searchbar'>
                <input type="text"></input><button><SearchIcon /></button>
            </span> */}
            <img
                className='nav_avatar'
                //src="https://pbs.twimg.com/profile_images/124011999041155"
                src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png'
                alt="Avatar Img"
            />



        </div>
    )
}

export default Navbar;
