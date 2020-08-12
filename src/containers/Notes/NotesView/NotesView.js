import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import hljs from "highlight.js";
import $ from "jquery";

import classes from "./NotesView.module.css";

class NotesView extends Component {
  componentDidMount() {
    $(document).ready(function () {
      $("code")
        .addClass("javascript")
        .each(function (i, block) {
          hljs.highlightBlock(block);
        });
    });

    if (this.props.text) {
      let currentText = document.getElementById("currentText");
      currentText.innerHTML = this.props.text;
    }
  }

  render() {
    const {
      idNote,
      title,
      text,
      tags,
      editNote,
      removeNote,
      setStatus,
    } = this.props;

    let currentTags = tags.split(",");
    return (
      <div className="col-md-9">
        <h5 className={classes.NoteTitle}>{title}</h5>

        <div className={classes.NoteListWrap + " shadow-lg"}>
          <div className={classes.NoteListWrapTop} />

          <Scrollbars
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            autoHeight
            autoHeightMax={486}
          >
            <div className={classes.NoteItem}>
              <div id="currentText" />

              <div className={classes.Icons}>
                <span
                  title="Edit Note"
                  onClick={() => editNote(idNote, text, title, tags)}
                >
                  <i className={classes.IconEdit + " far fa-edit"} />
                </span>{" "}
                <span
                  title="Remove the Note"
                  onClick={() => removeNote(idNote)}
                >
                  <i className={classes.IconDel + " far fa-trash-alt"} />
                </span>{" "}
                <span
                  title="Return to the List"
                  onClick={() => setStatus("listNotes")}
                >
                  <i className={classes.IconReturn + " fas fa-list"} />
                </span>
              </div>
            </div>
          </Scrollbars>

          <div className={classes.NoteListWrapBottom} />

          <div className={classes.NoteTags}>
            {currentTags.map((tag, index) => {
              return (
                <span
                  className={classes.TagBadge + " badge badge-info"}
                  key={index}
                >
                  <i className={classes.IconTag + " fas fa-tag"} /> {tag}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default NotesView;
