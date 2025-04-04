import React from "react";
import "./css/about.css";
import profilePicture from "../assets/profile_picture.jpg"; // Adjust the path as needed
import { useState, useEffect, useRef } from "react";
import { RiArrowDownWideLine } from "react-icons/ri";

import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.png";
import img5 from "../assets/5.png";
import img6 from "../assets/6.png";
import img7 from "../assets/7.png";
import img8 from "../assets/8.png";
import img9 from "../assets/9.png";
import img10 from "../assets/10.png";
import img11 from "../assets/11.png";
import img13 from "../assets/13.png";
import img14 from "../assets/14.png";
import img15 from "../assets/15.png";
import img16 from "../assets/16.png";


const About = ({isPaused = false}) => {

  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11,  img13, img14,img15, img16];
  const intervalRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [showProfileImage, setShowProfileImage] = useState(false);
  const aboutRef = useRef(null);
  const [showExperience, setShowExperience] = useState(false);
  const [hoveredExperience, setHoveredExperience] = useState(null);
  const changeImageRandomly = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setCurrentImage(images[randomIndex]);
  };


  useEffect(() => {
    const handleScroll = () => {
      if (aboutRef.current) {
        const { scrollTop } = aboutRef.current;
        // Show experience section when scrolled down a bit
        setShowExperience(scrollTop > 0);
      }
    };

    if (aboutRef.current) {
      aboutRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (aboutRef.current) {
        aboutRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);


  // Start the image change interval on hover
  const handleMouseEnter = () => {
    // Change the image immediately on hover
    changeImageRandomly();

    // Start the interval to change images every 0.3 seconds
    intervalRef.current = setInterval(changeImageRandomly, 100);
  };

  const handleMouseLeave = () => {
    // Clear the interval to stop image changes
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null; // Reset the interval reference
    }
  };

  // Cleanup the interval when the component unmounts
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const experiences = [
    {
      id: 1,
      company: "Tech Innovators",
      designation: "Senior Software Engineer",
      duration: "2022 - Present",
      image: img1,
      details: [
        "Led development of mobile applications using Flutter",
        "Implemented CI/CD pipelines",
        "Collaborated with cross-functional teams to deliver high-quality software solutions"
      ] },
    {
      id: 2,
      company: "Digital Solutions",
      designation: "Software Developer",
      duration: "2020 - 2022",
      image: img2,
      details: [
        "Led development of mobile applications using Flutter",
        "Implemented CI/CD pipelines",
        "Collaborated with cross-functional teams to deliver high-quality software solutions"
      ]},
    {
      id: 3,
      company: "Web Masters",
      designation: "Junior Developer",
      duration: "2018 - 2020",
      image: img3,
      details: [
        "Led development of mobile applications using Flutter",
        "Implemented CI/CD pipelines",
        "Collaborated with cross-functional teams to deliver high-quality software solutions"
      ]},
    {
      id: 4,
      company: "StartUp Ventures",
      designation: "Intern",
      duration: "2017 - 2018",
      image: img4,
      details: [
        "Led development of mobile applications using Flutter",
        "Implemented CI/CD pipelines",
        "Collaborated with cross-functional teams to deliver high-quality software solutions"
      ]}
  ];





 return (
  <div className="about-container" ref={aboutRef}>
    <div className="about-section">
      <div className="line-checks">
        {[...Array(5)].map((_, index) => (
          <div
            key={`h-${index}`}
            className="horizontal-line"
            style={{
              top: `${index * 40}px`, // Increased spacing for gaps
              width: `${300 - index * 30}px`,
              opacity: 1 - index * 0.1,
            }}
          />
        ))}

        {[...Array(5)].map((_, index) => (
          <div
            key={`v-${index}`}
            className="vertical-line-check" // Different class name to avoid confusion with your existing vertical lines
            style={{
              left: `${index * 40}px`, // Every 40px
              height: `${200 - index * 30}px`,
              opacity: 1 - index * 0.1,
            }}
          />
        ))}
      </div>
      <div className="section-title-about">(ABOUT)</div>
     

      <div className="left-content">
        <div className="name-container">
          {showProfileImage && (
            <div className="profile-image-container">
              <img 
                src={profilePicture} 
                alt="Kanish Chhabra" 
                className="profile-image"
              />
            </div>
          )}
          <h1 
            className="name"
            onMouseEnter={() => setShowProfileImage(true)}
            onMouseLeave={() => setShowProfileImage(false)}
          >
            Kanish Chhabra
          </h1>
        </div>
        
        <p className="description">
 I am a Software Engineer specializing in full-stack development, with expertise in Flutter (Dart), Java, Node.js, and Python. I build scalable, end-to-end applications across mobile and backend systems.

With around two years of experience, I have worked with React, Flutter, .NET, and Azure. Passionate about problem-solving, I am currently exploring AI and Machine Learning.

Originally from Amritsar, Punjab, I am currently based in Mumbai, India.       {/* Your full description here */}
        </p>
        
        <button className="about-button">
          Peek at my resume ?
        </button>
      </div>
      
    <div className="vertical-lines">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="vertical-line">
              {/* Apply a CSS class to control animation */}
              <div className={`pulse ${isPaused ? 'paused' : ''}`}></div>
            </div>
          ))}
        </div>
      {/* Grey Square Container */}
      <div
        className="image-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={currentImage}
          alt="Random"
          className="image"
        />
      </div>
      <div className="scroll-down">
      <span>scroll down</span>
<div className="arrow-icon-about"><RiArrowDownWideLine /></div>
    </div>
    </div>
    <div className={`experience-section ${showExperience ? 'visible' : ''}`}>
  <div className="section-title-experience">(EXPERIENCE)</div>
  
  <div className="experience-timeline">
    {experiences.map((exp, index) => (
      <div 
        key={exp.id} 
        className="experience-row-container"
        onMouseEnter={() => setHoveredExperience(exp.id)}
        onMouseLeave={() => setHoveredExperience(null)}
      >
        <div className={`experience-row  with-divider`}>
          <div className="experience-info">
            <h3 className="company-name">{exp.company}</h3>
            <p className="company-designation">{exp.designation}</p>
            <p className="company-duration">{exp.duration}</p>
          </div>
        </div>
        
        {hoveredExperience === exp.id && (
          <div className="experience-card">
            <div className="card-image-container">
              <img src={exp.image} alt={exp.company} className="company-image" />
            </div>
            <div className="card-details">
              <ul className="experience-details">
                {exp.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
  
                ))}
              </ul>
            </div>
          </div>
        )}
        {/* <hr style={{ border: '1px solid #ccc', margin: '20px 0' }} /> */}
      </div>
    ))}
  </div>
</div>
    </div>
  );
};

export default About;
