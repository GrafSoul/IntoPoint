import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

import classes from "./NotesList.module.css";
import NotesItem from "./NotesItem/NotesItem";

const NotesList = (props) => {
  const { notes, filter, noteView, searchValue, editNote, removeNote } = props;

  const notesList = notes
    ? notes.map((item) => {
        let noteTags = item.tags.replace(/\s+/g, "").split(",");
        let notesItem = (
          <NotesItem
            key={item.key}
            idNote={item.key}
            text={item.text}
            title={item.title}
            tags={item.tags}
            noteView={noteView}
            editNote={editNote}
            removeNote={removeNote}
            noteTags={noteTags}
          />
        );

        if (noteTags.indexOf(filter) >= 0) {
          return notesItem;
        } else if (filter === "All") {
          return notesItem;
        } else {
          return null;
        }
      })
    : null;

  return (
    <div className="col-md-9">
      <h5 className={classes.TitleList}>List of Notes</h5>

      {notes.length !== 0 ? (
        <div className={classes.NotesListWrap + " shadow-lg"}>
          <div className={classes.NotesListWrapTop} />
          <Scrollbars
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            autoHeight
            autoHeightMax={546}
          >
            <ul className="list-group">{notesList}</ul>
          </Scrollbars>
          <div className={classes.NotesListWrapBottom} />
        </div>
      ) : (
        <p className={classes.ListEmpty}>
          You have no saved note! Add the first note by clicking on the button -
          Add Note
        </p>
      )}

      {filter === null && (
        <p className={classes.ListEmpty}>
          You have no records with a tag - <b>"{searchValue}"</b>
        </p>
      )}
    </div>
  );
};

export default NotesList;
