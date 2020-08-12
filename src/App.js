import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import withAuthentication from './components/Session/withAuthentication/withAuthentication';
import * as routes from './routes/routes';

import Layout from './components/Layout/Layout'
import EmptyPage from './components/EmptyPage/EmptyPage';
import Landing from './containers/Landing/Landing';
import SignUpPage from './components/Auth/SignUp/SignUp';
import SignInPage from './components/Auth/SignIn/SignIn';
import PasswordForgetPage from './components/Auth/PasswordForget/PasswordForget';
import UsersPage from './containers/Users/Users';
import BookmarksPage from './containers/Bookmarks/Bookmarks';
import NotesPage from './containers/Notes/Notes';
import RssPage from './containers/Rss/Rss';
import SettingsPage from './containers/Settings/Settings';

class App extends Component {
	render() {
		return (
			<Router>
				<Layout>
					<Switch>
						<Route exact path={routes.HOME} component={() => <Landing/>}/>
						<Route path={routes.LANDING} component={() => <Landing/>}/>
						<Route path={routes.SIGN_UP} component={() => <SignUpPage/>}/>
						<Route path={routes.SIGN_IN} component={() => <SignInPage/>}/>
						<Route path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage/>}/>
						<Route path={routes.USERS} component={() => <UsersPage/>}/>
						<Route path={routes.RSS} component={() => <RssPage/>}/>
						<Route path={routes.BOOKMARKS} component={() => <BookmarksPage/>}/>
						<Route path={routes.NOTES} component={() => <NotesPage/>}/>
						<Route path={routes.SETTINGS} component={() => <SettingsPage/>}/>
						<Route render={() => <EmptyPage/>}/>
					</Switch>
				</Layout>
			</Router>
		);
	}
}

export default withAuthentication(App);
