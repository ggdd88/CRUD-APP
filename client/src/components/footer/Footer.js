import React from 'react';
import './footer.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";

class Footer extends React.Component {
  
    render(){
        return(
            <div class="footer"style={{ color: 'white', height: 100, backgroundColor: '#000000', textAlign: 'center' }} >Go Beauty ©2020
                <div class="social-container">
                <h3>Seguinos en nuestras redes sociales</h3>
                <a href="https://www.youtube.com/"
                className="youtube social">
                <FontAwesomeIcon icon={faYoutube} size="2x" />
                </a>
                <a href="https://www.facebook.com/"
                className="facebook social">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
                <a href="https://www.twitter.com/" className="twitter social">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
                </a>
                <a href="https://www.instagram.com/"
                className="instagram social">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
                </div>
            </div>      
        );  
    }
}

export default Footer;

