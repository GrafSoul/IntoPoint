import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility/utility';

const INITIAL_STATE = {
	users: {},
};

function userReducer(state = INITIAL_STATE, action) {

	switch (action.type) {
		case actionTypes.USERS_SET :
			return updateObject(state, {users: action.set});

		default :
			return state;
	}
}

export default userReducer;
