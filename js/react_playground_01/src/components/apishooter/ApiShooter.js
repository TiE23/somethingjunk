import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import NewShotContainer from "./NewShotContainer";

class ApiShooter extends PureComponent {
  state = {
    shots: [],
  };

  addShot = (name, payload) => {
    this.setState(prevState => ({
      shots: prevState.shots.push({ name, payload }),
    }));

    console.log({ name, payload });
  };

  render() {
    return (
      <div>
        <h1>Fun API Shooter</h1>
        <NewShotContainer
          addShot={this.addShot}
        />
      </div>
    );
  }
}

ApiShooter.propTypes = {};

export default ApiShooter;
