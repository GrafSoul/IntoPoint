import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';

import {firebase} from '../../../firebase/index';
import {db} from "../../../firebase";
import * as routes from '../../../routes/routes';
import * as actionCreators from "../../../store/actions";

const withAuthorization = (authCondition) => (Component) => {

	class WithAuthorization extends React.Component {

		componentDidMount() {
			const {/*userSetId, userSetEmail,*/ userSetName} = this.props;
			firebase.auth.onAuthStateChanged(authUser => {

				if (!authCondition(authUser)) {
					this.props.history.push(routes.SIGN_IN);
				}

				if(authUser) {
					// db.onceGetUserId(authUser.uid).then(snapshot => userSetId(snapshot.val()));
					// db.onceGetUserEmail(authUser.uid).then(snapshot => userSetEmail(snapshot.val()));
					db.onceGetUserName(authUser.uid).then(snapshot => userSetName(snapshot.val()));
				}
			});
		}

		render() {
			return (
				this.props.authUser ? <Component/> : null
			);
		}
	}

	const mapStateToProps = (state) => ({
		authUser: state.sessionState.authUser,
	});

	const mapDispatchToProps = (dispatch) => ({
		userSetId: (id) => dispatch(actionCreators.userSetId(id)),
		userSetEmail: (email) => dispatch(actionCreators.userSetEmail(email)),
		userSetName: (name) => dispatch(actionCreators.userSetName(name)),
	});

	return compose(
		withRouter,
		connect(mapStateToProps, mapDispatchToProps),
	)(WithAuthorization);
};

export default withAuthorization;
