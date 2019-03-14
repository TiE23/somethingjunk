import React, {PureComponent} from "react";

import NewShotContainer from "./NewShotContainer";
import ShotsList from "./ShotsList";

class ApiShooter extends PureComponent {
  state = {
    shots: [],
  };

  addShot = (name, payload) => {
    this.setState(prevState => ({
      shots: prevState.shots.concat({ name, payload }),
    }));
  };

  render() {
    return (
      <div>
        <h1>Fun API Shooter</h1>
        <NewShotContainer
          addShot={this.addShot}
        />
        {this.state.shots.length > 0 &&
          <ShotsList shots={this.state.shots} />
        }
      </div>
    );
  }
}


export default ApiShooter;
