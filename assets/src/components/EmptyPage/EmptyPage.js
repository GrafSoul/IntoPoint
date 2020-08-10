import React from "react";
import { Link } from "react-router-dom";
import classes from "./EmptyPage.module.css";
import * as routes from "../../routes/routes";

const EmptyPage = () => {
  return (
    <div className={classes.EmptyPage}>
      <h1>Error 404!</h1>
      <h3>There is no such page here!</h3>
      <p>
        Start over again - <Link to={routes.LANDING}>Landing Page</Link>
      </p>
    </div>
  );
};

export default EmptyPage;
