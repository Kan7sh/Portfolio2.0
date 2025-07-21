import { SlControlPause } from "react-icons/sl";
import { SlControlPlay } from "react-icons/sl";

import "./css/ToggleButton.css"; 

const ToggleButton = ({ isToggled, onToggle }) => {
  return (
    <div
      className={`toggle-container ${isToggled ? "toggled" : ""}`}
      onClick={onToggle}
    >
      <div className={`toggle-text ${isToggled ? "toggled" : ""}`}>
        <div className="toggle-text-inner">
          <span>{isToggled ? "RENDER" : "FREEZE"}</span>
          <span>{isToggled ? "PLAY" : "PAUSE"}</span>
        </div>
      </div>
      <div className={`toggle-switch ${isToggled ? "toggled" : ""}`}>
        {isToggled ? <SlControlPlay className="toggle-icon" /> : <SlControlPause className="toggle-icon" />}
      </div>
    </div>
  );
};

export default ToggleButton;
