import React from "react";

import classes from "./NotesTagsItem.module.css";

const NotesTagsItem = (props) => {
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

export default NotesTagsItem;
