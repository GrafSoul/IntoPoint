import React from 'react';

import classes from './Spinner.css';

const spinner = () => (

	<div className={classes.Spinner}>
		<p className={classes.SpinnerText}>Loading...</p>
		<div className={classes.Loader}>
			<div className={classes.Cube + ' ' + classes.Cube1}/>
			<div className={classes.Cube + ' ' + classes.Cube2}/>
			<div className={classes.Cube + ' ' + classes.Cube3}/>
			<div className={classes.Cube + ' ' + classes.Cube4}/>
		</div>
	</div>


);

export default spinner;
