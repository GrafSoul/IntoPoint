import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import RSSParser from 'rss-parser';

import withAuthorization from '../../components/Session/withAuthorization/withAuthorization';
import * as actionCreators from '../../store/actions/index';
import {db} from "../../firebase/index";
import classes from './Rss.css';

import ModalWindow from '../../components/UI/Modal/Modal';
import RssAddNew from './RssAddNew/RssAddNew';
import RssEdit from './RssEdit/RssEdit';
import RssList from './RssList/RssList';
import RssView from './RssView/RssView';

class RssPage extends Component {

	componentDidMount() {

		this.getDataFeeds();
	}

	handleModalAddFeed = () => {
		const {rssInitial, rssToggleModal, rssStatusModal} = this.props;
		rssInitial();
		rssStatusModal('add');
		rssToggleModal()
	};

	handleAddFeed = (event) => {
		const {authUser, link, title, rssInitial, rssUpdateField, rssRemoveFeed} = this.props;
		db.doAddFeed(authUser.uid, link, title)
			.then(() => {
				rssInitial();
				rssRemoveFeed();
				this.getDataFeeds();
				this.getActiveFeed(link);
			})
			.catch(error => {
				rssUpdateField('error', error);
			});
		event.preventDefault();
	};

	handleModalEditFeed = (id, title, link) => {
		const {rssToggleModal, rssStatusModal, rssEditFeed} = this.props;
		rssEditFeed(id, title, link);
		rssStatusModal('edit');
		rssToggleModal()
	};

	handleEditFeed = (event) => {
		const {authUser, id, link, title, activeId,
			rssInitial, updateField, rssViewFeed} = this.props;

		db.doEditFeed(authUser.uid, id, link, title)
			.then(() => {
				rssInitial();
				this.getDataFeeds();
				if (id === activeId ){
					rssViewFeed(id, title, link);
				}
			})
			.catch(error => {
				updateField('error', error);
			});
		event.preventDefault();
	};

	handleRemoveFeed = (id) => {
		const {authUser, rssUpdateField, rssInitial, rssRemoveFeed} = this.props;

		db.doRemoveFeed(authUser.uid, id)
			.then(() => {
				rssInitial();
				rssRemoveFeed();
				this.getDataFeeds();
			})
			.catch(error => {
				rssUpdateField('error', error);
			});
	};

	handleGetRemoveIdFeed = () => {
		const {rssToggleModal, rssStatusModal} = this.props;
		rssStatusModal('remove');
		rssToggleModal();
	};

	handleActiveFeed = (id, title, link) => {
		const {rssClearFeed, rssViewFeed} = this.props;
		rssClearFeed();
		rssViewFeed(id, title, link);
		this.getActiveFeed(link);
	};

	handleReloadFeed = (link) => {
		const {rssClearFeed} = this.props;
		rssClearFeed();
		this.getActiveFeed(link);
	};

	getDataFeeds = () => {
		const {authUser, rssSet, activeLink} = this.props;
		db.onceGetUserFeeds(authUser.uid).then(snapshot => {
			rssSet(authUser.uid, snapshot.val());
		});

		if (activeLink !== '') {
			this.getActiveFeed(activeLink);
		}
	};

	getActiveFeed = (link) => {
		const {rssAddFeeds} = this.props;
		const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

		if (link !== '') {

			const parser = new RSSParser();

			parser.parseURL(CORS_PROXY + link, (error, feed) => {
				if (feed) {
					feed.id = Date.now();
					feed.items.forEach((item) => item.active = true);

					rssAddFeeds(feed)
				}
				if (error) console.log(error);
			});
		} else {
			return null;
		}
	};

