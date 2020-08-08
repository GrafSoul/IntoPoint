import React from 'react';
import {Link} from 'react-router-dom';
import * as routes from "../../../../routes/routes";

const SignInLink = () => {
	return (
		<p className="center-align">
			Do you have an account? {' '}
			<Link to={routes.SIGN_IN}>Sign In</Link>
		</p>
	);
};

export default SignInLink;
