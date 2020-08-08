import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import withAuthorization from '../../components/Session/withAuthorization/withAuthorization';
import * as actionCreators from '../../store/actions/index';
import {db} from '../../firebase/index';

import classes from './Users.css';

class UsersPage extends Component {

	componentDidMount() {
		const {authUser, usersSet} = this.props;
		db.onceGetUsers().then(snapshot =>
			usersSet(authUser.uid, snapshot.val())
		);
	}

	render() {

		const {users} = this.props;
		const countUsers =  Object.keys(users).length;
		const listUsers = Object.keys(users).map((key, index) =>
			<li key={key} className="list-group-item">{index + 1}. {users[key].username} - {users[key].email}</li>
		);

		return (
			<div className={classes.UsersPage + ' container'}>

				<h3>Users</h3>

				<hr />

				{!!users &&
				<div>

					<h5>List of <span className="badge badge-info">{countUsers}</span> user names and email
						addresses in Bookmarks</h5>
					<p>(Saved on Sign Up in Firebase Database)</p>

					<ul className="list-group shadow-lg">
						{listUsers}
					</ul>
				</div>}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	users: state.userState.users,
	authUser: state.sessionState.authUser
});

const mapDispatchToProps = (dispatch) => ({
	usersSet: (id, set) => dispatch(actionCreators.usersSet(id, set)),
});

const authCondition = (authUser) => !!authUser;

export default compose(withAuthorization(authCondition),
	connect(mapStateToProps, mapDispatchToProps))(UsersPage);
