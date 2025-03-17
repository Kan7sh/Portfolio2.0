import { useState, useEffect } from "react";
import "./App.css";
import ToggleButton from "./components/ToggleButton";
import QRComponent from "./components/QRComponent";
import Home from "./components/home";
import Contact from "./components/contacts";

export default function PhotoFrameNavigation() {
  const [activeSection, setActiveSection] = useState("Home");
  const [isFrameVisible, setIsFrameVisible] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [previousSection, setPreviousSection] = useState(null);

  useEffect(() => {
    const cursor = document.querySelector(".custom-cursor");

    // Move the cursor with the mouse
    const handleMouseMove = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    // Enlarge the cursor when hovering over interactive elements
    const handleMouseEnter = () => {
      console.log("Mouse Enter");
      cursor.classList.add("enlarge");
    };

    const handleMouseLeave = () => {
      cursor.classList.remove("enlarge");
    };

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove);

    const interactiveElements = document.querySelectorAll(
      "button, a, .frame-nav-item, .input-field, .submit-btn, .toggle-container"
    );
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    // Cleanup event listeners
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);
  

  const qrColor = isFrameVisible ? "#000000" : "#ffffff";
  const email = "kchhabra499@gmail.com";
  // Map sections to colors

  
  // Section content for each window
  const sectionContents = {
    Home: <Home/>,
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
    Contact:<Contact/>
  };

  const changeSection = (newSection) => {
    if (activeSection !== newSection && !transitioning) {
      setTransitioning(true);
      setPreviousSection(activeSection);
      
      // After animation delay, change the actual section
      setTimeout(() => {
        setActiveSection(newSection);
        setTimeout(() => {
          setIsFrameVisible(prev => !prev);
          setTransitioning(false);
          setPreviousSection(null);
        }, 500);
      }, 500);
    }
  };

  const toggleFrame = () => {
    setTimeout(() => {
      setIsFrameVisible(prev => !prev);
    }, 300); // Delay of 500ms
  };

  const leftNavItems = ["Home", "About", "Projects", "Contact"];
  const rightNavItems = ["Twitter", "LinkedIn", "GitHub", "Email"];

  return (
    <div className="window-container">
      {/* Toggle Frame Button - Always visible */}
      <div className="custom-cursor"></div>

      <ToggleButton isToggled={isFrameVisible} onToggle={toggleFrame} />
      <QRComponent email={email} color={qrColor} />
      {/* Main Content with Photo Frame */}
      <div className={`content-with-frame ${isFrameVisible ? 'frame-visible' : ''}`}>
        {/* The Photo Frame */}
        <div className="photo-frame">
          {/* Left Navigation in Frame */}
          <div className="frame-nav left-frame">
            {leftNavItems.map((item, index) => (
              <div
                key={index}
                className={`frame-nav-item ${activeSection === item ? "active" : ""}`}
                onClick={() => changeSection(item)}
              >
                {item}
              </div>
            ))}
          </div>
          
          {/* Right Navigation in Frame */}
          <div className="frame-nav right-frame">
            {rightNavItems.map((item, index) => (
              <div
                key={index}
                className="frame-nav-item"
                onClick={() => console.log(`${item} clicked`)}
              >
                {item}
              </div>
            ))}
          </div>
          
          {/* Top Frame */}
          <div className="frame-border top-frame">
            <span className="frame-title">{activeSection}</span>
          </div>
          
          {/* Bottom Frame */}
          <div className="frame-border bottom-frame">
            <span className="frame-info">© 2025 My Portfolio</span>
          </div>
        </div>
        
        {/* Main Window Content (inside the frame) */}
        <div 
          className="main-window"
        >
          {/* Previous Window Content (for exit animation) */}
          {transitioning && previousSection && (
            <div className="window-content exit-up">
              {sectionContents[previousSection]}
            </div>
          )}
          
          {/* New Window Content (for enter animation) */}
          {transitioning && (
            <div className="window-content enter-from-bottom">
              {sectionContents[activeSection]}
            </div>
          )}
          
          {/* Active Window Content */}
          {!transitioning && (
            <div className="window-content">
              {sectionContents[activeSection]}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}