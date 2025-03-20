import React, { useState, useEffect } from "react";
import "./css/project.css";

const Projects = () => {
  const [expandedBox, setExpandedBox] = useState(0); // 0 for first box, 1 for second, 2 for third
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

  // Random font generator for the title
  const [randomFont, setRandomFont] = useState(fonts[0]);

  const getRandomFont = () => {
    return fonts[Math.floor(Math.random() * fonts.length)];
  };

  useEffect(() => {
    // Only run this effect if animations are not paused
    
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * word.length);
      const newFonts = [...letterFonts];
      newFonts[randomIndex] = getRandomFont();
      setLetterFonts(newFonts);
    }, 1000);

    return () => clearInterval(interval);
  }, [letterFonts]); 

  return (
    <div className="projects-section">
      {/* Random font-changing title */}
      <h2 style={{ fontFamily: randomFont, position: "absolute", top: "20px", left: "20px" }}>
      <div>
          {word.split("").map((letter, index) => (
            <span
              key={index}
              className="letter"
              style={{
                fontFamily: letterFonts[index],
                margin: "0 4px",
                transition: "font-family 0.3s ease-in-out",
              }}
            >
              {letter}
            </span>
          ))}
        </div>      </h2>

      {/* Three boxes */}
      <div className="project-box-container">
        <div
          className={`project-box ${expandedBox === 0 ? "expanded" : ""}`}
          style={{ backgroundColor: "#808080" }} // Grey background
          onMouseEnter={() => setExpandedBox(0)}
        >
          Box 1
        </div>
        <div
          className={`project-box ${expandedBox === 1 ? "expanded" : ""}`}
          style={{ backgroundColor: "#FF0000" }} // Red background
          onMouseEnter={() => setExpandedBox(1)}
        >
          Box 2
        </div>
        <div
          className={`project-box ${expandedBox === 2 ? "expanded" : ""}`}
          style={{ backgroundColor: "#FFFF00" }} // Yellow background
          onMouseEnter={() => setExpandedBox(2)}
        >
          Box 3
        </div>
      </div>
    </div>
  );
};

export default Projects;