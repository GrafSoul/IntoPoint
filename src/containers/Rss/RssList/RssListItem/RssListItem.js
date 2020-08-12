import React from "react";

import classes from "./RssListItem.module.css";

const RssListItem = (props) => {
  const {
    id,
    title,
    link,
    activeFeed,
    removeFeed,
    editFeed,
    activeLink,
  } = props;

  return (
    <span className={classes.FeedItemWrap}>
      <button
        href="#"
        className={
          classes.FeedItem +
          " nav-link " +
          (activeLink === link ? classes.FeedItemActive : "")
        }
        onClick={() => activeFeed(id, title, link)}
      >
        <i className={classes.FeedItemIcon + " fas fa-rss-square"} /> {title}
      </button>
      <span className={classes.FeedEditIcons}>
        <button onClick={() => editFeed(id, title, link)}>
          <i className={classes.FeedEditIcon + " far fa-edit"} />
        </button>
        <button onClick={() => removeFeed(id)}>
          <i className={classes.FeedEditIcon + " far fa-trash-alt"} />
        </button>
      </span>
    </span>
  );
};

export default RssListItem;
