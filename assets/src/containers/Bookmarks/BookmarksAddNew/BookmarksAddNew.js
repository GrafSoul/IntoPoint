import React from 'react';

import classes from './BookmarksAddNew.css';

const BookmarksAddNew = (props) => {

	const {addBookmark, addTag, title,link,	tags,chips,	userTags, updateField,
		updateTags,	toggleModal, isInvalid} = props;

    return (
            <div className={classes.BookmarksAddNew}>
	            <h4 className="text-center">Add New Bookmark</h4>

	            <form onSubmit={addBookmark}>
		            <input
			            className="form-control"
			            value={title}
			            onChange={event => updateField('title', event.target.value)}
			            type="text"
			            placeholder="Add New Title Link"
		            />

		            <input
			            className="form-control"
			            value={link}
			            onChange={event => updateField('link', event.target.value)}
			            type="text"
			            placeholder="Add New Link"
		            />

		            <input
			            className="form-control"
			            value={tags}
			            onChange={event => updateTags(userTags, event.target.value)}
			            type="text"
			            placeholder="Add New Tags"
		            />

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

		            <hr />

		            <div className="text-center">
			            <button className={classes.SaveBtn + ' btn btn-success'} disabled={isInvalid} type="submit">Add Link</button>
			            <span className={classes.SaveBtn + ' btn btn-info'} onClick={toggleModal}>Cancel</span>
		            </div>

	            </form>
            </div>
        );
};

export default BookmarksAddNew;
