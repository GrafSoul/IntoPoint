import React, {Component} from 'react';
import {auth} from '../../../firebase/index';

import classes from './PasswordChange.css';

class PasswordChangeForm extends Component {

	onSubmit = (event) => {
		const {authInitial, toggleInfoModal, updateProperty, passwordOne} = this.props;
		auth.doPasswordUpdate(passwordOne)
			.then(() => {
				toggleInfoModal('password');
				authInitial();
			})
			.catch(errorPassword => {
				updateProperty('passwordError', errorPassword);
			});

		event.preventDefault();
	};

	render() {

		const {passwordOne, passwordTwo, error, updateProperty} = this.props;

		const isInvalid =
			passwordOne !== passwordTwo ||
			passwordOne === '';

		return (


			<div className={classes.PasswordChangeCard + ' card shadow-lg'}>
				<h5 className="card-title text-center">Change Password</h5>
				<div className="card-body text-center">


					<form className="form-inline" onSubmit={this.onSubmit}>

						<div className="form-group mx-sm-3 mb-2">
							<label htmlFor="newPassword" className="sr-only">New Password</label>
							<input
								className="form-control"
								id="newPassword"
								defaultValue={passwordOne}
								onChange={event => updateProperty('passwordOne', event.target.value)}
								type="password"
								placeholder="Enter New Password"/>
						</div>

						<div className="form-group mx-sm-3 mb-2">
							<label htmlFor="confirmPassword" className="sr-only">Confirm New Password</label>
							<input
								className="form-control"
								id="confirmPassword"
								defaultValue={passwordTwo}
								onChange={event => updateProperty('passwordTwo', event.target.value)}
								type="password"
								placeholder="Confirm New Password"/>
						</div>

						<div className="form-group mx-sm-3 mb-2">
							<button
								className="btn btn-success mb-2"
								disabled={isInvalid}
								type="submit">
								Reset Password
							</button>
						</div>

					</form>

				</div>

				<div className={classes.PasswordChangeCardError}>
					{error && <p className="badge badge-danger">{error.message}</p>}
				</div>

			</div>
		);
	}
}

export default PasswordChangeForm;
