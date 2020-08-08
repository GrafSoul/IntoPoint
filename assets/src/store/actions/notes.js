import * as actionTypes from './actionTypes';

export const notesSet = (id, set) => {
	return {
		type: actionTypes.NOTES_SET,
		id: id,
		set: set
	};
};

export const notesInitial = () => {
	return {
		type: actionTypes.NOTES_INITIAL,
	};
};

export const notesUpdateField = (field, set) => {
	return {
		type: actionTypes.NOTES_UPDATE_PROPERTY,
		field: field,
		set: set
	};
};

export const notesUpdateTags = (set) => {
	return {
		type: actionTypes.NOTES_UPDATE_PROPERTY_TAGS,
		set: set
	};
};

export const notesFilterSet = (set) => {
	return {
		type: actionTypes.NOTES_FILTER_SET,
		set: set
	};
};

export const notesSearchTagsList = (value, tags) => {
	return {
		type: actionTypes.NOTES_SEARCH_TAGS,
		value: value,
		tags: tags
	};
};

export const noteEdit = (id, text, title, tags) => {
	return {
		type: actionTypes.NOTES_EDIT,
		id: id,
		text: text,
		title: title,
		tags: tags
	};
};

export const noteView = (id, text, title, tags) => {
	return {
		type: actionTypes.NOTES_VIEW,
		id: id,
		text: text,
		title: title,
		tags: tags
	};
};

export const noteSetStatus = (stat) => {
	return {
		type: actionTypes.NOTES_STATUS,
		stat: stat,
	};
};

export const noteRemove = (idNote) => {
	return {
		type: actionTypes.NOTES_REMOVE,
		idNote: idNote,
	};
};

export const noteToggleModal = () => {
	return {
		type: actionTypes.NOTES_TOGGLE_MODAL
	};
};
