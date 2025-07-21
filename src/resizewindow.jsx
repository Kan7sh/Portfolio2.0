import { useState, useEffect } from "react";
import "./App.css";
import ToggleButton from "./components/ToggleButton";
import Home from "./components/home";
import About from "./components/About";
import Projects from "./components/Project";
import logoWhite from "./assets/logo_white.png";
import logoBlack from "./assets/logo_black.png";
export default function PhotoFrameNavigation() {
  const [activeSection, setActiveSection] = useState("Home");
  const [isFrameVisible, setIsFrameVisible] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [previousSection, setPreviousSection] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const cursor = document.querySelector(".custom-cursor");

    const handleMouseMove = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const handleMouseEnter = () => {
      cursor.classList.add("enlarge");
    };

    const handleMouseLeave = () => {
      cursor.classList.remove("enlarge");
    };

    document.addEventListener("mousemove", handleMouseMove);

    const interactiveElements = document.querySelectorAll(
      " a, .frame-nav-item, .submit-btn, .toggle-container, .about-button"
    );
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  const qrColor = isFrameVisible ? "#000000" : "#ffffff";

  const handleAboutMeClick = () => {
    if (!isFrameVisible) {
      setIsFrameVisible(true);
      setIsPaused(true);
    }

    setTimeout(() => {
      changeSection("About");
    }, 600);
  };

  const sectionContents = {
    Home: <Home onAboutMeClick={handleAboutMeClick} isPaused={isPaused} />,
    About: <About isPaused={isPaused} />,
    Projects: <Projects isPaused={isPaused} />,
  };

  useEffect(() => {
    if (isPaused) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [isPaused]);

  const changeSection = (newSection) => {
    if (activeSection !== newSection && !transitioning) {
      setTransitioning(true);
      setPreviousSection(activeSection);

      setActiveSection(newSection);

      setTimeout(() => {
        setTransitioning(false);
        setPreviousSection(null);
        setIsFrameVisible((prev) => !prev);
        setIsPaused((prev) => !prev);
      }, 700);
    }
  };

  const toggleFrame = () => {
    setTimeout(() => {
      setIsFrameVisible((prev) => !prev);
      setIsPaused((prev) => !prev);
    }, 300);
  };

  const leftNavItems = ["Home", "About", "Projects"];
  const rightNavItems = ["LinkedIn", "GitHub", "Twitter"];

  return (
    <div className={`window-container ${isPaused ? "paused" : ""}`}>
      <div className="custom-cursor"></div>
      <div className="logo-container">
        <img
          src={isFrameVisible ? logoBlack : logoWhite}
          alt="Logo"
          className="logo"
        />
      </div>
      <ToggleButton isToggled={isFrameVisible} onToggle={toggleFrame} />
      <div
        className={`content-with-frame ${
          isFrameVisible ? "frame-visible" : ""
        }`}
      >
        <div className="photo-frame">
          <div className="frame-nav left-frame">
            {leftNavItems.map((item, index) => (
              <div
                key={index}
                className={`frame-nav-item ${
                  activeSection === item ? "active" : ""
                }`}
                onClick={() => changeSection(item)}
              >
                {item.toUpperCase()}
              </div>
            ))}
          </div>

          <div className="frame-nav right-frame">
            {rightNavItems.map((item, index) => (
              <a
                key={index}
                className="frame-nav-item"
                href={
                  item === "LinkedIn"
                    ? "https://www.linkedin.com/in/kanish-chhabra/"
                    : item === "GitHub"
                    ? "https://github.com/Kan7sh"
                    : "https://x.com/KanishChhabra"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.toUpperCase()}
              </a>
            ))}
          </div>

          <div className="frame-border top-frame"></div>

          <div className="frame-border bottom-frame">
            <span className="frame-info">
              Code so clean, even my mom would be proud
            </span>
          </div>
        </div>

        <div className="main-window">
          <div className="content-container">
            {transitioning && previousSection && (
              <div className="window-content exit-up">
                {sectionContents[previousSection]}
              </div>
            )}

            {transitioning ? (
              <div className="window-content enter-from-bottom">
                {sectionContents[activeSection]}
              </div>
            ) : (
              <div className="window-content">
                {sectionContents[activeSection]}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
