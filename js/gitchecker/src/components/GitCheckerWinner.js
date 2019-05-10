import React from "react";
import PropTypes from "prop-types";

const GitCheckerWinner = (props) => {
  const winner = {
    login: null,
    name: null,
    followers: -1,
  };

  props.userData.forEach((user) => {
    if (user.followers > winner.followers) {
      winner.login = user.login;
      winner.name = user.name;
      winner.followers = user.followers;
    }
  });

  return (
    <p>
      The winner is {winner.name} ({winner.login}) with {winner.followers} followers!
    </p>
  );
};

GitCheckerWinner.propTypes = {
  userData: PropTypes.arrayOf(PropTypes.shape({
    login: PropTypes.string.isRequired,
    followers: PropTypes.number.isRequired,
    name: PropTypes.string,
  })).isRequired,
};

export default GitCheckerWinner;
