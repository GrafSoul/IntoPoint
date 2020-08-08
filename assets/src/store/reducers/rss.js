import * as actionTypes from '../actions/actionTypes';
import {updateObject, updateByPropertyName} from '../utility/utility';

const INITIAL_STATE = {
	rss: {},
	feeds: [],
	userFeeds: [],
	amountFeeds: 0,
	activeAmount: 0,
	activeId: '',
	activeTitle: '',
	activeLink: '',
	id: '',
	link: '',
	title: '',
	error: null,
	status: '',
	modal: false,
	expands: false
};

function rssReducer(state = INITIAL_STATE, action) {

	switch (action.type) {
		case actionTypes.RSS_SET :
			let userFeeds = [];
			userFeeds = action.set ? Object.keys(action.set).map(index => {
				return {
					id: index,
					link: action.set[index].link,
					title: action.set[index].title
				}
			}).reverse() : [];

			let amountFeeds = userFeeds.length;

			if (state.activeId === '' && amountFeeds !== 0) {
				return updateObject(state, {
					rss: action.set,
					userFeeds: userFeeds,
					activeId: userFeeds[0].id,
					activeTitle: userFeeds[0].title,
					activeLink: userFeeds[0].link,
					amountFeeds: amountFeeds
				});
			} else {
				return updateObject(state, {
					rss: action.set,
					userFeeds: userFeeds,
					amountFeeds: amountFeeds
				});
			}

		case actionTypes.RSS_INITIAL :
			return updateObject(state, {
				id: '',
				link: '',
				title: '',
				status: '',
				error: null,
				modal: false,
			});

		case actionTypes.RSS_UPDATE_PROPERTY :
			return updateObject(state, updateByPropertyName(action.field, action.set));

		case actionTypes.RSS_VIEW_FEED :
			return updateObject(state, {
				activeId: action.id,
				activeTitle: action.title,
				activeLink: action.link,
			});

		case actionTypes.RSS_EDIT_FEED:
			return updateObject(state, {
				id: action.id,
				title: action.title,
				link: action.link,
			});

		case actionTypes.RSS_ADD_FEEDS :
			let activeAmount = action.feeds.items.length;
			return updateObject(state, {feeds: action.feeds, activeAmount: activeAmount});

		case actionTypes.RSS_REMOVE_FEED:
			return updateObject(state, {
				feeds: [],
				activeAmount: 0,
				activeId: '',
				activeTitle: '',
				activeLink: '',
			});

		case actionTypes.RSS_CLEAR_FEED :
			return updateObject(state, {feeds: [], activeAmount: 0});

		case actionTypes.RSS_STATUS_MODAL:
			return updateObject(state, {status: action.status});

		case actionTypes.RSS_TOGGLE_MODAL:
			return updateObject(state, {modal: !state.modal});

		case actionTypes.RSS_TOGGLE_EXPANDS:
			return updateObject(state, {expands: !state.expands});

		default :
			return state;
	}
}

export default rssReducer;
