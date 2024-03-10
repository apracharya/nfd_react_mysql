import React from "react";
import '../styles/about-footer.css'

export default function About(props) {

  return (
    <div style={{background: "#f8f9fa", paddingTop: "5px"}}>
      
    <footer>
          <div className="footer-content">
              <div className="footer-logo">
                  <img src={props.logo} alt="Film Database Logo" />
              </div>
              <div className="footer-links">
                  <ul>
                      <li><a href="about.html">About Us</a></li>
                      <li><a href="contact.html">Contact</a></li>
                      <li><a href="privacy.html">Privacy Policy</a></li>
                  </ul>
              </div>
              <div className="footer-social">
                  <span><img src="facebook-icon.png" alt="Facebook" /></span>
                  <span><img src="twitter-icon.png" alt="Twitter" /></span>
                  <span><img src="instagram-icon.png" alt="Instagram" /></span>
              </div>
          </div>
          <p>© 2024 Film Database. All rights reserved.</p>
      </footer>
    </div>
  );
}
