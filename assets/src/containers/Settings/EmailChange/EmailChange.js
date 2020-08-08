import React, {Component} from 'react';
import {auth, db} from '../../../firebase/index';

import classes from './EmailChange.css';

class EmailChangeForm extends Component {

	onSubmit = (event) => {
		const {email, authUser, authInitial, toggleInfoModal, updateProperty} = this.props;

		auth.doEmailUpdate(email)
			.then(() => {
				db.doEmailUpdate(authUser.uid,email)
					.then(() => {
					toggleInfoModal('email');
					authInitial();
				}).catch(emailError => {
					updateProperty('emailError', emailError);
				});
			})
			.catch(emailError => {
				updateProperty('emailError', emailError);
			});
		event.preventDefault();
	};

	render() {
		const {email, error, authUser, updateProperty} = this.props;
		const isInvalid =
			(email === authUser.email) ||
			(email === '');

		return (

			<div className={classes.EmailChangeCard + ' card shadow-lg'}>
				<h5 className="card-title text-center">Change Email</h5>
				<div className="card-body text-center">

					<form className="form-inline" onSubmit={this.onSubmit}>

						<div className="form-group mb-2">
							<label htmlFor="currentEmailLabel" className="sr-only">Current Email</label>
							<input type="text" readOnly className="form-control-plaintext" id="currentEmailLabel"
							       value={authUser.email}/>
						</div>

						<div className="form-group mx-sm-3 mb-2">
							<label htmlFor="changeEmail" className="sr-only">New Email</label>
							<input
								className="form-control"
								id="changeEmail"
								defaultValue={email}
								onChange={event => updateProperty('email', event.target.value)}
								type="email"
								placeholder="Enter New Email"/>
						</div>

						<button
							className="btn btn-success mb-2"
							disabled={isInvalid}
							type="submit">
							Change My Email
						</button>

					</form>

				</div>

				<div className={classes.EmailChangeCardError}>
					{error && <p className="badge badge-danger">{error.message}</p>}
				</div>

			</div>
		);
	}
}

export default EmailChangeForm;
