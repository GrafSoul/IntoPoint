import React from 'react';

import classes from './Footer.css';

const Footer = () => {
    return (
            <footer className={classes.Footer + ' shadow-lg'}>
                <p className={classes.FooterText}>2018 &copy; IntoPoint | Developed by Dmitriy Zatulovskiy - {' '}
	                <a href="https://github.com/Xgraf/IntoPoint" target="_blank" rel="noopener noreferrer">GitHub</a></p>
            </footer>
    );
};

export default Footer;
