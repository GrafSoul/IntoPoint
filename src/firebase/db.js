import {db} from './firebase';

// User API
export const doCreateUser = (id, username, email) =>
	db.ref(`users/${id}`).set({id, username, email});

export const doNameUpdate = (id, username) =>
	db.ref(`users/${id}`).update({username});

export const doEmailUpdate = (id, email) =>
	db.ref(`users/${id}/email/`).set(email);

export const onceGetUsers = () => db.ref('users').once('value');

export const onceGetUserId = (id) =>
	db.ref(`/users/${id}/id/`).once('value');

export const onceGetUserEmail = (id) =>
	db.ref(`/users/${id}/email/`).once('value');

export const onceGetUserName = (id) =>
	db.ref(`/users/${id}/username/`).once('value');


// Bookmarks APIs
export const onceGetUserBookmarks = (id) =>
	db.ref(`/users/${id}/bookmarks/`).once('value');

export const doAddBookmark = (id, link, title, tags) =>
	db.ref(`users/${id}/bookmarks`).push({link, title, tags});

export const doEditBookmark = (id, idBookmark, link, title, tags) =>
	db.ref(`users/${id}/bookmarks/${idBookmark}`).set({link, title, tags});

export const doRemoveBookmark = (id, idBookmark) =>
	db.ref(`users/${id}/bookmarks/${idBookmark}`).remove();


// Notes APIs
export const onceGetUserNotes = (id) =>
	db.ref(`/users/${id}/notes/`).once('value');

export const doAddNote = (id, text, title, tags) =>
	db.ref(`users/${id}/notes`).push({text, title, tags});

export const doEditNote = (id, idNote, text, title, tags) =>
	db.ref(`users/${id}/notes/${idNote}`).set({text, title, tags});

export const doRemoveNote = (id, idNote) =>
	db.ref(`users/${id}/notes/${idNote}`).remove();


// Rss APIs
export const onceGetUserFeeds = (id) =>
	db.ref(`/users/${id}/feeds/`).once('value');

export const doAddFeed = (id, link, title) =>
	db.ref(`users/${id}/feeds`).push({link, title});

export const doRemoveFeed = (id, idFeed) =>
	db.ref(`users/${id}/feeds/${idFeed}`).remove();

export const doEditFeed = (id, idFeed, link, title) =>
	db.ref(`users/${id}/feeds/${idFeed}`).set({link, title});

