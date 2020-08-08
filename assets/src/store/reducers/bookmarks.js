import * as actionTypes from '../actions/actionTypes';
import {updateByPropertyName, updateObject} from '../utility/utility';

const INITIAL_STATE = {
	bookmarks: {},
	userTags: [],
	userBookmarks: [],
	idBookmark: '',
	link: '',
	title: '',
	tags: '',
	chips: [],
	error: null,
	filter: 'All',
	searchValue: '',
	searchTags: [],
	modal: false,
	isEdit: false,
};

function bookmarksReducer(state = INITIAL_STATE, action) {

	switch (action.type) {
		case actionTypes.BOOKMARKS_SET :
			let userBookmarks = [];
			let userTags = ["All"];
			let userListTags= [];
			userBookmarks = action.set ? Object.keys(action.set).map(index => {
				return {
					key: index,
					link: action.set[index].link,
					title: action.set[index].title,
					tags: action.set[index].tags
				}
			}) : [];
			userBookmarks.map(item => userTags = userTags.concat(item.tags.replace(/\s+/g, '').split(',')));

			userBookmarks.reverse();

			userTags = [...new Set(userTags)];

			userListTags = userTags.filter((item, pos) => userTags.indexOf(item) === pos);

			return updateObject(state, {
				bookmarks: action.set,
				userBookmarks: userBookmarks,
				userTags: userListTags,
			});

		case actionTypes.BOOKMARKS_INITIAL :
			return updateObject(state, {
				idBookmark: '',
				link: '',
				title: '',
				tags: '',
				error: null,
				modal: false,
				isEdit: false,
			});

		case actionTypes.BOOKMARKS_UPDATE_PROPERTY :
			return updateObject(state, updateByPropertyName(action.field, action.set));

		case actionTypes.BOOKMARKS_UPDATE_PROPERTY_TAGS :
			return updateObject(state, action.set);

		case actionTypes.BOOKMARKS_FILTER_SET :
			return updateObject(state, {filter: action.set ? action.set : null });

		case actionTypes.BOOKMARKS_SEARCH_TAGS :
			return updateObject(state, {searchValue: action.value,searchTags: action.tags});

		case actionTypes.BOOKMARKS_TOGGLE_MODAL:
			return updateObject(state, {modal: !state.modal, isEdit: false});

		case actionTypes.BOOKMARKS_EDIT:
			return updateObject(state, {
				idBookmark: action.id,
				link: action.link,
				title: action.title,
				tags: action.tags,
				isEdit: true,
				modal: true});

		default :
			return state;
	}
}

export default bookmarksReducer;
