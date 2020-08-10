import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";

import classes from "./RssList.module.css";
import RssListItem from "./RssListItem/RssListItem";

class RssList extends Component {
  render() {
    const {
      userFeeds,
      activeFeed,
      rssAddFeeds,
      activeLink,
      amountFeeds,
      removeFeed,
      editFeed,
    } = this.props;

    const feedsList = userFeeds.map((item, index) => {
      return (
        <RssListItem
          key={index}
          id={item.id}
          link={item.link}
          title={item.title}
          activeLink={activeLink}
          activeFeed={activeFeed}
          removeFeed={removeFeed}
          editFeed={editFeed}
          rssAddFeeds={rssAddFeeds}
        />
      );
    });

    return (
      <div className={classes.RssList + " col-md-3"}>
        <h5 className={classes.RssListTitle}>
          Feeds <span className={classes.Amount}>({amountFeeds})</span>
        </h5>

        {userFeeds.length !== 0 ? (
          <div className={classes.NavRssList}>
            <div className={classes.NavRssListTop} />

            <Scrollbars
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}
              autoHeight
              autoHeightMax={490}
            >
              <nav className="nav flex-column">{feedsList}</nav>
            </Scrollbars>

            <div className={classes.NavRssListBottom} />
          </div>
        ) : (
          <p className={classes.ListEmpty}>(Empty, No Feeds)</p>
        )}
      </div>
    );
  }
}

export default RssList;
