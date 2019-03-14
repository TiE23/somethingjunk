import React from "react";
import PropTypes from "prop-types";

const NewShotForm = (props) => {
  return (
    <div className="NewShotForm">
      <p>NewShotForm</p>
      <form>
        <label>
          Resource:
          <select value={props.choice} onChange={props.handleSelectChange}>
            <option value="">&nbsp;</option>
            <option value="posts">Posts</option>
            <option value="comments">Comments</option>
            <option value="albums">Albums</option>
            <option value="photos">Photos</option>
            <option value="todos">ToDos</option>
            <option value="users">Users</option>
            <option value="error">Error</option>
          </select>
        </label>

        <br />

        {props.error ?
          <>
            <p>We got an error! Please refresh the page!</p>
            <p>{props.error}</p>
          </>
          :
          <input
            type="submit"
            value={props.loading ? "Loading..." : "Submit"}
            onClick={props.handleSubmit}
            disabled={!props.choice || props.loading}
          />
        }
      </form>
    </div>
  );
};

NewShotForm.propTypes = {
  choice: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  handleSelectChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

NewShotForm.defaultProps = {
  error: "",
};

export default NewShotForm;
