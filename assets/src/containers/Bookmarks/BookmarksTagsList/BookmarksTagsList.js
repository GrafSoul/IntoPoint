import React from 'react';
import {Scrollbars} from 'react-custom-scrollbars';

import classes from './BookmarksTagsList.css'
import BookmarksTagsItem from './BookmarksTagsItem/BookmarksTagsItem';


const BookmarksTagsList = (props) => {
	const {tags, searchTagsList, filter, filterSet, searchValue, searchTags} = props;

	const dataSearch = (event) => {
		let value = event.target.value.toLowerCase();
		let currentTags = tags.filter(item => item.toLowerCase().includes(value));
		searchTagsList(value, currentTags);
		filterSet(currentTags[0])
	};

	let tagsList = tags && searchValue === '' ? tags.map((item, index) => {
		return <BookmarksTagsItem
			key={index}
			tag={item}
			filter={filter}
			filterSet={filterSet}
		/>
	}) : null;

	if (searchTags.length !== 0) {
		tagsList = searchTags ? searchTags.map((item, index) => {
			return <BookmarksTagsItem
				key={index}
				tag={item}
				filter={filter}
				filterSet={filterSet}
			/>
		}) : null;
	}

	return (
		<div className={classes.TagsList + ' col-md-3'}>
			<h5 className={classes.TagsListTitle}>Tags</h5>

			<input
				type="text"
				className={classes.SearchInput + ' form-control'}
				placeholder="Search by tags..."
				onChange={dataSearch}/>

			{tags.length !== 1 ?
				<div className={classes.NavTagsList}>
					<div className={classes.NavTagsListTop} />

					<Scrollbars
						autoHide
						autoHideTimeout={1000}
						autoHideDuration={200}
						autoHeight
						autoHeightMax={490}>
						<nav className="nav flex-column">
							{tagsList}
						</nav>
					</Scrollbars>

					<div className={classes.NavTagsListBottom} />
				</div>
				:
				<p className={classes.ListEmpty}>(Empty, No Tags)</p>
			}
		</div>

	);
};

export default BookmarksTagsList;
