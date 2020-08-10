import React from "react";

import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.Footer + " shadow-lg"}>
      <p className={classes.FooterText}>
        &copy; 2020 | IntoPoint | Developed by Dmitriy Zatulovskiy -{" "}
        <a
          href="https://github.com/GrafSoul/IntoPoint"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </p>
    </footer>
  );
};

export default Footer;
