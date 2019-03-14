import React from "react";
import PropTypes from "prop-types";

const NewShotIndicator = (props) => {
  return (
    <div>
      <p>{props.rows} shots loaded!</p>
      <form>
        <input type="submit" value="Fire!" onClick={props.fireShot}/>
      </form>
    </div>
  );
};

NewShotIndicator.propTypes = {
  rows: PropTypes.number.isRequired,
  fireShot: PropTypes.func.isRequired,
};

export default NewShotIndicator;
