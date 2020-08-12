import React from 'react';
import {connect} from 'react-redux';
import {firebase} from '../../../firebase/index';
import * as actionCreators from '../../../store/actions/index';

const withAuthentication = (Component) => {

	class WithAuthentication extends React.Component {

		componentDidMount() {
			const {onSetAuthUser} = this.props;
			firebase.auth.onAuthStateChanged(authUser => {
				authUser
					? onSetAuthUser(authUser)
					: onSetAuthUser(null);
			});
		}

		render() {
			return (
				<Component/>
			);
		}
	}

	const mapDispatchToProps = (dispatch) => ({
		onSetAuthUser: (authUser) => dispatch(actionCreators.authUserSet(authUser)),
	});

	return connect(null, mapDispatchToProps)(WithAuthentication);
};

export default withAuthentication;
