import React from "react";

import classes from "./BookmarksTagsItem.module.css";

const BookmarksTagsItem = (props) => {
  return (
    <button
      className={
        classes.TagItem +
        " nav-link " +
        (props.filter === props.tag ? classes.TagItemActive : "")
      }
      onClick={() => props.filterSet(props.tag)}
    >
      <i className={classes.TagItemIcon + " fas fa-tags"} /> {props.tag}
    </button>
  );
};

export default BookmarksTagsItem;
