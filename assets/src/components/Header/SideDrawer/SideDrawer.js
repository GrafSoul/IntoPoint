import React from 'react';

import Navigation from '../../Navigation/Navigation';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.css';
import * as routes from "../../../routes/routes";

const SideDrawer = (props) => {
	const {authUser, userName, userEmail, activeLink, open, closed} = props;

	let attachedClasses = [classes.SideDrawer, classes.Close];

	if (open) {
		attachedClasses = [classes.SideDrawer, classes.Open];
	}

	return (
		<div>
			<Backdrop show={open} clicked={closed}/>

			<div className={attachedClasses.join(' ')}>

				<a href={routes.LANDING}
				   className={classes.Brand}>Bookmarks</a>

				<nav className={classes.SideDrawerNav} onClick={closed}>
					<Navigation
						showSideDrawer={open}
						authUser={authUser}
					    activeLink={activeLink}
					    userName={userName}
					    userEmail={userEmail} />
				</nav>
			</div>
		</div>
	);
};

export default SideDrawer;
