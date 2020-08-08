import React, {Component} from 'react';
import {db} from '../../../firebase/index';

import classes from './NameChange.css';

class NameChangeForm extends Component {

	onSubmit = (event) => {
		const {authUser, newUserName, authInitial, toggleInfoModal, updateProperty} = this.props;

		db.doNameUpdate(authUser.uid, newUserName)
			.then(() => {
				this.getDataUser();
				toggleInfoModal('username');
				authInitial();
			})
			.catch(errorUserName => {
				updateProperty('error', errorUserName);
			});

		event.preventDefault();
	};

	getDataUser = () => {
		const {authUser, userSetName} = this.props;
		db.onceGetUserName(authUser.uid).then(snapshot => userSetName(snapshot.val()));
	};

	render() {

		const {newUserName, error, userName, updateProperty} = this.props;

		const isInvalid =
			(newUserName === userName) ||
			(newUserName === '');

		return (
			<div className={classes.NameChangeCard + ' card shadow-lg'}>
				<h5 className="card-title text-center">Change Name</h5>
				<div className="card-body text-center">

					<form className="form-inline" onSubmit={this.onSubmit}>

						<div className="form-group mb-2">
							<label htmlFor="changeNameLabel" className="sr-only">Current Name</label>
							<input type="text" readOnly className="form-control-plaintext" id="changeNameLabel"
							       value={'Name: ' + userName}/>
						</div>

						<div className="form-group mx-sm-3 mb-2">
							<label htmlFor="changeName" className="sr-only">New Name</label>
							<input
								className="form-control"
								id="changeName"
								defaultValue={newUserName}
								onChange={event => updateProperty('username', event.target.value)}
								type="text"
								placeholder="Enter New Name"
							/>
						</div>

						<button
							className="btn btn-success mb-2"
							disabled={isInvalid} type="submit">
							Change My Name
						</button>

					</form>

				</div>

				<div className={classes.NameChangeCardError}>
					{error && <p className="badge badge-danger">{error.message}</p>}
				</div>

			</div>
		);
	}
}

export default NameChangeForm;
