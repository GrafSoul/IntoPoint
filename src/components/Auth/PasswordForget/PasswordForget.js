import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { auth } from "../../../firebase/index";
import * as actionCreators from "../../../store/actions";
import * as routes from "../../../routes/routes";

import classes from "./PasswordForget.module.css";

class PasswordForgetPage extends Component {
  componentDidMount() {
    const { authInitial } = this.props;
    authInitial();
  }

  onSubmit = (event) => {
    const { email, sendPassword, updateProperty } = this.props;

    auth
      .doPasswordReset(email)
      .then(() => {
        sendPassword();
      })
      .catch((error) => {
        updateProperty("error", error);
      });
    event.preventDefault();
  };

  render() {
    const { email, error, forgetPassword, updateProperty } = this.props;
    const isInvalid = email === "";

    return (
      <div className={classes.PasswordForget + " container"}>
        <div className={classes.PasswordForgetCard + " card shadow-lg"}>
          <h3 className="card-title text-center">Password Forget?</h3>

          {!forgetPassword ? (
            <div className="card-body text-center">
              <form onSubmit={this.onSubmit}>
                <input
                  className="form-control"
                  defaultValue={email}
                  onChange={(event) =>
                    updateProperty("email", event.target.value)
                  }
                  type="text"
                  placeholder="Enter You email"
                />

                <button
                  className="btn btn-success"
                  disabled={isInvalid}
                  type="submit"
                >
                  Reset My Password
                </button>

                <p className="center-align">
                  Remember your password?
                  <Link to={routes.SIGN_IN}> Sign In</Link>
                </p>
              </form>

              <div className={classes.PasswordForgetCardError}>
                {error && <p className="badge badge-danger">{error.message}</p>}
              </div>
            </div>
          ) : (
            <div className="card-body text-center">
              <p>
                An email has been sent to you with a link to reset your password
              </p>
              <p>
                After the recovery, log in to the system{" "}
                <Link to={routes.SIGN_IN}>Sign In</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.sessionState.email,
  error: state.sessionState.error,
  forgetPassword: state.sessionState.forgetPassword,
});

const mapDispatchToProps = (dispatch) => ({
  authInitial: () => dispatch(actionCreators.authInitial()),
  sendPassword: () => dispatch(actionCreators.sendPassword()),
  updateProperty: (field, set) =>
    dispatch(actionCreators.updateProperty(field, set)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PasswordForgetPage));
