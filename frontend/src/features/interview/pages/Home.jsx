import React from "react";
import "../home.scss";

const Home = () => {
  return (
    <main className="home">
      <div className="interview-input-group">
        <div className="left">
          <label htmlFor="jobDescription">Job Description</label>
          <textarea
            name="jobDescription"
            id="jobDescription"
            placeholder="Enter job description"
          ></textarea>
        </div>
        <div className="right">
          <div className="input-group">
            <p>
              Resume{" "}
              <small className="highlight">
                (Use Resume and self description together for best results)
              </small>
            </p>
            <label htmlFor="resume" id="file-label">
              Upload Resume
            </label>
            <input type="file" hidden id="resume" name="resume" accept=".pdf" />
          </div>
          <div className="input-group">
            <label htmlFor="selfDescription">Self Description</label>
            <textarea
              name="selfDescription"
              id="selfDescription"
              placeholder="Describe yourself in a few sentences"
            ></textarea>
            <button className="button primary-button">
              Generate Interview Report
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
