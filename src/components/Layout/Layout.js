import React, { Component } from "react";

import classes from "./Layout.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

class Layout extends Component {
  render() {
    return (
      <div>
        <Header />
        <main className={classes.Content}>{this.props.children}</main>
        <Footer />
      </div>
    );
  }
}

export default Layout;
