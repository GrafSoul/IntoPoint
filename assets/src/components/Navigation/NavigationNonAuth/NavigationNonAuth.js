import React from "react";
import { Link } from "react-router-dom";

import * as routes from "../../../routes/routes";
import classes from "./NavigationNonAuth.module.css";

const NavigationNonAuth = (props) => {
  const { activeLink, linkSelected } = props;
  const currentLocation = window.location.pathname;

  return (
    <ul className="nav">
      <li className="nav-item">
        <Link
          onClick={() => activeLink(routes.LANDING)}
          className={
            "nav-link " +
            (currentLocation === routes.LANDING ||
            currentLocation === routes.HOME
              ? classes.NavigationActiveLink
              : "")
          }
          to={routes.LANDING}
        >
          <i className="fas fa-home" /> Landing
        </Link>
      </li>

      <li className="nav-item">
        <Link
          onClick={() => activeLink(routes.SIGN_UP)}
          className={
            "nav-link " +
            (currentLocation === routes.SIGN_UP
              ? classes.NavigationActiveLink
              : "")
          }
          to={routes.SIGN_UP}
        >
          <i className="fas fa-user-plus" /> Sign UP
        </Link>
      </li>

      <li className="nav-item">
        <Link
          onClick={() => activeLink(routes.SIGN_IN)}
          className={
            "nav-link " +
            (currentLocation === routes.SIGN_IN || linkSelected === "/signout"
              ? classes.NavigationActiveLink
              : "")
          }
          to={routes.SIGN_IN}
        >
          <i className="fas fa-sign-in-alt" /> Sign In
        </Link>
      </li>
    </ul>
  );
};

export default NavigationNonAuth;
