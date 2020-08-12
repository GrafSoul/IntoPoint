import React from "react";

import classes from "./BookmarksItem.module.css";

const BookmarksItem = (props) => {
  return (
    <li className={classes.BookmarksItem}>
      <span className="row">
        <span className="col">
          <p className={classes.Title}>
            <a
              className={classes.Link}
              href={props.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={classes.IconLink + " fas fa-link"} /> {props.title}
            </a>
          </p>
          <span>
            {props.bookmarkTags.map(
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
            onClick={() =>
              props.editBookmark(
                props.idBookmark,
                props.link,
                props.title,
                props.tags
              )
            }
          >
            <i className={classes.IconEdit + " far fa-edit"} />
          </span>{" "}
          <span onClick={() => props.removeBookmark(props.idBookmark)}>
            <i className={classes.IconDel + " far fa-trash-alt"} />
          </span>
        </span>
      </span>
    </li>
  );
};

export default BookmarksItem;
