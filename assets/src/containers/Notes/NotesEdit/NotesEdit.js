import React, {Component} from 'react';
import CKEditor from "react-ckeditor-component";
import {Scrollbars} from 'react-custom-scrollbars';

import classes from './NotesEdit.css';

class NotesEdit extends Component {

	onChange = (event) => {
		// console.log("onChange fired with event info: ", event);
		let newContent = event.editor.getData();
		this.props.updateField('text', newContent);
	};

	onBlur = (evt) => {
		// console.log("onBlur event called with event info: ", evt);
	};

	afterPaste = (evt) => {
		// console.log("afterPaste event called with event info: ", evt);
	};

	render() {

		const {
			saveNote, addTag, title, text, tags, chips, userTags, updateField,
			updateTags, setStatus, isInvalid
		} = this.props;

		return (
			<div className={classes.NoteEditHeader + ' col-md-9'}>

				<form onSubmit={saveNote}>

				<h5 className={classes.NoteTitle}>Edit Note: {title}</h5>

				<div className={classes.Icons + ' text-center'}>
					<button
							className={classes.IconSave}
							title="Save Note"
							disabled={isInvalid}
							type="submit"><i className="far fa-save" /></button>
					<span
						title="Return to the List"
						className={classes.IconReturn}
						onClick={() => setStatus('listNotes')}>
							<i className="fas fa-list" /></span>
				</div>

				<div className={classes.NoteWrap + ' shadow-lg'}>

					<div className={classes.NoteWrapTop}/>

					<Scrollbars
						autoHide
						autoHideTimeout={1000}
						autoHideDuration={200}
						autoHeight
						autoHeightMax={540}>

						<div className={classes.NoteEdit}>

								<input
									id="titleNote"
									className="form-control"
									value={title}
									onChange={event => updateField('title', event.target.value)}
									type="text"
									placeholder="Note Title"
								/>

								<CKEditor
									activeClass="p10"
									content={text}
									events={{
										"blur": this.onBlur,
										"afterPaste": this.afterPaste,
										"change": this.onChange
									}}
								/>

								<input
									id="tagsNote"
									className={classes.InputTags + ' form-control'}
									value={tags}
									onChange={event => updateTags(userTags, event.target.value)}
									type="text"
									placeholder="Tags"
								/>

								{chips.map((item, index) =>
									(item !== 'All' && item !== '') &&
									<span
										className={classes.TagBadge + ' badge badge-info'}
										key={index}
										onClick={() => addTag(item)}>
										<i className={classes.IconTag + ' fas fa-tag'}/>{' '}
										{item}
								</span>)}

						</div>

					</Scrollbars>

					<div className={classes.NoteWrapBottom}/>

				</div>
				</form>
			</div>
		);
	}
}

export default NotesEdit;
