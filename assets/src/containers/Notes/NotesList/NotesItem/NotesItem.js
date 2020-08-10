import React from "react";

import classes from "./NotesItem.module.css";

const BookmarksItem = (props) => {
  const { idNote, text, title, tags, noteTags, editNote, removeNote } = props;

  return (
    <li className={classes.NotesItem}>
      <span className="row">
        <span className="col">
          <p className={classes.Title}>
            <span
              className={classes.Link}
              onClick={() => props.noteView(idNote, text, title, tags)}
            >
              <i className={classes.IconLink + " fas fa-sticky-note"} /> {title}
            </span>
          </p>
          <span>
            {noteTags.map(
              (item, index) =>
                item !== "All" &&
                item !== "" && (
                  <span
                    className={classes.TagBadge + " badge badge-info"}
                    key={index}
                  >
                    <i className={classes.IconTag + " fas fa-tag"} /> {item}
                  </span>
                )
            )}
          </span>
        </span>
        <span className="col-md-auto">
          <span
            title="Edit Note"
            onClick={() => editNote(idNote, text, title, tags)}
          >
            <i className={classes.IconEdit + " far fa-edit"} />
          </span>{" "}
          <span title="Remove the Note" onClick={() => removeNote(idNote)}>
            <i className={classes.IconDel + " far fa-trash-alt"} />
          </span>
        </span>
      </span>
    </li>
  );
};

export default BookmarksItem;
