import * as actionTypes from './actionTypes';

export const usersSet = (id, set) => {
	return {
		type: actionTypes.USERS_SET,
		id: id,
		set: set
	};
};
