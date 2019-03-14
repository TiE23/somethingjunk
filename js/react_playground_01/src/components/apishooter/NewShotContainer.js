import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import Api from "../../Api";

import NewShotForm from "./NewShotForm";
import NewShotIndicator from "./NewShotIndicator";

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

  handleFireShot = (e) => {
    e.preventDefault();

    this.props.addShot(this.state.payload);

    this.setState({
      choice: "",
      payload: null,
    });
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
        {this.state.payload &&
          <div className="group">
            <NewShotIndicator
              rows={this.state.payload.length}
              fireShot={this.handleFireShot}
            />
          </div>
        }
      </div>
    );
  }
}

NewShotContainer.propTypes = {
  addShot: PropTypes.func.isRequired,
};

export default NewShotContainer;
