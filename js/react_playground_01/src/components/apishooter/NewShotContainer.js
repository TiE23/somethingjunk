import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import Api from "../../Api";

import NewShotForm from "./NewShotForm";

/**
 * This container component should hold the API calling logic
 */
class NewShotContainer extends PureComponent {
  state = {
    choice: "",
    loading: false,
    error: null,
    payload: null,
  };

  handleSelectChange = (e) => {
    this.setState({ choice: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.choice) {
      this.setState({ loading: true });

      Api.basicGet((payload, error) => {
        if (error) {
          this.setState({
            error: error.toString(),
            loading: false,
          });
        } else {

          // TODO - Remove this
          console.log("Got it!", payload);

          this.setState({
            payload,
            loading: false,
          });
        }
      }, this.state.choice);
    } else {
      this.setState({ error: "No resource selected!" });
    }
  };


  render() {
    return (
      <div>
        <p>NewShotContainer</p>
        <div className="group">
          <NewShotForm
            choice={this.state.choice}
            loading={this.state.loading}
            error={this.state.error}
            handleSelectChange={this.handleSelectChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

NewShotContainer.propTypes = {};

export default NewShotContainer;
