import React from "react";
import { auth } from "../../../firebase/index";
import { connect } from "react-redux";
import classes from "./SignOut.module.css";
import * as actionCreators from "../../../store/actions";

const SignOut = (props) => {
  const { sideDrawer, activeLink } = props;

  const handleSignOut = () => {
    activeLink("/signout");
    auth.doSignOut();
  };

  return (
    <span className={classes.SignOut} onClick={handleSignOut}>
      <i className="fas fa-sign-out-alt" />
      {sideDrawer && " Log Out"}
    </span>
  );
};

const mapDispatchToProps = (dispatch) => ({
  activeLink: (link) => dispatch(actionCreators.activeLink(link)),
});

export default connect(null, mapDispatchToProps)(SignOut);
