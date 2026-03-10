import React from "react";

const Home = () => {
  return (
    <main className="home">
      <div className="left">
        <textarea
          name="jobDescription"
          id="jobDescription"
          placeholder="Enter job description"
        ></textarea>
      </div>
      <div className="right">
        <div className="input-group">
          <label htmlFor="resume">Upload Resume</label>
          <input type="file" id="resume" name="resume" accept=".pdf" />
        </div>
        <div className="input-group">
          <label htmlFor="selfDescription">Self Description</label>
          <textarea
            name="selfDescription"
            id="selfDescription"
            placeholder="Describe yourself in a few sentences"
          ></textarea>
        </div>
      </div>
    </main>
  );
};

export default Home;
