import * as actionTypes from './actionTypes';

export const userSetId = (id) => {
	return {
		type: actionTypes.USER_SET_ID,
		id: id
	};
};

export const userSetEmail = (email) => {
	return {
		type: actionTypes.USER_SET_EMAIL,
		email: email
	};
};

export const userSetName = (name) => {
	return {
		type: actionTypes.USER_SET_NAME,
		name: name
	};
};

export const activeLink = (link) => {
	return {
		type: actionTypes.ACTIVE_LINK,
		link: link
	};
};

export const activeSideDrawer = () => {
	return {
		type: actionTypes.ACTIVE_SIDE_DRAWER,
	};
};
