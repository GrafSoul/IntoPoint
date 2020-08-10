import React, { Component } from "react";
import CKEditor from "react-ckeditor-component";
import { Scrollbars } from "react-custom-scrollbars";

import classes from "./NotesAddNew.module.css";

class NotesAddNew extends Component {
  onChange = (event) => {
    // console.log("onChange fired with event info: ", event);
    let newContent = event.editor.getData();
    this.props.updateField("text", newContent);
  };

  onBlur = (evt) => {
    // console.log("onBlur event called with event info: ", evt);
  };

  afterPaste = (evt) => {
    // console.log("afterPaste event called with event info: ", evt);
  };

  render() {
    const {
      addNote,
      addTag,
      title,
      text,
      tags,
      chips,
      userTags,
      updateField,
      updateTags,
      isInvalid,
      setStatus,
    } = this.props;

    return (
      <div className="col-md-9">
        <form onSubmit={addNote}>
          <h5 className={classes.NoteTitle}>Add New Note</h5>

          <div className={classes.Icons + " text-center"}>
            <button
              className={classes.IconSave}
              title="Save Note"
              disabled={isInvalid}
              type="submit"
            >
              <i className="far fa-save" />
            </button>
            <span
              className={classes.IconReturn}
              title="Return to the List"
              onClick={() => setStatus("listNotes")}
            >
              <i className="fas fa-list" />
            </span>
          </div>

          <div className={classes.NoteWrap + " shadow-lg"}>
            <div className={classes.NoteWrapTop} />

            <Scrollbars
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}
              autoHeight
              autoHeightMax={540}
            >
              <div className={classes.NotesAddNew}>
                <input
                  className="form-control"
                  value={title}
                  onChange={(event) => updateField("title", event.target.value)}
                  type="text"
                  placeholder="Add Title "
                />

                <CKEditor
                  activeClass="p10"
                  content={text}
                  events={{
                    blur: this.onBlur,
                    afterPaste: this.afterPaste,
                    change: this.onChange,
                  }}
                />

                <input
                  className={classes.InputTags + " form-control"}
                  value={tags}
                  onChange={(event) => updateTags(userTags, event.target.value)}
                  type="text"
                  placeholder="Add Tags"
                />

                <div>
                  {chips.map(
                    (item, index) =>
                      item !== "All" &&
                      item !== "" && (
                        <span
                          className={classes.TagBadge + " badge badge-info"}
                          key={index}
                          onClick={() => addTag(item)}
                        >
                          <i className={classes.IconTag + " fas fa-tag"} />{" "}
                          {item}
                        </span>
                      )
                  )}
                </div>
              </div>
            </Scrollbars>

            <div className={classes.NoteWrapBottom} />
          </div>
        </form>
      </div>
    );
  }
}

export default NotesAddNew;
