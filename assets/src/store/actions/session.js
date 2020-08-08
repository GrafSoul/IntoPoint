import * as actionTypes from './actionTypes';

export const authUserSet = ( authUser ) => {
	return {
		type: actionTypes.AUTH_USER_SET,
		authUser: authUser
	};
};

export const authInitial = () => {
	return {
		type: actionTypes.AUTH_INITIAL
	};
};

export const updateProperty = (field, set) => {
	return {
		type: actionTypes.AUTH_UPDATE_PROPERTY,
		field: field,
		set: set
	};
};

export const sendPassword = () => {
	return {
		type: actionTypes.AUTH_SEND_PASSWORD
	};
};

export const toggleInfoModal = (item = '') => {
	return {
		type: actionTypes.AUTH_TOGGLE_UPDATE_INFO,
		item: item
	};
};

