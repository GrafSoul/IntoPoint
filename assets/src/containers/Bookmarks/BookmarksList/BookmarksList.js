import React from 'react';
import {Scrollbars} from 'react-custom-scrollbars';

import classes from './BookmarksList.css';
import BookmarksItem from './BookmarksItem/BookmarksItem';

const BookmarksList = (props) => {

	const {bookmarks, filter, editBookmark, removeBookmark, searchValue} = props;

	const bookmarksList = bookmarks ? bookmarks.map((item) => {
		let bookmarkTags = (item.tags).replace(/\s+/g, '').split(',');
		let bookmarksItem = <BookmarksItem
			key={item.key}
			idBookmark={item.key}
			link={item.link}
			title={item.title}
			tags={item.tags}
			removeBookmark={removeBookmark}
			editBookmark={editBookmark}
			bookmarkTags={bookmarkTags}/>;

		if ((bookmarkTags).indexOf(filter) >= 0) {
			return bookmarksItem;
		} else if (filter === 'All') {
			return bookmarksItem;
		} else {
			return null;
		}

	}) : null;

	return (
		<div className="col-md-9">

			<h5 className={classes.TitleList}>List of Links</h5>

			{bookmarks.length !== 0 ?
				<div className={classes.BookmarksListWrap + ' shadow-lg'}>
					<div className={classes.BookmarksListWrapTop}/>
					<Scrollbars
						autoHide
						autoHideTimeout={1000}
						autoHideDuration={200}
						autoHeight
						autoHeightMax={546}>
						<ul className="list-group">
							{bookmarksList}
						</ul>
					</Scrollbars>
					<div className={classes.BookmarksListWrapBottom}/>
				</div>
				:
				<p className={classes.ListEmpty}>You have no saved links! Add the first link by clicking on the button
					- Add Bookmark</p>
			}

			{filter === null &&
			<p className={classes.ListEmpty}>You have no records with a tag - <b>"{searchValue}"</b></p>
			}

		</div>
	);
};

export default BookmarksList;
