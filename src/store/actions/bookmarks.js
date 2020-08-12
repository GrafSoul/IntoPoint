import * as actionTypes from './actionTypes';

export const bookmarksSet = (id, set) => {
	return {
		type: actionTypes.BOOKMARKS_SET,
		id: id,
		set: set
	};
};

export const bookmarksInitial = () => {
	return {
		type: actionTypes.BOOKMARKS_INITIAL,
	};
};

export const updateField = (field, set) => {
	return {
		type: actionTypes.BOOKMARKS_UPDATE_PROPERTY,
		field: field,
		set: set
	};
};

export const updateTags = (set) => {
	return {
		type: actionTypes.BOOKMARKS_UPDATE_PROPERTY_TAGS,
		set: set
	};
};

export const filterSet = (set) => {
	return {
		type: actionTypes.BOOKMARKS_FILTER_SET,
		set: set
	};
};

export const searchTagsList = (value, tags) => {
	return {
		type: actionTypes.BOOKMARKS_SEARCH_TAGS,
		value: value,
		tags: tags
	};
};

export const toggleModal = () => {
	return {
		type: actionTypes.BOOKMARKS_TOGGLE_MODAL
	};
};

export const bookmarkEdit = (id, link, title, tags) => {
	return {
		type: actionTypes.BOOKMARKS_EDIT,
		id: id,
		link: link,
		title: title,
		tags: tags
	};
};
