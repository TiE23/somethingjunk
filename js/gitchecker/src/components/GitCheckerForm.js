import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import GitCheckerInput from "./GitCheckerInput";

const MIN_COUNT = 2;
const MAX_COUNT = 10;

class GitCheckerForm extends Component {
  state = {
    userNames: ["tie23", "amnevins"],
    loading: false,
  };

  handleUpdateName = (index, value) => {
    if (index >= 0 && index < this.state.userNames.length) {
      this.setState(({ userNames }) => {
        userNames[index] = value.trim();
        return { userNames };
      });
    }
  };

  incrementUserCount = () => {
    if (this.state.userNames.length <= MAX_COUNT) {
      this.setState((prevState) => ({ userNames: [...prevState.userNames, ""] }));
    }
  };

  decrementUserCount = () => {
    if (this.state.userNames.length > MIN_COUNT) {
      this.setState((prevState) => ({ userNames: prevState.userNames.slice(0, -1) }));
    }
  };

  render() {
    return (
      <Fragment>
        {this.state.userNames.map((name, index) =>
          <GitCheckerInput
            key={`input_${index}`}
            id={index + 1}
            value={name}
            onChange={(e) => this.handleUpdateName(index, e.target.value)}
          />
        )}

        <br />

        <button
          className="btn red"
          onClick={this.decrementUserCount}
          disabled={this.state.userNames.length <= MIN_COUNT}
        >
          ---
        </button>

        <button
          className="btn green"
          onClick={this.incrementUserCount}
          disabled={this.state.userNames.length >= MAX_COUNT}
        >
          +++
        </button>

        <br />

        <button
          className="btn wide"
          onClick={() => this.props.handleQuery(this.state.userNames)}
          disabled={!this.state.userNames.every(userName => !!userName)}
        >
          Do it!
        </button>
      </Fragment>
    );
  }
}

GitCheckerForm.propTypes = {
  handleQuery: PropTypes.func.isRequired,
};

export default GitCheckerForm;
