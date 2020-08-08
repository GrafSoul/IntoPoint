import React from 'react';

import classes from './BookmarksEdit.css';

const BookmarksEdit = (props) => {

	const {
		saveBookmark, addTag, title, link, tags, chips, userTags, updateField,
		updateTags, toggleModal, isInvalid
	} = props;

	return (
		<div className={classes.BookmarksEdit}>
			<h4 className="text-center">Edit Bookmark</h4>

			<form onSubmit={saveBookmark}>
				<div className="form-group row">
					<label htmlFor="titleBookmark" className="col-sm-2 col-form-label">Title</label>
					<input
						id="titleBookmark"
						className="form-control col-sm-9"
						value={title}
						onChange={event => updateField('title', event.target.value)}
						type="text"
						placeholder="Title Link"
					/>
				</div>

				<div className="form-group row">
					<label htmlFor="linkBookmark" className="col-sm-2 col-form-label">Link</label>
					<input
						id="linkBookmark"
						className="form-control col-sm-9"
						value={link}
						onChange={event => updateField('link', event.target.value)}
						type="text"
						placeholder="Link"
					/>
				</div>

				<div className="form-group row">
					<label htmlFor="tagsBookmark" className="col-sm-2 col-form-label">Tags</label>
					<input
						id="tagsBookmark"
						className="form-control col-sm-9"
						value={tags}
						onChange={event => updateTags(userTags, event.target.value)}
						type="text"
						placeholder="Tags"
					/>
				</div>

				<div>
					{chips.map((item, index) =>
						(item !== 'All' && item !== '') &&
						<span
							className={classes.TagBadge + ' badge badge-info'}
							key={index}
							onClick={() => addTag(item)}>
							<i className={classes.IconTag + ' fas fa-tag'}/>{' '}
							{item}
						</span>)}
				</div>

				<hr/>

				<div className="text-center">
					<button className={classes.EditBtn + ' btn btn-success'} disabled={isInvalid} type="submit">Save
						Link
					</button>
					<span className={classes.EditBtn + ' btn btn-info'} onClick={toggleModal}>Cancel</span>
				</div>

			</form>
		</div>
	);
};

export default BookmarksEdit;
