import React from "react";
import profileImage from "../../../static/assets/images/auth/login.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function () {
  return (
    <div className="content-about-wrapper">
      <div
        className="left-column"
        style={{
          background: `url(${profileImage}) no-repeat`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="right-column">
        <div className="contact-bullet-points">
          <div className="bullet-point-group">
            <div className="icon">
              <FontAwesomeIcon icon="phone" />
            </div>
            <div className="text">33 2626 4356</div>
          </div>
          <div className="bullet-point-group">
            <div className="icon">
              <FontAwesomeIcon icon="envelope" />
            </div>
            <div className="text">luisangelq3673@gmail.com</div>
          </div>

          <div className="bullet-point-group">
            <div className="icon">
              <FontAwesomeIcon icon="map-marked-alt" />
            </div>
            <div className="text">Guadalajara, Jal.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
