import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './users';
import currentUserReducer from './user';
import bookmarksReducer from './bookmarks';
import notesReducer from './notes';
import rssReducer from './rss';

const rootReducer = combineReducers({
	sessionState: sessionReducer,
	userState: userReducer,
	currentUserState: currentUserReducer,
	bookmarksState: bookmarksReducer,
	notesState: notesReducer,
	rssState: rssReducer
});

export default rootReducer;
