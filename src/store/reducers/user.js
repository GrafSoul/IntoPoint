import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility/utility';

const INITIAL_STATE = {
	user: {},
	userId: '',
	userName: '',
	userEmail: '',
	linkSelected: '',
	sideDrawer: false
};

function currentUserReducer (state = INITIAL_STATE, action) {

	switch (action.type) {
		case actionTypes.USER_SET_ID :
			return updateObject(state, {userId:  action.id});

		case actionTypes.USER_SET_EMAIL :
			return updateObject(state, {userEmail:  action.email});

		case actionTypes.USER_SET_NAME :
			return updateObject(state, {userName:  action.name});

		case actionTypes.ACTIVE_LINK :
			return updateObject(state, {linkSelected: action.link});

		case actionTypes.ACTIVE_SIDE_DRAWER :
			return updateObject(state, {sideDrawer: !state.sideDrawer});

		default :
			return state;
	}
}

export default currentUserReducer;
