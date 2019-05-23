import React, { PureComponent } from "react";

import HighlightDemoSelector from "./HighlightDemoSelector";
import HighlightDemoDisplay from "./HighlightDemoDisplay";

import textData from "../utils/textData";

/**
 * Simple stateful component that just tracks which textData is selected.
 */
class HighlightDemoContainer extends PureComponent {
  state = {
    textIndex: 0,
  };

  handleTextIndexChange = (newIndex) => {
    this.setState({ textIndex: newIndex});
  };

  render() {
    return (
      <div>
        <HighlightDemoSelector
          choiceCount={textData.length}
          selectedIndex={this.state.textIndex}
          changeIndex={this.handleTextIndexChange}
        />
        <HighlightDemoDisplay
          textData={textData[this.state.textIndex]}
        />
      </div>
    );
  }
}

export default HighlightDemoContainer;
