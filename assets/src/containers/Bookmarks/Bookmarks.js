import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import withAuthorization from "../../components/Session/withAuthorization/withAuthorization";
import * as actionCreators from "../../store/actions/index";
import { db } from "../../firebase/index";

import classes from "./Bookmarks.module.css";
import BookmarksList from "./BookmarksList/BookmarksList";
import BookmarksTagsList from "./BookmarksTagsList/BookmarksTagsList";
import ModalWindow from "../../components/UI/Modal/Modal";
import BookmarksAddNew from "./BookmarksAddNew/BookmarksAddNew";
import BookmarksEdit from "./BookmarksEdit/BookmarksEdit";

class BookmarksPage extends Component {
  componentDidMount() {
    this.getDataBookmarks();
  }

  getDataBookmarks = () => {
    const { authUser, bookmarksSet, updateTags } = this.props;
    db.onceGetUserBookmarks(authUser.uid).then((snapshot) => {
      bookmarksSet(authUser.uid, snapshot.val());
      updateTags({ chips: this.props.userTags });
    });
  };

  handleAddBookmark = (event) => {
    const {
      authUser,
      link,
      title,
      tags,
      bookmarksInitial,
      updateField,
    } = this.props;
    db.doAddBookmark(authUser.uid, link, title, tags)
      .then(() => {
        bookmarksInitial();
        this.getDataBookmarks();
      })
      .catch((error) => {
        updateField("error", error);
      });
    event.preventDefault();
  };

  handleModalAddBookmark = () => {
    const { bookmarksInitial, toggleModal } = this.props;
    bookmarksInitial();
    toggleModal();
  };

  handleModalEditBookmark = (idBookmark, link, title, tags) => {
    this.props.bookmarkEdit(idBookmark, link, title, tags);
  };

  handleEditBookmark = (event) => {
    const {
      authUser,
      idBookmark,
      link,
      title,
      tags,
      bookmarksInitial,
      updateField,
    } = this.props;

    db.doEditBookmark(authUser.uid, idBookmark, link, title, tags)
      .then(() => {
        bookmarksInitial();
        this.getDataBookmarks();
      })
      .catch((error) => {
        updateField("error", error);
      });
    event.preventDefault();
  };

  handleRemoveBookmark = (idBookmark) => {
    const { authUser, updateField, bookmarksInitial } = this.props;
    db.doRemoveBookmark(authUser.uid, idBookmark)
      .then(() => {
        bookmarksInitial();
        this.getDataBookmarks();
      })
      .catch((error) => {
        updateField("error", error);
      });
  };

  handleFilterSet = (set) => {
    const { filterSet } = this.props;
    filterSet(set);
  };

  handleAddTag = (newTag) => {
    const { tags, chips, updateTags } = this.props;
    let addTags = tags + (tags !== "" ? "," : "") + newTag;
    let currentChips = chips.filter((item) => item !== newTag);
    updateTags({ tags: addTags, chips: currentChips });
  };

  updateByPropertyTags = (userTags, value) => {
    const { updateTags } = this.props;
    let arrayValue = value.replace(/\s+/g, "").split(",");
    let arrayChips = [...new Set(arrayValue)];
    let newValue = arrayChips.join(",");
    if (newValue.length === 0) arrayChips = userTags;
    updateTags({ tags: newValue, chips: arrayChips });
  };

  render() {
    const {
      link,
      title,
      tags,
      chips,
      error,
      updateField,
      idBookmark,
      searchTags,
      searchTagsList,
      searchValue,
      userBookmarks,
      userTags,
      filter,
      modal,
      isEdit,
      toggleModal,
    } = this.props;

    const isInvalid = link === "" || title === "" || tags === "";

    return (
      <div className={classes.Bookmarks + " container"}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-9">
              <h3>Bookmarks</h3>
            </div>
            <div className="col-6 text-lg-right col-md-3">
              <button
                className="btn btn-success"
                onClick={this.handleModalAddBookmark}
              >
                <i className="fas fa-plus" /> Add Bookmark
              </button>
            </div>
          </div>
        </div>

        <hr />

        {error && <p>{error.message}</p>}

        <div className="container">
          <div className="row">
            <BookmarksTagsList
              tags={userTags}
              filter={filter}
              searchValue={searchValue}
              searchTags={searchTags}
              searchTagsList={searchTagsList}
              filterSet={this.handleFilterSet}
            />

            <hr />

            <BookmarksList
              bookmarks={userBookmarks}
              searchValue={searchValue}
              filter={filter}
              removeBookmark={this.handleRemoveBookmark}
              editBookmark={this.handleModalEditBookmark}
            />
          </div>
        </div>

        <ModalWindow isOpen={modal} toggleModal={toggleModal}>
          {!isEdit ? (
            <BookmarksAddNew
              addBookmark={this.handleAddBookmark}
              addTag={this.handleAddTag}
              updateTags={this.updateByPropertyTags}
              title={title}
              link={link}
              tags={tags}
              chips={chips}
              userTags={userTags}
              updateField={updateField}
              toggleModal={toggleModal}
              isInvalid={isInvalid}
            />
          ) : (
            <BookmarksEdit
              saveBookmark={this.handleEditBookmark}
              addTag={this.handleAddTag}
              updateTags={this.updateByPropertyTags}
              idBookmark={idBookmark}
              title={title}
              link={link}
              tags={tags}
              chips={chips}
              userTags={userTags}
              updateField={updateField}
              toggleModal={toggleModal}
              isInvalid={isInvalid}
            />
          )}
        </ModalWindow>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userBookmarks: state.bookmarksState.userBookmarks,
  userTags: state.bookmarksState.userTags,
  idBookmark: state.bookmarksState.idBookmark,
  link: state.bookmarksState.link,
  title: state.bookmarksState.title,
  tags: state.bookmarksState.tags,
  chips: state.bookmarksState.chips,
  error: state.bookmarksState.error,
  filter: state.bookmarksState.filter,
  searchTags: state.bookmarksState.searchTags,
  searchValue: state.bookmarksState.searchValue,
  modal: state.bookmarksState.modal,
  isEdit: state.bookmarksState.isEdit,
  authUser: state.sessionState.authUser,
});

const mapDispatchToProps = (dispatch) => ({
  bookmarksSet: (id, set) => dispatch(actionCreators.bookmarksSet(id, set)),
  bookmarksInitial: () => dispatch(actionCreators.bookmarksInitial()),
  updateField: (field, set) => dispatch(actionCreators.updateField(field, set)),
  updateTags: (set) => dispatch(actionCreators.updateTags(set)),
  filterSet: (set) => dispatch(actionCreators.filterSet(set)),
  searchTagsList: (value, tags) =>
    dispatch(actionCreators.searchTagsList(value, tags)),
  toggleModal: () => dispatch(actionCreators.toggleModal()),
  bookmarkEdit: (id, link, title, tags) =>
    dispatch(actionCreators.bookmarkEdit(id, link, title, tags)),
});

const authCondition = (authUser) => !!authUser;
export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(BookmarksPage);
