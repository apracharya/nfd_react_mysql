import React from "react";
import "../../styles/about.css";
import Base from "./Base";

const About = () => {
  return (
    <Base>
      <div className="body">
        <div className="about-container">
          <h1 className="h1">Meet Our Team</h1>
          <img src="/icons/graphic.jfif" alt="Graphic" className="graphic" />
          <div className="team-member">
            <img src="/icons/Apurva.jpg" alt="Apurva Acharya" />
            <div>
              <h2>Apurva Acharya</h2>
              <p>
                Backend Developer - Responsible for developing and maintaining
                the server-side logic of the application.
              </p>
            </div>
          </div>

          <div className="team-member">
            <img src="/icons/Bishal.jpg" alt="Bishal Acharya" />
            <div>
              <h2>Bishal Acharya</h2>
              <p>
                Database Designer - Responsible for designing and managing the
                database structure of the application.
              </p>
            </div>
          </div>

          <div className="team-member">
            <img src="/icons/Prashant.jpg" alt="Prashant Adhikari" />
            <div>
              <h2>Prashant Adhikari</h2>
              <p>
                Frontend Developer & Assistant - Responsible for developing the
                user interface and assisting in other frontend tasks.
              </p>
            </div>
          </div>

          <div className="contact-us">
            <h2>Contact Us</h2>
            <div className="phone-numbers">
              <p className="phone-number">Phone: +977 9861609739</p>
              <p className="phone-number">Phone: +977 9863676902</p>
              <p className="phone-number">Phone: +977 9860002177</p>
            </div>
            <p className="email">
              <a href="mailto:apr.acharya@gmail.com">
                <img src="/icons/gmail.png" alt="Email" />
              </a>{" "}
              apr.acharya@gmail.com
            </p>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default About;
