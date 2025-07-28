import React, { useState, useEffect, useRef } from "react";
import { LuExpand, LuArrowUpRight } from "react-icons/lu";
import "./css/project.css";
import redditCloneImage from "../assets/RedditClone.jpg";
import aiAlarmImage from "../assets/AIAlarm.jpg";
import imageGeniusImage from "../assets/ImageGenius.jpg";
import TPS from "../assets/TPS.png";

const Projects = ({ isPaused = false }) => {
  const [expandedBox, setExpandedBox] = useState(0);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [projectNames, setProjectNames] = useState([
    "The Podcast Space",
    "AI Alarm",
    "Image Genius",
  ]);
  const [currentProjectName, setCurrentProjectName] = useState("");
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const projectBoxRefs = useRef([]);
  const projectImageList = [TPS, aiAlarmImage, imageGeniusImage];
  const projectLinks = [
    "https://thepodcastspace.vercel.app/",
    "https://drive.google.com/file/d/1P44Njcd1oVqZPe7jpTaBGz8QCb2DGiN5/view",
    "https://drive.google.com/file/d/1OZ7MHhJvsjT9qePjXSrxFSEjkdg8CvBK/view",
  ];

  const projectDescriptions = [
    [
      "Built a real-time podcasting web app enabling users to create/join rooms and communicate over WebRTC and WebSocket, with local recordings for lossless audio quality",
      "Implemented OAuth-based authentication and enabled seamless room collaboration and playback",
      "Deployed the application on AWS EC2 using Docker for scalable, containerized infrastructure",
    ],
    [
      "User can Create a alarm with image of a specific object as input.",
      "Alarm will only goes off when user click same object's image making him to do physical activity.",
      "Basic alarm features - repeating days, changing ringtones.",
    ],
    [
      "Generates logo using AI from OpenAI's API DALL-E.",
      "Convert Images to PDF. Perform CRUD operations on them.",
      "Share Documents with others in common room using Firebase cloud storage.",
    ],
  ];

  const fonts = [
    "'IBM Plex Mono', system-ui",
    "'Barriecito', cursive",
    "'Diplomata', cursive",
    "'Fascinate Inline', cursive",
    "'Knewave', cursive",
    "'Monoton', cursive",
    "'Offside', cursive",
    "'Pattaya', sans-serif",
    "'Permanent Marker', cursive",
    "'Press Start 2P', cursive",
    "'Protest Guerrilla', cursive",
    "'Rubik 80s Fade', cursive",
  ];

  const word = "PROJECTS";
  const [letterFonts, setLetterFonts] = useState(
    Array(word.length).fill(fonts[0])
  );
  const [randomFont, setRandomFont] = useState(fonts[0]);

  const getRandomFont = () => {
    return fonts[Math.floor(Math.random() * fonts.length)];
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * word.length);
      const newFonts = [...letterFonts];
      newFonts[randomIndex] = getRandomFont();
      setLetterFonts(newFonts);
    }, 1000);

    return () => clearInterval(interval);
  }, [letterFonts]);

  const handleMouseEnter = (index) => {
    if (isPaused) return;
    const timeout = setTimeout(() => {
      setExpandedBox(index);
      setCurrentProjectName(projectNames[index]);
    }, 400);
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (isPaused) return;
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  const handleMouseMove = (e) => {
    if (isPaused) return;
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  const getImagePosition = (index) => {
    if (expandedBox === index && projectBoxRefs.current[index]) {
      const boxRect = projectBoxRefs.current[index].getBoundingClientRect();
      const offsetX =
        (cursorPosition.x - boxRect.left - boxRect.width / 2) / 30;
      const offsetY =
        (cursorPosition.y - boxRect.top - boxRect.height / 2) / 30;
      return { transform: `translate(${offsetX}px, ${offsetY}px)` };
    }
    return {};
  };

  return (
    <div className="projects-section" onMouseMove={handleMouseMove}>
      <div className="vertical-lines">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="vertical-line">
            <div className={`pulse`}></div>
          </div>
        ))}
      </div>
      <div className="section-title">PROJECTS</div>

      <div className="project-box-container">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            ref={(el) => (projectBoxRefs.current[index] = el)}
            className={`project-box ${expandedBox === index ? "expanded" : ""}`}
            style={{
              backgroundColor: ["#7b7b7bff", "#4b4b4bff", "#2a2a2aff"][index],
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {expandedBox === index ? (
              <div className="expanded-content">
                <div className="project-info">
                  <ul className="project-description">
                    {projectDescriptions[index].map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div className="project-image-container">
                  <img
                    src={projectImageList[index]}
                    alt="Project"
                    className="project-image"
                    style={getImagePosition(index)}
                  />
                  <a
                    href={projectLinks[index]}
                    className="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LuArrowUpRight className="project-link-icon" />
                  </a>
                </div>
              </div>
            ) : (
              <LuExpand className="react-icon" color="black" />
            )}
          </div>
        ))}
      </div>

      <div className="project-name-container">
        <div className="project-name-slider">
          {projectNames.map((name, index) => (
            <div
              key={index}
              className={`project-name ${
                expandedBox === index ? "active" : ""
              }`}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
