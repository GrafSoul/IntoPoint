import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {auth, db} from '../../../firebase/index';
import * as routes from '../../../routes/routes';
import * as actionCreators from "../../../store/actions";

import classes from './SignUp.css';
import SignInLink from './SignInLink/SignInLink'

class SignUpPage extends Component {

	componentDidMount() {
		const {authInitial} = this.props;
		authInitial();
	}

	onSubmit = (event) => {
		const {authInitial, updateProperty, username, email, passwordOne, history} = this.props;

		auth.doCreateUserWithEmailAndPassword(email, passwordOne)
			.then(authUser => {

				db.doCreateUser(authUser.user.uid, username, email)
					.then(() => {
						authInitial();
						history.push(routes.BOOKMARKS);
					})
					.catch(error => {
						updateProperty('error', error);
					});
			})
			.catch(error => {
				updateProperty('error', error);
			});

		event.preventDefault();
	};

	render() {
		const {updateProperty, username, email, passwordOne, passwordTwo, error} = this.props;

		const isInvalid =
			passwordOne !== passwordTwo ||
			passwordOne === '' ||
			username === '' ||
			email === '';

		return (
			<div className={classes.SignUp + ' container'}>
				<div className={classes.SignUpCard + ' card shadow-lg'}>

					<h3 className="card-title text-center">Sign Up</h3>

					<div className="card-body text-center">

						<form onSubmit={this.onSubmit}>

							<input
								className="form-control"
								defaultValue={username}
								onChange={event => updateProperty('username', event.target.value)}
								type="text"
								placeholder="Name"/>

							<input
								className="form-control"
								defaultValue={email}
								onChange={event => updateProperty('email', event.target.value)}
								type="text"
								placeholder="Email"/>

								<input
								className="form-control"
								defaultValue={passwordOne}
								onChange={event => updateProperty('passwordOne', event.target.value)}
								type="password"
								placeholder="Password"/>

							<input
								className="form-control"
								defaultValue={passwordTwo}
								onChange={event => updateProperty('passwordTwo', event.target.value)}
								type="password"
								placeholder="Confirm Password"/>

							<button className="btn btn-success" disabled={isInvalid} type="submit">
								Sign Up
							</button>

						</form>

						<SignInLink/>

						<div className={classes.SignUpCardError}>
							{error && <p className="badge badge-danger">{error.message}</p>}
						</div>

					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	username: state.sessionState.username,
	email: state.sessionState.email,
	passwordOne: state.sessionState.passwordOne,
	passwordTwo: state.sessionState.passwordTwo,
	error: state.sessionState.error,
	authUser: state.sessionState.authUser
});

const mapDispatchToProps = (dispatch) => ({
	authInitial: () => dispatch(actionCreators.authInitial()),
	updateProperty: (field, set) => dispatch(actionCreators.updateProperty(field, set)),
	usersSet: (id, set) => dispatch(actionCreators.usersSet(id, set)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUpPage));
