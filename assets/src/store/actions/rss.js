import * as actionTypes from './actionTypes';

export const rssSet = (id, set) => {
	return {
		type: actionTypes.RSS_SET,
		id: id,
		set: set
	};
};

export const rssInitial = () => {
	return {
		type: actionTypes.RSS_INITIAL,
	};
};

export const rssUpdateField = (field, set) => {
	return {
		type: actionTypes.RSS_UPDATE_PROPERTY,
		field: field,
		set: set
	};
};

export const rssStatusModal = (status) => {
	return {
		type: actionTypes.RSS_STATUS_MODAL,
		status: status
	};
};

export const rssToggleModal = () => {
	return {
		type: actionTypes.RSS_TOGGLE_MODAL
	};
};

export const rssToggleExpands = () => {
	return {
		type: actionTypes.RSS_TOGGLE_EXPANDS
	};
};

export const rssViewFeed = (id, title, link) => {
	return {
		type: actionTypes.RSS_VIEW_FEED,
		id: id,
		title: title,
		link: link
	};
};

export const rssEditFeed = (id, title, link) => {
	return {
		type: actionTypes.RSS_EDIT_FEED,
		id: id,
		title: title,
		link: link
	};
};

export const rssRemoveFeed = () => {
	return {
		type: actionTypes.RSS_REMOVE_FEED
	};
};

export const rssClearFeed = () => {
	return {
		type: actionTypes.RSS_CLEAR_FEED
	};
};

export const rssAddFeeds = (feeds) => {
	return {
		type: actionTypes.RSS_ADD_FEEDS,
		feeds: feeds
	};
};
