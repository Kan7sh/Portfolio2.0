import React from "react";
import { FaPowerOff } from "react-icons/fa";
import "./css/ToggleButton.css"; 

const ToggleButton = ({ isToggled, onToggle }) => {
  return (
    <div
      className={`toggle-container ${isToggled ? "toggled" : ""}`}
      onClick={onToggle}
    >
      <div className={`toggle-text ${isToggled ? "toggled" : ""}`}>
        <div className="toggle-text-inner">
          <span>{isToggled ? "FREEZE" : "ACTIVATE"}</span>
          <span>{isToggled ? "READY" : "TURN ON"}</span>
        </div>
      </div>
      <div className={`toggle-switch ${isToggled ? "toggled" : ""}`}>
        <FaPowerOff className="toggle-icon" />
      </div>
    </div>
  );
};

export default ToggleButton;
