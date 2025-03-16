import React, { useState, useEffect } from "react";
import "./css/home.css";

const Home = () => {
  const fonts = [
    "'IBM Plex Mono', system-ui",
    "'Barriecito', cursive",
    "'Diplomata', cursive",
    "'Fascinate Inline', cursive",
    "'Knewave', cursive",
    "'Micro 5', cursive",
    "'Monoton', cursive",
    "'Offside', cursive",
    "'Pattaya', sans-serif",
    "'Permanent Marker', cursive",
    "'Press Start 2P', cursive",
    "'Protest Guerrilla', cursive",
    "'Rubik 80s Fade', cursive",
  ];

  const word = "CREATIVE";

  const [letterFonts, setLetterFonts] = useState(
    Array(word.length).fill(fonts[0])
  );

  const getRandomFont = () => {
    return fonts[Math.floor(Math.random() * fonts.length)];
  };

  // Function to update a random letter's font every second
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * word.length); // Pick a random letter index
      const newFonts = [...letterFonts];
      newFonts[randomIndex] = getRandomFont(); // Set a new random font for the selected letter
      setLetterFonts(newFonts); // Update the state
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [letterFonts]);

  // State for 3D text rotation
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // Function to handle mouse movement and update rotation
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Calculate rotation based on cursor position
    const x = (clientY / innerHeight - 0.5) * 40; // Tilt vertically
    const y = (clientX / innerWidth + 0.5) * 40; // Tilt horizontally

    setRotation({ x, y });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const textLines = [
    "Please wait",
    "Crafting Experiences...",
    "debugging...",
    "Lots of bugs",
    "Loading...",
    "Go Grab a Coffee",
    "Making something to attract you",
    "Running...",
    "This UI took a lot of time",
    "Still working on it",
    "Almost there...",
    "Stay calm and wait",
    "whats the rush?",
    "Building...",
    "Testing your Patience",
    "Decrypting possibilities...",
    "Hacking time and space",
    "Deploying...",
    "Warming up the time machine",
    "Waiting... but make it aesthetic",
    "Dialing into the matrix...",
    "Optimizing...",
  ];

  const [visibleLines, setVisibleLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timer;
    if (isTyping) {
      timer = setTimeout(() => {
        setDisplayText((prev) =>
          textLines[currentLineIndex].slice(0, prev.length + 1)
        );
        if (displayText.length === textLines[currentLineIndex].length) {
          setIsTyping(false);
          setTimeout(() => {
            setVisibleLines((prev) => {
              const newLines = [...prev, textLines[currentLineIndex]];
              if (newLines.length > 4) {
                newLines.shift();
              }
              return newLines;
            });
            setCurrentLineIndex((prev) => (prev + 1) % textLines.length);
            setDisplayText("");
            setIsTyping(true);
          }, 2000);
        }
      }, 100);
    }
    return () => clearTimeout(timer);
  }, [currentLineIndex, displayText, isTyping, textLines]);

  return (
    <div className="home-content">
      {/* Vertical Lines */}
      <div className="vertical-lines">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="vertical-line">
            <div className="pulse"></div>
          </div>
        ))}
      </div>

      {/* 3D Text - Software Developer */}
      <div
        className="three-d-text"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        Software Developer
      </div>

      {/* "CREATIVE" word with random fonts */}
      <div>
        {word.split("").map((letter, index) => (
          <span
            key={index}
            className="letter"
            style={{
              fontFamily: letterFonts[index],
              margin: "0 5px",
              transition: "font-family 0.3s ease-in-out",
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Changing text lines with typewriter effect */}
      <div className="text-container">
        {visibleLines.map((line, index) => (
          <div key={index} className="text-line">
            {line}
          </div>
        ))}
        <div className="text-line typing">{displayText}</div>
      </div>
    </div>
  );
};

export default Home;