import React from "react";
import GitCheckerTitle from "./GitCheckerTitle";
import "../styles/GitChecker.css"
import GitCheckerContainer from "./GitCheckerContainer";

const GitChecker = () => {
  return (
    <section className="section">
      <GitCheckerTitle />
      <div className="row">
        <GitCheckerContainer />
      </div>
    </section>
  );
};

export default GitChecker;
