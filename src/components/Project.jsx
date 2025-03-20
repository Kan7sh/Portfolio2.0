// components/Projects.js
import React from "react";
import "./css/project.css";

const Projects = () => {
  return (
    <div className="projects-section">
      <h2>My Projects</h2>
      <p>Here are some of the projects I've worked on:</p>
      <div className="project-grid">
        <div className="project">
          <h3>Project 1</h3>
          <p>
            A brief description of Project 1. What it does, technologies used,
            and your role in the project.
          </p>
          <a href="[Project Link]" target="_blank" rel="noopener noreferrer">
            View Project
          </a>
        </div>
        <div className="project">
          <h3>Project 2</h3>
          <p>
            A brief description of Project 2. What it does, technologies used,
            and your role in the project.
          </p>
          <a href="[Project Link]" target="_blank" rel="noopener noreferrer">
            View Project
          </a>
        </div>
        <div className="project">
          <h3>Project 3</h3>
          <p>
            A brief description of Project 3. What it does, technologies used,
            and your role in the project.
          </p>
          <a href="[Project Link]" target="_blank" rel="noopener noreferrer">
            View Project
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects;