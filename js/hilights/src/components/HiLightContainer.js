import React, { PureComponent } from "react";

import textData from "../textData";

import HiLightDemoSelector from "./HiLightDemoSelector";
import HiLightDisplay from "./HiLightDisplay";

class HiLightContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      textIndex: 0,
    };
  }

  handleTextIndexChange = (newIndex) => {
    this.setState({ textIndex: newIndex});
  };

  render() {
    return (
      <div>
        <HiLightDemoSelector
          choiceCount={textData.length}
          selectedIndex={this.state.textIndex}
          changeIndex={this.handleTextIndexChange}
        />
        <HiLightDisplay
          textData={textData[this.state.textIndex]}
        />
      </div>
    );
  }
}

export default HiLightContainer;
