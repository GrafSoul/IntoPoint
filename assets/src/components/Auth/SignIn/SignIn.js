import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import classes from './SignIn.css';
import SignUpLink from './SignUpLink/SignUpLink';
import PasswordForgetLink from '../PasswordForget/PasswordForgetLink/PasswordForgetLink';

import {auth} from '../../../firebase/index';
import * as routes from '../../../routes/routes';
import * as actionCreators from "../../../store/actions";

class SignInPage extends Component {

	onSubmit = (event) => {
		const {email, password, history, authInitial, updateProperty} = this.props;
		auth.doSignInWithEmailAndPassword(email, password)
			.then(() => {
				authInitial();
				history.push(routes.BOOKMARKS);
			})
			.catch(error => {
				updateProperty('error', error);
			});
		event.preventDefault();
	};

	render() {

		const {email, password, error, updateProperty} = this.props;
		const isInvalid = password === '' || email === '';

		return (
			<div className={classes.SignIn + ' container'}>
				<div className={classes.SignInCard + ' card shadow-lg'}>

					<h3 className="card-title text-center">Sign In</h3>

					<div className="card-body text-center">

						<form onSubmit={this.onSubmit}>

							<input
								className="form-control"
								defaultValue={email}
								onChange={event => updateProperty('email', event.target.value)}
								type="text"
								placeholder="Email"/>

							<input
								className="form-control"
								defaultValue={password}
								onChange={event => updateProperty('password', event.target.value)}
								type="password"
								placeholder="Password"/>

							<button
								className="btn btn-success"
								disabled={isInvalid}
								type="submit">
								Sign In
							</button>

						</form>

						<SignUpLink/>

						<PasswordForgetLink/>

						<div className={classes.SignInCardError}>
							{error && <p className="badge badge-danger">{error.message}</p>}
						</div>

					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	email: state.sessionState.email,
	password: state.sessionState.password,
	error: state.sessionState.error
});

const mapDispatchToProps = (dispatch) => ({
	authInitial: () => dispatch(actionCreators.authInitial()),
	updateProperty: (field, set) => dispatch(actionCreators.updateProperty(field, set))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignInPage));

