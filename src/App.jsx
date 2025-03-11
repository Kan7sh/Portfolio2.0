import { useEffect,useState } from "react";
import "./App.css";
import { motion} from "framer-motion";
import ResizableWindow from "./resizewindow";


function App() {

const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
const [isFullScreen, setIsFullScreen] = useState(true);
const [showButtons, setShowButtons] = useState(false);

const [cursorVariant, setCursorVarient] = useState("defaut"); 

useEffect(() => {

  const mouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  window.addEventListener("mousemove", mouseMove);

  return () => { window.removeEventListener("mousemove", mouseMove); };

}, []);

const variants = {
default: { 
  x: mousePosition.x-16,
  y: mousePosition.y-16,
},
text:{
  height:150,
  width: 150,
  x: mousePosition.x-75,
  y: mousePosition.y-75,
  backgroundColor: "yellow", 
  mixBlendMode: "difference",
  } 
}

const textEnter = () => setCursorVarient("text");
const textLeave = () => setCursorVarient("default");


const handleShrink = () => {
  setIsFullScreen(isFullScreen => !isFullScreen);
  setTimeout(() => setShowButtons(true), 500); 
};
const handleButtonClick = (side, index) => {
  console.log(`${side} button ${index + 1} clicked!`);
};

  return (
   <div>
    <ResizableWindow />
   </div>
  );
}

export default App;
