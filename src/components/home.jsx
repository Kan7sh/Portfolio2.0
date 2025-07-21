import React, { useState, useEffect } from "react";
import "./css/home.css";
import logoWhite from "../assets/logo_white.png";
import { GrBottomCorner, GrTopCorner } from "react-icons/gr";
import { QRCodeSVG } from "qrcode.react";

const Home = ({ onAboutMeClick, isPaused }) => {
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

  const word = "Kanish Chhabra";

  const [letterFonts, setLetterFonts] = useState(
    Array(word.length).fill(fonts[0])
  );

  const getRandomFont = () => {
    return fonts[Math.floor(Math.random() * fonts.length)];
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * word.length);
      const newFonts = [...letterFonts];
      newFonts[randomIndex] = getRandomFont();
      setLetterFonts(newFonts);
    }, 1000);

    return () => clearInterval(interval);
  }, [letterFonts, isPaused]);

  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [buttonText, setButtonText] = useState("ABOUT ME");

  const handleButtonHover = () => {
    if (isPaused) return;
    setButtonText("ABOUT ME ?");
  };

  const handleButtonLeave = () => {
    if (isPaused) return;
    setButtonText("ABOUT ME");
  };

  const handleButtonClick = () => {
    if (onAboutMeClick) {
      onAboutMeClick();
    }
  };

  const handleMouseMove = (e) => {
    if (isPaused) return;

    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const x = (clientY / innerHeight - 0.5) * 20;
    const y = (clientX / innerWidth - 0.5) * 20;

    setRotation({ x, y });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const textLines = [
    "Please wait...",
    "Crafting Experiences",
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
    "Mxake it aesthetic",
    "Dialing into the matrix...",
    "Optimizing...",
  ];

  const [visibleLines, setVisibleLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (isPaused) return;

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
  }, [currentLineIndex, displayText, isTyping, textLines, isPaused]);

  return (
    <div className="home-content">
      <div
        className="qr-code-container"
        style={{ position: "fixed", top: "25px", left: "25px", zIndex: 1000 }}
      >
        <QRCodeSVG
          value={`mailto:kanishchhabra.info@gmail.com`}
          size={70}
          fgColor="#ffffff"
          bgColor="transparent"
        />
      </div>
      <div className="center-content">
        <div className="name-text">
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
        </div>

        <div
          className="three-d-text"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          }}
        >
          Code Alchemist
        </div>
        <div className="vertical-lines">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="vertical-line">
              <div className={`pulse ${isPaused ? "paused" : ""}`}></div>
            </div>
          ))}
        </div>
        <div className="about-me">
          As a software developer, I thrive on solving complex problems,
          crafting seamless user experiences, and transforming ideas into
          reality through clean, efficient code. Every line I write is a fusion
          of logic, design, and boundless creativity.
        </div>

        <button
          className={`boxy-button ${isPaused ? "paused" : ""}`}
          onMouseEnter={handleButtonHover}
          onMouseLeave={handleButtonLeave}
          onClick={handleButtonClick}
        >
          <GrTopCorner className="arrow-icon top-left" />
          <GrBottomCorner className="arrow-icon bottom-right" />
          {buttonText}
        </button>
      </div>

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
