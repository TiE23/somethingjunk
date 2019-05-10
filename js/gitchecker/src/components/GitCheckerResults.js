import React, { Fragment } from "react";
import PropTypes from "prop-types";

const GitCheckerResults = (props) => {
  const sortedUsers = props.userData.map((user, index) => ({
    startingPosition: index + 1,
    ...user,
  })).sort((a, b) => b.followers - a.followers);

  return (
    <Fragment>
      <h3>
        Final Results
      </h3>
      <ol className="results">
        {sortedUsers.map((user, index) => (
          <li key={`${index}_${user.login}`}>
            {user.name} ({user.login}) with {user.followers} followers
          </li>
        ))}
      </ol>
    </Fragment>
  );
};

GitCheckerResults.propTypes = {
  userData: PropTypes.arrayOf(PropTypes.shape({
    login: PropTypes.string.isRequired,
    followers: PropTypes.number.isRequired,
    name: PropTypes.string,
  })).isRequired,
};

export default GitCheckerResults;
