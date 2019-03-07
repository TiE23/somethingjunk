import React, {PureComponent} from "react";

class CounterButton extends PureComponent {
  constructor() {
    super();

    this.state = {
      clicks: 0,
    };
  }

  click = () => {
    this.setState(({ clicks }) => (
      {
        clicks: clicks + 1,
      }
    ));
  };

  render() {
    return (
      <div>
        CounterButton
        <br />
        <button
          className="button"
          onClick={this.click}
        >
          <span>Click!</span>
        </button>
        <p>Clicks: {this.state.clicks}</p>
      </div>
    );
  }
}

export default CounterButton;
