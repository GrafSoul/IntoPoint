import * as actionTypes from '../actions/actionTypes';
import {updateByPropertyName, updateObject} from '../utility/utility';

const INITIAL_STATE = {
	notes: {},
	userTags: [],
	userNotes: [],
	idNote: '',
	text: '',
	title: '',
	tags: '',
	chips: [],
	error: null,
	filter: 'All',
	searchValue: '',
	searchTags: [],
	status: 'listNotes',
	modal: false
};

function notesReducer(state = INITIAL_STATE, action) {

	switch (action.type) {
		case actionTypes.NOTES_SET :
			let userNotes = [];
			let userTags = ["All"];
			let userListTags= [];
			userNotes = action.set ? Object.keys(action.set).map(index => {
				return {
					key: index,
					text: action.set[index].text,
					title: action.set[index].title,
					tags: action.set[index].tags
				}
			}) : [];
			userNotes.map(item => userTags = userTags.concat(item.tags.replace(/\s+/g, '').split(',')));

			userNotes.reverse();

			userTags = [...new Set(userTags)];

			userListTags = userTags.filter((item, pos) => userTags.indexOf(item) === pos);

			return updateObject(state, {
				notes: action.set,
				userNotes: userNotes,
				userTags: userListTags,
			});

		case actionTypes.NOTES_INITIAL :
			return updateObject(state, {
				idNote: '',
				text: '',
				title: '',
				tags: '',
				error: null
			});

		case actionTypes.NOTES_UPDATE_PROPERTY :
			return updateObject(state, updateByPropertyName(action.field, action.set));

		case actionTypes.NOTES_UPDATE_PROPERTY_TAGS :
			return updateObject(state, action.set);

		case actionTypes.NOTES_FILTER_SET :
			return updateObject(state, {filter: action.set ? action.set : null });

		case actionTypes.NOTES_SEARCH_TAGS :
			return updateObject(state, {searchValue: action.value, searchTags: action.tags});

		case actionTypes.NOTES_EDIT:
			return updateObject(state, {
				idNote: action.id,
				text: action.text,
				title: action.title,
				tags: action.tags});

		case actionTypes.NOTES_VIEW:
			return updateObject(state, {
				idNote: action.id,
				text: action.text,
				title: action.title,
				tags: action.tags});

		case actionTypes.NOTES_STATUS :
			return updateObject(state, {status: action.stat});

		case actionTypes.NOTES_REMOVE :
			return updateObject(state, {idNote: action.idNote});

		case actionTypes.NOTES_TOGGLE_MODAL :
			return updateObject(state, {modal: !state.modal});

		default :
			return state;
	}
}

export default notesReducer;
