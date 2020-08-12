import React, { Component } from "react";

import classes from "./RssEdit.module.css";

class RssEdit extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.inputRef.current.focus();
    }, 300);
  }

  render() {
    const {
      editFeed,
      title,
      link,
      updateField,
      toggleModal,
      isInvalid,
    } = this.props;

    return (
      <div className={classes.RssEdit}>
        <h4 className="text-center">
          Edit Feed - {title.substr(0, 15) + (title.length > 15 ? "..." : "")}
        </h4>

        <form onSubmit={editFeed}>
          <input
            className="form-control"
            value={link}
            onChange={(event) =>
              updateField("link", event.target.value.replace(/\s/g, ""))
            }
            type="text"
            placeholder="Add Link"
            ref={(this.inputRef = React.createRef())}
          />

          <input
            className="form-control"
            value={title}
            onChange={(event) => updateField("title", event.target.value)}
            type="text"
            placeholder="Add Title"
          />

          <hr />

          <div className="text-center">
            <button
              className={classes.SaveBtn + " btn btn-success"}
              disabled={isInvalid}
              type="submit"
            >
              Save Feed
            </button>
            <span
              className={classes.SaveBtn + " btn btn-info"}
              onClick={toggleModal}
            >
              Cancel
            </span>
          </div>
        </form>
      </div>
    );
  }
}

export default RssEdit;