	render() {

		const {
			userFeeds, link, title, rssUpdateField, error, modal, status, feeds, amountFeeds, rssToggleExpands,
			rssToggleModal, rssViewFeed, activeAmount, activeId, activeTitle, activeLink, expands
		} = this.props;

		const isInvalid = link === '' || title === '';

		return (
			<div className={classes.RssReader + ' container'}>

				<div className="container">
					<div className="row">
						<div className="col-12 col-md-9">
							<h3>RSS Reader</h3>
						</div>
						<div className="col-6 text-lg-right col-md-3">
							<button className="btn btn-success" onClick={this.handleModalAddFeed}>
								<i className="fas fa-plus"/> Add Feed
							</button>
						</div>
					</div>
				</div>

				<hr/>

				{error && <p>{error.message}</p>}

				<div className="container">
					<div className="row">

						{!expands ?
							<RssList
								amountFeeds={amountFeeds}
								activeLink={activeLink}
								rssViewFeed={rssViewFeed}
								activeFeed={this.handleActiveFeed}
								removeFeed={this.handleGetRemoveIdFeed}
								editFeed={this.handleModalEditFeed}
								userFeeds={userFeeds}
								getActiveFeed={this.getActiveFeed}
							/>
							: null}

						<RssView
							reloadFeed={this.handleReloadFeed}
							removeFeed={this.handleGetRemoveIdFeed}
							activeAmount={activeAmount}
							activeId={activeId}
							activeTitle={activeTitle}
							activeLink={activeLink}
							feeds={feeds}
							userFeeds={userFeeds}
							getActiveFeed={this.getActiveFeed}
							editFeed={this.handleModalEditFeed}
							toggleExpands={rssToggleExpands}
							expands={expands}
						/>

					</div>
				</div>

				<ModalWindow
					isOpen={modal}
					toggleModal={rssToggleModal}>

					{status === 'edit' &&
					<RssEdit
						editFeed={this.handleEditFeed}
						title={title}
						link={link}
						updateField={rssUpdateField}
						toggleModal={rssToggleModal}
						isInvalid={isInvalid}
					/>}

					{status === 'add' &&
					<RssAddNew
						addFeed={this.handleAddFeed}
						title={title}
						link={link}
						updateField={rssUpdateField}
						toggleModal={rssToggleModal}
						isInvalid={isInvalid}
					/>}

					{status === 'remove' &&
					<div className="text-center">
						<h5>Delete a Note</h5>
						<p>Do you really want to delete the note?</p>
						<div className={classes.RemoveBtnGroup + ' text-center'}>
							<button className="btn btn-danger" onClick={() => this.handleRemoveFeed(activeId)}>Yes
							</button>
							<button className="btn btn-info" onClick={rssToggleModal}>Cancel</button>
						</div>
					</div>}

				</ModalWindow>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	userFeeds: state.rssState.userFeeds,
	amountFeeds: state.rssState.amountFeeds,
	feeds: state.rssState.feeds,
	activeAmount: state.rssState.activeAmount,
	activeId: state.rssState.activeId,
	activeTitle: state.rssState.activeTitle,
	activeLink: state.rssState.activeLink,
	id: state.rssState.id,
	link: state.rssState.link,
	title: state.rssState.title,
	error: state.rssState.error,
	modal: state.rssState.modal,
	status: state.rssState.status,
	expands: state.rssState.expands,
	authUser: state.sessionState.authUser
});

const mapDispatchToProps = (dispatch) => ({
	rssSet: (id, set) => dispatch(actionCreators.rssSet(id, set)),
	rssInitial: () => dispatch(actionCreators.rssInitial()),
	rssToggleModal: () => dispatch(actionCreators.rssToggleModal()),
	rssStatusModal: (status) => dispatch(actionCreators.rssStatusModal(status)),
	rssToggleExpands: () => dispatch(actionCreators.rssToggleExpands()),
	rssClearFeed: () => dispatch(actionCreators.rssClearFeed()),
	rssRemoveFeed: () => dispatch(actionCreators.rssRemoveFeed()),
	rssUpdateField: (field, set) => dispatch(actionCreators.rssUpdateField(field, set)),
	rssViewFeed: (id, title, link) => dispatch(actionCreators.rssViewFeed(id, title, link)),
	rssEditFeed: (id, title, link) => dispatch(actionCreators.rssEditFeed(id, title, link)),
	rssAddFeeds: (feeds) => dispatch(actionCreators.rssAddFeeds(feeds)),
});

const authCondition = (authUser) => !!authUser;
export default compose(
	withAuthorization(authCondition),
	connect(mapStateToProps, mapDispatchToProps)
)(RssPage);
