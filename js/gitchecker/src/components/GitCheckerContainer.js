import React, { Component, Fragment } from "react";
import GitCheckerForm from "./GitCheckerForm";
import GitCheckerWinner from "./GitCheckerWinner";
import GitCheckerResults from "./GitCheckerResults";

class GitCheckerContainer extends Component {
  state = {
    userData: null,
    loading: false, // Sorry, I don't actually do anything with this yet.
  };

  // Woo, async function!
  queryUsers = async (userNames) => {
    // Only fire if every user is filled
    if (userNames.every(userName => userName.length > 0)) {
      this.setState({ loading: true });

      const results = await Promise.all(
        userNames.map(userName => this._userFetcher(userName))
      );

      this.setState({ loading: false, userData: results });

      console.log("Success!", results);
    } else {
      console.log("No, not everyone is set!");
    }
  };

  _userFetcher = (userName) => {
    const url = "https://api.github.com/users/" + userName;

    // No error handling, yo.
    return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(`Error occurred requesting ${url}`, error);
      return null;
    });
  };
  render() {
    return (
      <Fragment>
        <div className="centered">
          <GitCheckerForm handleQuery={this.queryUsers} />
        </div>
        {this.state.userData &&
          <Fragment>
            <GitCheckerWinner userData={this.state.userData} />
            <GitCheckerResults userData={this.state.userData} />
          </Fragment>
        }
      </Fragment>
    );
  }
}

export default GitCheckerContainer;
