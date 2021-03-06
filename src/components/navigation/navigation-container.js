import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

const NavigationContainer = (props) => {
  const dynamicLink = () => {
    return [
      <div key="portfolio-manager" className="nav-link-wrapper">
        <NavLink to="/portfolio-manager" activeClassName="nav-link-active">
          Portfolio
        </NavLink>
      </div>
    ];
  };

  const handleSigsOut = () => {
    axios
      .delete("https://api.devcamp.space/logout", { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          props.history.push("/");
          props.handleLogout();
        }
        return response.data;
      })
      .catch((error) => {
        console.log("Error Sign Out", error);
      });
  };

  const signIn = () => {
    props.history.push("/auth");
  };
  return (
    <div className="nav-wrapper">
      <div className="left-side">
        <div className="nav-link-wrapper">
          <NavLink exact to="/" activeClassName="nav-link-active">
            Home
          </NavLink>
        </div>
        <div className="nav-link-wrapper">
          <NavLink to="/about-me" activeClassName="nav-link-active">
            About
          </NavLink>
        </div>
        <div className="nav-link-wrapper">
          <NavLink to="/contact" activeClassName="nav-link-active">
            Contact
          </NavLink>
        </div>
        <div className="nav-link-wrapper">
          <NavLink to="/blog" activeClassName="nav-link-active">
            Blog
          </NavLink>
        </div>
        {props.loggedInStatus === "LOGGED_IN"
          ? dynamicLink("/portfolio-manager", "PortfolioManager")
          : null}
      </div>

      <div className="right-side">
        Luis Angel
        {props.loggedInStatus === "LOGGED_IN" ? (
          <div className="signOut" onClick={handleSigsOut}>
            <FontAwesomeIcon icon="sign-out-alt" />
          </div>
        ) : props.loggedInStatus === "NOT_LOGGED_IN" ? (
          <div className="signIn" onClick={signIn}>
            <FontAwesomeIcon icon="sign-in-alt" />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default withRouter(NavigationContainer);
