import { useState, useEffect } from "react";
import "./App.css";
import PhotoFrameNavigation from './resizewindow';

export default function ResizableWindow() {
  const [isShrunk, setIsShrunk] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [previousSection, setPreviousSection] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState("up");
  
  // Map sections to colors
  const sectionColors = {
    Home: "blue",
    About: "purple",
    Projects: "teal",
    Contact: "crimson"
  };
  
  // Section content for each window
  const sectionContents = {
    Home: (
      <div className="section-content">
        <h2>Welcome Home</h2>
        <p>This is your homepage where everything begins.</p>
        <div className="home-features">
          <div className="feature">Feature 1</div>
          <div className="feature">Feature 2</div>
          <div className="feature">Feature 3</div>
        </div>
      </div>
    ),
    About: (
      <div className="section-content">
        <h2>About Me</h2>
        <p>Learn more about who I am and what I do.</p>
        <div className="about-info">
          <div className="info-box">Experience</div>
          <div className="info-box">Skills</div>
          <div className="info-box">Education</div>
        </div>
      </div>
    ),
    Projects: (
      <div className="section-content">
        <h2>My Projects</h2>
        <p>Check out some of my recent work.</p>
        <div className="project-grid">
          <div className="project">Project 1</div>
          <div className="project">Project 2</div>
          <div className="project">Project 3</div>
          <div className="project">Project 4</div>
        </div>
      </div>
    ),
    Contact: (
      <div className="section-content">
        <h2>Contact Me</h2>
        <p>Get in touch with me using any of these methods.</p>
        <div className="contact-form">
          <input type="text" placeholder="Your Name" className="input-field" />
          <input type="email" placeholder="Your Email" className="input-field" />
          <textarea placeholder="Your Message" className="input-field textarea"></textarea>
          <button className="submit-btn">Send Message</button>
        </div>
      </div>
    )
  };

  const changeSection = (newSection) => {
    if (activeSection !== newSection && !transitioning) {
      setTransitioning(true);
      setPreviousSection(activeSection);
      
      // After animation delay, change the actual section
      setTimeout(() => {
        setActiveSection(newSection);
        // Reset transitioning state after new content appears
        setTimeout(() => {
          setTransitioning(false);
          setPreviousSection(null);
        }, 500);
      }, 500);
    }
  };

  const toggleSize = () => {
    setIsShrunk(prev => !prev);
  };

  const leftNavItems = ["Home", "About", "Projects", "Contact"];
  const rightNavItems = ["Twitter", "LinkedIn", "GitHub", "Email"];

  return (
    <div className="App">
    <PhotoFrameNavigation />
  </div>
  );
}