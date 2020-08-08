import React from 'react';

import classes from './RssListItem.css';

const RssListItem = (props) => {
	const {id, title, link, activeFeed, removeFeed, editFeed, activeLink} = props;

	return (
		<span className={classes.FeedItemWrap}>
			<a className={classes.FeedItem + ' nav-link ' + (activeLink === link ? classes.FeedItemActive : '')}
		   onClick={() => activeFeed(id, title, link)}>
				<i className={classes.FeedItemIcon + ' fas fa-rss-square'}/>{' '}
			{title}
			</a>
			<span className={classes.FeedEditIcons}>
				<a onClick={() => editFeed(id, title, link)}>
					<i className={classes.FeedEditIcon + ' far fa-edit'} />
				</a>
				<a onClick={() => removeFeed(id)}>
					<i className={classes.FeedEditIcon + ' far fa-trash-alt'}/>
				</a>

			</span>

		</span>
	);
};

export default RssListItem;
