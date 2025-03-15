import React, { useState, useEffect } from "react";
import "./css/home.css";

const Home = () => {
  const fonts = [
    "'Roboto', sans-serif",
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

  // State to store the font for each letter
  const [letterFonts, setLetterFonts] = useState(
    Array(word.length).fill(fonts[0]) // Initialize all letters with the first font
  );

  // Function to get a random font from the fonts array
  const getRandomFont = () => {
    return fonts[Math.floor(Math.random() * fonts.length)];
  };

  // Function to handle hover and update the font for a specific letter
  const handleHover = (index) => {
    const newFonts = [...letterFonts];
    newFonts[index] = getRandomFont(); // Set a new random font for the hovered letter
    setLetterFonts(newFonts); // Update the state
  };

  // Text lines for the bottom-left area
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

  // State to manage the visible lines
  const [visibleLines, setVisibleLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timer;
    if (isTyping) {
      // Typewriter effect: Add one character at a time
      timer = setTimeout(() => {
        setDisplayText((prev) =>
          textLines[currentLineIndex].slice(0, prev.length + 1)
        );
        if (displayText.length === textLines[currentLineIndex].length) {
          setIsTyping(false);
          setTimeout(() => {
            // Add the completed line to the visible lines
            setVisibleLines((prev) => {
              const newLines = [...prev, textLines[currentLineIndex]];
              if (newLines.length > 4) {
                newLines.shift(); // Remove the oldest line if more than 4 lines
              }
              return newLines;
            });
            // Move to the next line
            setCurrentLineIndex((prev) => (prev + 1) % textLines.length);
            setDisplayText("");
            setIsTyping(true);
          }, 2000); // Wait 2 seconds before switching to the next line
        }
      }, 100); // Typing speed (100ms per character)
    }
    return () => clearTimeout(timer);
  }, [currentLineIndex, displayText, isTyping, textLines]);

  return (
    <div className="home-content">
      {/* "CREATIVE" word with random fonts */}
      <div>
        {word.split("").map((letter, index) => (
          <span
            key={index}
            className="letter"
            style={{
              fontFamily: letterFonts[index], // Use the font from state
              margin: "0 10px", // Add space between letters
              transition: "font-family 0.3s ease-in-out", // Smooth font transition
            }}
            onMouseEnter={() => handleHover(index)} // Trigger font change on hover
          >
            {letter}
          </span>
        ))}
      </div>

      {/* New text with transparent glass effect */}

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