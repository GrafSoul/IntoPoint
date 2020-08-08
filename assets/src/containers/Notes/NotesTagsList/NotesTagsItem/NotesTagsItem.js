import React from 'react';

import classes from './NotesTagsItem.css';

const NotesTagsItem = (props) => {
	return (
		<a className={classes.TagItem + ' nav-link ' + (props.filter === props.tag ? classes.TagItemActive : '')}
			onClick={() => props.filterSet(props.tag)}><i className={classes.TagItemIcon + ' fas fa-tags'}/> {props.tag}</a>
	);
};

export default NotesTagsItem;
