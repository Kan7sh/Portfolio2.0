// components/About.js
import React from "react";
import "./css/about.css";

const About = () => {
  return (
    <div className="about-section">
      <h2>About Me</h2>
      <p>
        Hi, I'm [Your Name], a passionate [Your Profession] with a love for
        building creative and functional solutions. I specialize in [Your
        Skills/Expertise], and I enjoy turning ideas into reality through code.
      </p>
      <div className="about-details">
        <div className="detail">
          <h3>Experience</h3>
          <p>
            - [Job Title] at [Company Name] (Year - Present)
            <br />
            - [Job Title] at [Company Name] (Year - Year)
          </p>
        </div>
        <div className="detail">
          <h3>Skills</h3>
          <p>
            - [Skill 1]
            <br />
            - [Skill 2]
            <br />
            - [Skill 3]
          </p>
        </div>
        <div className="detail">
          <h3>Education</h3>
          <p>
            - [Degree] in [Field] from [University Name] (Year)
            <br />
            - [Certification] from [Institution Name] (Year)
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;