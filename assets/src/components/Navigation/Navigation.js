import React from 'react';

import NavigationAuth from './NavigationAuth/NavigationAuth';
import NavigationNonAuth from './NavigationNonAuth/NavigationNonAuth';

const Navigation = (props) => {
	const {authUser, userName, activeLink, linkSelected, showSideDrawer} = props;
	return (
		<div>
			{authUser
				? <NavigationAuth
					showSideDrawer={showSideDrawer}
					activeLink={activeLink}
					authUser={authUser}
					userName={userName}/>
				: <NavigationNonAuth
					linkSelected={linkSelected}
					activeLink={activeLink}/>
			}
		</div>
	);
};

export default Navigation;
