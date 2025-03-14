import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorSize, setCursorSize] = useState(40); // Default size
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  useEffect(() => {
    const handleHover = (e) => {
      if (e.target.closest(".hover-trigger")) {
        setCursorSize(80);
        setHovered(true);
      } else {
        setCursorSize(40); 
        setHovered(false);
      }
    };

    window.addEventListener("mouseover", handleHover);
    return () => window.removeEventListener("mouseover", handleHover);
  }, []);

  return (
    <div
      className={`fixed rounded-full pointer-events-none border-2 transition-all duration-200 ease-out ${
        hovered ? "border-blue-400 bg-blue-400/20" : "border-white bg-white/10"
      }`}
      style={{
        width: cursorSize,
        height: cursorSize,
        top: position.y,
        left: position.x,
        transform: "translate(-50%, -50%)",
      }}
    ></div>
  );
};

export default CustomCursor;
