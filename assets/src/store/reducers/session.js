import * as actionTypes from '../actions/actionTypes';
import { updateObject, updateByPropertyName } from '../utility/utility';

const INITIAL_STATE = {
	username: '',
	email: '',
	password: '',
	passwordOne: '',
	passwordTwo: '',
	emailError: null,
	passwordError: null,
	error: null,
	forgetPassword: false,
	modal: false,
	complete: '',
	authUser: null,
};

function sessionReducer(state = INITIAL_STATE, action) {

	switch(action.type) {

		case actionTypes.AUTH_USER_SET : {
			return updateObject(state, {authUser: action.authUser});
		}

		case actionTypes.AUTH_INITIAL : {
			return updateObject(state, {
				username: '',
				email: '',
				password: '',
				passwordOne: '',
				passwordTwo: '',
				forgetPassword: false,
				emailError: null,
				passwordError: null,
				error: null,
			});
		}

		case actionTypes.AUTH_UPDATE_PROPERTY : {
			return updateObject(state, updateByPropertyName(action.field, action.set));
		}

		case actionTypes.AUTH_SEND_PASSWORD : {
			return updateObject(state, {forgetPassword: true});
		}

		case actionTypes.AUTH_TOGGLE_UPDATE_INFO:
			return updateObject(state, {modal: !state.modal, complete: action.item});

		default : return state;
	}
}
export default sessionReducer;
