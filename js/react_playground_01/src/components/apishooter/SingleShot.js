import React from "react";
import PropTypes from "prop-types";

const SingleShot = (props) => {
  const displayData = [];
  const { name, payload } = props;

  if (name === "posts") {
    displayData.push(...payload.map(post => ({
      key: post.id,
      header: `ID: ${post.id}`,
      subHeader: `Title: ${post.title}`,
      body: `"${post.body}"`,
    })));
  } else if (name === "comments") {
    displayData.push(...payload.map(comment => ({
      key: comment.id,
      header: `ID: ${comment.id}`,
      subHeader: `Author: ${comment.email}`,
      body: `"${comment.body}"`,
    })));
  } else if (name === "albums") {
    displayData.push(...payload.map(album => ({
      key: album.id,
      header: `ID: ${album.id}`,
      // No subHeader
      body: `Title: ${album.title}`,
    })));
  } else if (name === "photos") {
    displayData.push(...payload.map(photo => ({
      key: photo.id,
      header: `ID: ${photo.id}`,
      subHeader: `Title: ${photo.title}`,
      body: (<a href={photo.url}>{photo.url}</a>),
    })));
  } else if (name === "todos") {
    displayData.push(...payload.map(todo => ({
      key: todo.id,
      header: `ID: ${todo.id}`,
      subHeader: `Title: ${todo.title}`,
      body: todo.completed ? "✅" : "🚫",
    })));
  } else if (name === "users") {
    displayData.push(...payload.map(user => ({
      key: user.id,
      header: `ID: ${user.id}`,
      subHeader: `Email: ${user.email}`,
      body: `Username: ${user.username}`,
    })));
  }



  return (
    <div className="SingleShot">
      <h2>SingleShot {props.name}</h2>
      <ul>
        {displayData.slice(0, props.length).map(data => (
          <li key={data.key}>
            <h3>{data.header}</h3>
            <ul>
              {data.subHeader &&
                <li><h4>{data.subHeader}</h4></li>
              }
              {data.body &&
                <li>{data.body}</li>
              }
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

SingleShot.propTypes = {
  name: PropTypes.string.isRequired,
  payload: PropTypes.arrayOf(PropTypes.object).isRequired,
  length: PropTypes.number,
};

SingleShot.defaultProps = {
  length: 5,
};

export default SingleShot;
