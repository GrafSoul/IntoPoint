import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as routes from "../../routes/routes";
import classes from "./Landing.module.css";

const Landing = (props) => {
  const { authUser } = props;
  return (
    <div className={classes.Landing}>
      <h1>IntoPoint</h1>
      <h3>Keep everything interesting in one place</h3>
      <p>Don't keep secret information here :)</p>
      {authUser ? (
        <div>
          <Link className="btn btn-success" to={routes.BOOKMARKS}>
            Go to IntoPoint
          </Link>
        </div>
      ) : (
        <div>
          <Link className="btn btn-success" to={routes.SIGN_IN}>
            SIGN IN
          </Link>{" "}
          <Link className="btn btn-success" to={routes.SIGN_UP}>
            SIGN UP
          </Link>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Landing);
