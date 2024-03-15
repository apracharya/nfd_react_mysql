import React from "react";
import '../styles/about-footer.css'
import { NavLink } from "react-router-dom";

export default function Footer(props) {

  return (
    <div style={{background: "#f8f9fa", paddingTop: "5px"}}>
      
    <footer>
          <div className="footer-content">
              <div className="footer-logo">
                  <img src={props.logo} alt="Film Database Logo" />
              </div>
              <div className="footer-links">
                  <ul>
                      <li><NavLink to='/about-us'>About Us</NavLink></li>
                      <li><a href="privacy.html">Privacy Policy</a></li>
                  </ul>
              </div>
              <div className="footer-social">
                  <span style={{paddingRight: '10px'}}><img src="/icons/facebook.png" alt="Facebook" /></span>
                  <span style={{paddingRight: '10px'}}><img src="/icons/gmail.png" alt="gmail" /></span>
                  <span style={{paddingRight: '10px'}}><img src="/icons/instagram.png" alt="Instagram" /></span>
              </div>
          </div>
          <p>© 2024 Film Database. All rights reserved.</p>
      </footer>
    </div>
  );
}
