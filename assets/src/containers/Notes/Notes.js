import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import withAuthorization from '../../components/Session/withAuthorization/withAuthorization';
import * as actionCreators from '../../store/actions/index';
import {db} from "../../firebase/index";

import classes from './Notes.css';
import NotesList from './NotesList/NotesList'
import NotesView from './NotesView/NotesView'
import NotesTagsList from './NotesTagsList/NotesTagsList'
import NotesAddNew from './NotesAddNew/NotesAddNew';
import NotesEdit from './NotesEdit/NotesEdit';
import ModalWindow from '../../components/UI/Modal/Modal';

class NotesPage extends Component {

	componentDidMount() {
		this.getDataNotes();
	}

	getDataNotes = () => {
		const {authUser, notesSet, updateTags} = this.props;
		db.onceGetUserNotes(authUser.uid).then(snapshot => {
			notesSet(authUser.uid, snapshot.val());
			updateTags({chips: this.props.userTags});
		});
	};

	handleAddNote = (event) => {
		const {authUser, text, title, tags, notesInitial, updateField, setStatus} = this.props;
		db.doAddNote(authUser.uid, text, title, tags)
			.then(() => {
				notesInitial();
				this.getDataNotes();
				setStatus('listNotes');
			})
			.catch(error => {
				updateField('error', error);
			});
		event.preventDefault();
	};

	handleModalAddNote = () => {
		const {notesInitial, setStatus} = this.props;
		setStatus('addNote');
		notesInitial();
	};

	handleViewEditNote = (idNote, text, title, tags) => {
		const {setStatus, noteEdit} = this.props;
		noteEdit(idNote, text, title, tags);
		setStatus('editNote');
	};

	handleViewNote = (idNote, text, title, tags) => {
		const {setStatus, noteView} = this.props;
		noteView(idNote, text, title, tags);
		setStatus('viewNote');
	};

	handleEditNote = (event) => {
		const {authUser, idNote, text, title, tags, notesInitial, noteEdit, updateField, setStatus} = this.props;

		db.doEditNote(authUser.uid, idNote, text, title, tags)
			.then(() => {
				notesInitial();
				this.getDataNotes();
				noteEdit(idNote, text, title, tags);
				setStatus('viewNote');
			})
			.catch(error => {
				updateField('error', error);
			});
		event.preventDefault();
	};

	handleRemoveNote = (idNote) => {
		const {authUser, updateField, setStatus, notesInitial, noteToggleModal} = this.props;
		db.doRemoveNote(authUser.uid, idNote)
			.then(() => {
				noteToggleModal();
				notesInitial();
				this.getDataNotes();
				setStatus('listNotes');
			})
			.catch(error => {
				updateField('error', error);
			});
	};

	handleGetRemoveIdNote = (idNote) => {
		const {noteToggleModal, noteRemove} = this.props;
		noteToggleModal();
		noteRemove(idNote);
	};

	handleFilterSet = (set) => {
		const {setStatus, filterSet} = this.props;
		setStatus('listNotes');
		filterSet(set);
	};

	handleAddTag = (newTag) => {
		const {tags, chips, updateTags} = this.props;
		let addTags = tags + (tags !== '' ? ',' : '') + newTag;
		let currentChips = chips.filter((item) => item !== newTag);
		updateTags({tags: addTags, chips: currentChips})
	};

	updateByPropertyTags = (userTags, value) => {
		const {updateTags} = this.props;
		let arrayValue = value.replace(/\s+/g, '').split(',');
		let arrayChips = [...new Set(arrayValue)];
		let newValue = arrayChips.join(',');
		if (newValue.length === 0) arrayChips = userTags;
		updateTags({tags: newValue, chips: arrayChips});
	};

