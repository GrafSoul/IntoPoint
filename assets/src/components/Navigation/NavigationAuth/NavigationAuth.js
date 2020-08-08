import React from 'react';
import {Link} from 'react-router-dom';
import * as routes from "../../../routes/routes";

import classes from './NavigationAuth.css';
import SignOut from '../../Auth/SignOut/SignOut';

const NavigationAuth  = (props) => {

	const {authUser, userName, activeLink, showSideDrawer} = props;
	const currentLocation = window.location.pathname;
	return (

		<ul className="nav">

			<li className="nav-item">
				<Link
					onClick={() => activeLink(routes.BOOKMARKS)}
					className={'nav-link ' + (currentLocation === routes.BOOKMARKS ? classes.NavigationActiveLink : '')}
					to={routes.BOOKMARKS}>

					<i className="fas fa-bookmark" /> Bookmarks</Link>
			</li>

			<li className="nav-item">
				<Link
					onClick={() => activeLink(routes.NOTES)}
					className={'nav-link ' + (currentLocation === routes.NOTES ? classes.NavigationActiveLink : '')}
					to={routes.NOTES}>

					<i className="fas fa-sticky-note" /> Notes</Link>
			</li>

			<li className="nav-item">
				<Link
					onClick={() => activeLink(routes.RSS)}
					className={'nav-link ' + (currentLocation === routes.RSS ? classes.NavigationActiveLink : '')}
					to={routes.RSS}>

					<i className="fas fa-rss" /> RSS Reader</Link>
			</li>

			{authUser.email === 'workroompost@gmail.com' ?

			<li className="nav-item">
				<Link
					onClick={() => activeLink(routes.USERS)}
					className={'nav-link ' + (currentLocation === routes.USERS ? classes.NavigationActiveLink : '')}
					to={routes.USERS}>

				<i className="fas fa-users" /> Users</Link>
			</li>

			: null }

			<li className="nav-item">
				<Link
					onClick={() => activeLink(routes.SETTINGS)}
					className={'nav-link ' + (currentLocation === routes.SETTINGS ? classes.NavigationActiveLink : '')}
					to={routes.SETTINGS}>
				<i className="fas fa-cog" /> Settings</Link>
			</li>

			{userName && !showSideDrawer &&
			<li className="nav-item">
				<span className="nav-link">
					<span
						className={classes.NavigationAuthBadge + ' badge badge-success'}
					      color="success">
						Hello, {userName}!
					</span>
				</span>
			</li>}

			<li><SignOut sideDrawer={showSideDrawer}/></li>

		</ul>
	);
};

export default NavigationAuth;
