import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import withAuthorization from "../../components/Session/withAuthorization/withAuthorization";
import * as actionCreators from "../../store/actions";

import classes from "./Settings.module.css";

import NameChangeForm from "./NameChange/NameChange";
import PasswordChangeForm from "./PasswordChange/PasswordChange";
import EmailChangeForm from "./EmailChange/EmailChange";
import ModalWindow from "../../components/UI/Modal/Modal";

class SettingsPage extends Component {
  componentDidMount() {
    const { authInitial } = this.props;
    authInitial();
  }

  render() {
    const {
      newUserName,
      email,
      emailError,
      passwordError,
      passwordOne,
      passwordTwo,
      authUser,
      userSetName,
      userName,
      authInitial,
      complete,
      updateProperty,
      modal,
      toggleInfoModal,
    } = this.props;

    const completeInfo = (infoItem) => {
      if (infoItem === "username") {
        return <p>Your name has been changed!</p>;
      } else if (infoItem === "email") {
        return <p>Your email has been changed!</p>;
      } else if (infoItem === "password") {
        return <p>Your password has been changed!</p>;
      } else {
        return null;
      }
    };

    return (
      <div className={classes.SettingsPage + " container"}>
        <h4 className="text-center">Settings</h4>
        <NameChangeForm
          authUser={authUser}
          userSetName={userSetName}
          userName={userName}
          newUserName={newUserName}
          authInitial={authInitial}
          toggleInfoModal={toggleInfoModal}
          updateProperty={updateProperty}
        />

        <EmailChangeForm
          authUser={authUser}
          email={email}
          error={emailError}
          authInitial={authInitial}
          toggleInfoModal={toggleInfoModal}
          updateProperty={updateProperty}
        />

        <PasswordChangeForm
          passwordOne={passwordOne}
          passwordTwo={passwordTwo}
          error={passwordError}
          authInitial={authInitial}
          toggleInfoModal={toggleInfoModal}
          updateProperty={updateProperty}
        />

        <ModalWindow isOpen={modal} toggleModal={toggleInfoModal}>
          <div className="text-center">
            <h5>Congratulations!</h5>
            {completeInfo(complete)}
            <div className="text-center">
              <button className="btn btn-success" onClick={toggleInfoModal}>
                Ok
              </button>
            </div>
          </div>
        </ModalWindow>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  newUserName: state.sessionState.username,
  email: state.sessionState.email,
  emailError: state.sessionState.emailError,
  passwordError: state.sessionState.passwordError,
  error: state.sessionState.error,
  modal: state.sessionState.modal,
  complete: state.sessionState.complete,
  passwordOne: state.sessionState.passwordOne,
  passwordTwo: state.sessionState.passwordTwo,
  authUser: state.sessionState.authUser,
  userName: state.currentUserState.userName,
});

const mapDispatchToProps = (dispatch) => ({
  authInitial: () => dispatch(actionCreators.authInitial()),
  toggleInfoModal: (item) => dispatch(actionCreators.toggleInfoModal(item)),
  updateProperty: (field, set) =>
    dispatch(actionCreators.updateProperty(field, set)),
  userSetName: (name) => dispatch(actionCreators.userSetName(name)),
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(SettingsPage);
