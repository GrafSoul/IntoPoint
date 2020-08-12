import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import Parser from "html-react-parser";

import classes from "./RssView.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";

class RssView extends Component {
  componentDidMount() {
    setTimeout(() => {
      if (this.props.activeLink !== "")
        this.props.getActiveFeed(this.props.activeLink);
    }, 3000);
  }

  componentWillUpdate(prevProps, prevState) {
    setTimeout(() => {
      if (prevProps.activeLink !== this.props.activeLink)
        this.props.getActiveFeed(this.props.activeLink);
    }, 3000);
  }

  render() {
    const {
      feeds,
      userFeeds,
      activeAmount,
      activeId,
      activeTitle,
      activeLink,
      reloadFeed,
      removeFeed,
      toggleExpands,
      expands,
      editFeed,
    } = this.props;

    let currentFeed = null;
    let arrayFeeds = feeds.items;

    if (arrayFeeds) {
      currentFeed = arrayFeeds.map((item, index) => {
        let date = Date.parse(item.pubDate);
        let newDate = new Date(date);
        let textDate =
          newDate.getDate() +
          "/" +
          newDate.getMonth() +
          "/" +
          newDate.getFullYear() +
          " - " +
          newDate.getHours() +
          ":" +
          newDate.getMinutes() +
          ":" +
          newDate.getSeconds();

        return (
          <div key={index}>
            {item.enclosure && (
              <img
                className={classes.Images}
                src={item.enclosure.url}
                alt={item.title}
              />
            )}
            <h5 className={classes.Title}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <i className={classes.LinkItemIcon + " fas fa-link"} />{" "}
                {item.title}
              </a>
            </h5>
            {item.categories && (
              <p className={classes.Categories}>{item.categories.join(", ")}</p>
            )}
            {item.pubDate && <p className={classes.Date}>{textDate}</p>}
            {item.author && <p className={classes.Author}>{item.author}</p>}
            {item.content && (
              <p className={classes.Content + " cont"}>
                {Parser(item.content)}
              </p>
            )}
            <div className={classes.Clear} />
            <hr />
          </div>
        );
      });
    }
    return (
      <div className={expands ? classes.RssReaderFull : "col-md-9"}>
        {activeTitle && (
          <header>
            <h5 className={classes.HeaderTitle}>
              {activeTitle}{" "}
              <span className={classes.Amount}>({activeAmount})</span>
            </h5>

            <div className={classes.FeedsIcons}>
              <button
                title="Reload Feed"
                onClick={() => reloadFeed(activeLink)}
              >
                {" "}
                <i className={classes.ReloadIcon + " fas fa-sync"} />
              </button>
              <button
                title="Reload Feed"
                onClick={() => editFeed(activeId, activeTitle, activeLink)}
              >
                {" "}
                <i className={classes.ReloadIcon + " far fa-edit"} />
              </button>
              <button title="Remove Feed" onClick={() => removeFeed(activeId)}>
                {" "}
                <i className={classes.ReloadIcon + " far fa-trash-alt"} />
              </button>
            </div>
          </header>
        )}

        {!activeTitle && (
          <header>
            <h5 className={classes.HeaderTitle}>No active Feed</h5>
            <hr />
          </header>
        )}
        {feeds.length !== 0 ? (
          <div className={classes.RssReaderListWrap + " shadow-lg"}>
            <div className={classes.RssReaderListWrapTop} />

            <div className={classes.ExpandIcons}>
              {!expands ? (
                <button onClick={() => toggleExpands()}>
                  <i className={classes.ExpandIcon + " fas fa-expand"} />
                </button>
              ) : (
                <button onClick={() => toggleExpands()}>
                  <i className={classes.ExpandIcon + " fas fas fa-compress"} />
                </button>
              )}
            </div>

            <Scrollbars
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}
              autoHeight
              autoHeightMax={expands ? 660 : 580}
            >
              <div className={classes.RssReaderView}>{currentFeed}</div>
            </Scrollbars>
            <div className={classes.RssReaderListWrapBottom} />
          </div>
        ) : (
          userFeeds.length !== 0 &&
          activeTitle === "" && (
            <p className={classes.ListEmpty}>
              {"<"} Feed not selected. Select one of the RSS feeds and click on
              its name
            </p>
          )
        )}

        {userFeeds.length === 0 && (
          <p className={classes.ListEmpty}>
            You don't have RSS feeds! Add the first link by clicking on the
            button - Add Feed
          </p>
        )}
        {feeds.length === 0 && activeTitle !== "" && <Spinner />}
      </div>
    );
  }
}

export default RssView;
