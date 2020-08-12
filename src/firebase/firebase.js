import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// import prodConfig from './config/config.prod.example';
// import devConfig from './config/config.dev.example';

import prodConfig from './config/config.prod';
import devConfig from './config/config.dev';

const config = process.env.NODE_ENV === 'production'
	? prodConfig
	: devConfig;

if (!firebase.apps.length) {
	firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
	db,
	auth,
};