	render() {
		const {
			status, text, title, tags, chips, error, updateField, idNote, searchTags,
			searchTagsList, searchValue, userNotes, userTags, filter, setStatus, modal, noteToggleModal
		} = this.props;

		const isInvalid = text === '' || title === '' || tags === '';

		return (
			<div className={classes.Notes + ' container'}>

				<div className="container">
					<div className="row">
						<div className="col-12 col-md-9">
							<h3>Notes</h3>
						</div>
						<div className="col-6 text-lg-right col-md-3">
							<button
								disabled={status === 'editNote' || status === 'addNote' }
								className="btn btn-success" onClick={this.handleModalAddNote}							>
								<i className="fas fa-plus"/> Add Notes
							</button>
						</div>
					</div>
				</div>

				<hr/>

				{error && <p>{error.message}</p>}

				<div className="container">
					<div className="row">

						<NotesTagsList
							tags={userTags}
							filter={filter}
							searchValue={searchValue}
							searchTags={searchTags}
							searchTagsList={searchTagsList}
							filterSet={this.handleFilterSet}/>

						<hr/>

						{ status === 'listNotes' &&
							<NotesList
								notes={userNotes}
								searchValue={searchValue}
								filter={filter}
								removeNote={this.handleGetRemoveIdNote}
								editNote={this.handleViewEditNote}
								noteView={this.handleViewNote}
								toggleModal={noteToggleModal}
							/>
						}

						{status === 'viewNote' &&
							<NotesView
								idNote={idNote}
								title={title}
								text={text}
								tags={tags}
								chips={chips}
								removeNote={this.handleGetRemoveIdNote}
								editNote={this.handleViewEditNote}
								setStatus={setStatus}
							/>
						}

						{status === 'addNote' &&
							<NotesAddNew
								addNote={this.handleAddNote}
								addTag={this.handleAddTag}
								updateTags={this.updateByPropertyTags}
								title={title}
								text={text}
								tags={tags}
								chips={chips}
								userTags={userTags}
								updateField={updateField}
								isInvalid={isInvalid}
								setStatus={setStatus}
							/>
						}

						{status === 'editNote' &&
							<NotesEdit
								saveNote={this.handleEditNote}
								addTag={this.handleAddTag}
								updateTags={this.updateByPropertyTags}
								idNote={idNote}
								title={title}
								text={text}
								tags={tags}
								chips={chips}
								userTags={userTags}
								updateField={updateField}
								isInvalid={isInvalid}
								setStatus={setStatus}
							/>
						}

					</div>
				</div>

				<ModalWindow
					isOpen={modal}
					toggleModal={noteToggleModal}>

					<div className="text-center">
						<h5>Delete a Note</h5>
						<p>Do you really want to delete the note?</p>
						<div className={classes.RemoveBtnGroup + ' text-center'}>
							<button className="btn btn-danger" onClick={() => this.handleRemoveNote(idNote)}>Yes</button>
							<button className="btn btn-info" onClick={noteToggleModal}>Cancel</button>
						</div>
					</div>

				</ModalWindow>

			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	userNotes: state.notesState.userNotes,
	userTags: state.notesState.userTags,
	idNote: state.notesState.idNote,
	text: state.notesState.text,
	title: state.notesState.title,
	tags: state.notesState.tags,
	chips: state.notesState.chips,
	error: state.notesState.error,
	filter: state.notesState.filter,
	searchTags: state.notesState.searchTags,
	searchValue: state.notesState.searchValue,
	status: state.notesState.status,
	modal: state.notesState.modal,
	authUser: state.sessionState.authUser
});

const mapDispatchToProps = (dispatch) => ({
	notesSet: (id, set) => dispatch(actionCreators.notesSet(id, set)),
	notesInitial: () => dispatch(actionCreators.notesInitial()),
	updateField: (field, set) => dispatch(actionCreators.notesUpdateField(field, set)),
	updateTags: (set) => dispatch(actionCreators.notesUpdateTags(set)),
	filterSet: (set) => dispatch(actionCreators.notesFilterSet(set)),
	searchTagsList: (value, tags) => dispatch(actionCreators.notesSearchTagsList(value, tags)),
	noteEdit: (id, text, title, tags) => dispatch(actionCreators.noteEdit(id, text, title, tags)),
	noteView: (id, text, title, tags) => dispatch(actionCreators.noteView(id, text, title, tags)),
	setStatus: (stat) => dispatch(actionCreators.noteSetStatus(stat)),
	noteRemove: (idNote) => dispatch(actionCreators.noteRemove(idNote)),
	noteToggleModal: () => dispatch(actionCreators.noteToggleModal())
});

const authCondition = (authUser) => !!authUser;
export default compose(
	withAuthorization(authCondition),
	connect(mapStateToProps, mapDispatchToProps)
)(NotesPage);
