import { useState } from "react";
import "./App.css";

export default function ResizableWindow() {
  const [isShrunk, setIsShrunk] = useState(false);

  const toggleSize = () => {
    setIsShrunk((prev) => !prev);
  };

  const leftNavItems = ["Home", "About", "Projects", "Contact"];
  
  // Right social links
  const rightNavItems = ["Twitter", "LinkedIn", "GitHub", "Email"];

  return (
    <div className="parent-window">
      {/* Child Window */}
      <div className={`child-window ${isShrunk ? "shrink" : ""}`}>
        <button onClick={toggleSize} className="toggle-button">
          {isShrunk ? "Expand Window" : "Shrink Window"}
        </button>
      </div>

      {/* Left Buttons - Always render them but position based on state */}
      <div className={`button-group left-group`}>
        {Array.from({ length: 4 }).map((_, index) => (
          <button
            key={index}
            className="side-button left"
            onClick={() => console.log(`Left Button ${index + 1} clicked`)}
          >
            Left {index + 1}
          </button>
        ))}
      </div>

      {/* Right Buttons - Always render them but position based on state */}
      <div className={`button-group right-group`}>
        {Array.from({ length: 4 }).map((_, index) => (
          <button
            key={index}
            className="side-button right"
            onClick={() => console.log(`Right Button ${index + 1} clicked`)}
          >
            Right {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}