import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as actionCreators from "../../store/actions";
import * as routes from "../../routes/routes";

import classes from "./Header.module.css";
import Navigation from "../Navigation/Navigation";
import DrawerToggle from "./SideDrawer/DrawerToggle/DrawerToggle";
import SideDrawer from "./SideDrawer/SideDrawer";

class Header extends Component {
  render() {
    const {
      authUser,
      userName,
      activeLink,
      sideDrawer,
      linkSelected,
      activeSideDrawer,
    } = this.props;

    return (
      <header>
        <div
          className={
            classes.Header + " navbar navbar-expand-md fixed-top shadow-lg"
          }
        >
          <div className="container">
            <DrawerToggle clicked={activeSideDrawer} />

            <Link
              to={routes.HOME}
              onClick={() => activeLink(routes.HOME)}
              className={classes.Brand}
            >
              IntoPoint
            </Link>

            <SideDrawer
              open={sideDrawer}
              closed={activeSideDrawer}
              authUser={authUser}
              activeLink={activeLink}
              userName={userName}
            />

            <div className={classes.DesktopOnly}>
              <Navigation
                linkSelected={linkSelected}
                authUser={authUser}
                activeLink={activeLink}
                userName={userName}
              />
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.currentUserState.userName,
  userEmail: state.currentUserState.userEmail,
  linkSelected: state.currentUserState.linkSelected,
  sideDrawer: state.currentUserState.sideDrawer,
  authUser: state.sessionState.authUser,
});

const mapDispatchToProps = (dispatch) => ({
  activeLink: (link) => dispatch(actionCreators.activeLink(link)),
  activeSideDrawer: () => dispatch(actionCreators.activeSideDrawer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
