import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import NewShotContainer from "./NewShotContainer";

class ApiShooter extends PureComponent {
  state = {
    shots: [],
  };

  render() {
    return (
      <div>
        <h1>Fun API Shooter</h1>
        <NewShotContainer />
      </div>
    );
  }
}

ApiShooter.propTypes = {};

export default ApiShooter;
