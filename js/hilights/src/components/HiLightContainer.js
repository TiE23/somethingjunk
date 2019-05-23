import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import textData from "../textData";

import HiLightDemoSelector from "./HiLightDemoSelector";

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

      </div>
    );
  }
}

HiLightContainer.propTypes = {};

export default HiLightContainer;
