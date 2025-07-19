import "./css/about.css";
import profilePicture from "../assets/profile_picture.jpg";
import rocket from "../assets/rocket.png"; // Adjust the path as needed
import { useState, useEffect, useRef } from "react";
import { RiArrowDownWideLine } from "react-icons/ri";
import experienceLottieData from "../assets/bcd.json"; // Adjust the path as needed
import { FaEnvelope, FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import sateliteImg from "../assets/satelite.png";
import { SiLeetcode } from "react-icons/si";
import lottie from "lottie-web";
import { PiBirdFill } from "react-icons/pi";
import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img4 from "../assets/4.png";
import img5 from "../assets/5.png";
import img6 from "../assets/6.png";
import img9 from "../assets/9.png";
import img10 from "../assets/10.png";
import img11 from "../assets/11.png";
import img13 from "../assets/13.png";
import img14 from "../assets/14.png";
import img15 from "../assets/15.png";
import img16 from "../assets/16.png";
import tcs from "../assets/tcs.png";
import lng from "../assets/lng.jpg";
import ridobiko from "../assets/ridobiko.png";
import ttofl from "../assets/ttofl.jpg";

const About = ({ isPaused = false }) => {
  const images = [
    img1,
    img2,
    img4,
    img5,
    img6,
    img9,
    img10,
    img11,
    img13,
    img14,
    img15,
    img16,
  ];
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
  const experienceTitleRef = useRef(null);

  useEffect(() => {
    if (isPaused) return; // Prevent animation if paused
    if (experienceTitleRef.current) {
      const anim = lottie.loadAnimation({
        container: experienceTitleRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: experienceLottieData, // Replace with your imported JSON
      });

      return () => anim.destroy(); // Cleanup on unmount
    }
  }, []);

  useEffect(() => {
    if (isPaused) return; // Prevent scroll effect if paused
    const handleScroll = () => {
      if (aboutRef.current) {
        const { scrollTop } = aboutRef.current;
        setShowExperience(scrollTop > 0);
      }
    };

    if (aboutRef.current) {
      aboutRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (aboutRef.current) {
        aboutRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const contactMethods = [
    {
      icon: FaEnvelope,
      href: "mailto:kanishchhabra.info@gmail.com",
      text: "kanishchhabra.info@gmail.com",
    },
    {
      icon: FaLinkedin,
      href: "https://linkedin.com/in/kanish-chhabra/",
      text: "kanish-chhabra",
    },
    {
      icon: FaTwitter,
      href: "https://twitter.com/KanishChhabra",
      text: "KanishChhabra",
    },
    {
      icon: SiLeetcode,
      href: "https://leetcode.com/Kan7sh",
      text: "Kan7sh",
    },
    {
      icon: FaGithub,
      href: "https://github.com/Kan7sh",
      text: "Kan7sh",
    },
    {
      icon: PiBirdFill,
      href: "#",
      text: "Pigeon mail (ask for my coordinates)",
    },
  ];

  // Start the image change interval on hover
  const handleMouseEnter = () => {
    if (isPaused) return; // Prevent hover effect if paused
    // Change the image immediately on hover
    changeImageRandomly();

    // Start the interval to change images every 0.3 seconds
    intervalRef.current = setInterval(changeImageRandomly, 100);
  };

  const handleMouseLeave = () => {
    if (isPaused) return; // Prevent hover effect if paused
    // Clear the interval to stop image changes
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null; // Reset the interval reference
    }
  };

  const handleExperienceHover = (id) => {
    if (isPaused) return;
    setHoveredExperience(id);
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
      company: "Tata Consultancy Services",
      designation: "System Engineer",
      duration: "Jan 2025 - Present",
      image: tcs,
      details: [
        "Developing secure and high-performance APIs using Spring Boot and PostgreSQL for a banking project with SBI.",
        "Tech Stack: Java, Spring Boot",
      ],
    },
    {
      id: 2,
      company: "L&G Consultancy",
      designation: "Software Developer",
      duration: "Jan 2024 - Jan 2025",
      image: lng,
      details: [
        "Developed an end-to-end automated mandate payment system using Azure Functions, integrating Qlink APIs for South African banks, reducing manual processing by 40% and improving transaction reliability.",
        "Led the migration of the Order module for the Steve Madden website from .NET 4.8 to .NET 8, integrating Shopify Callback APIs, improving data consistency, and reducing response time by 30%.",
        "Optimized the UI and performance of the company’s internal employee rating platform using React, enhancing user experience and reducing page load time by 50%.",
        "Tech Stack: .NET, C#, Azure.",
      ],
    },
    {
      id: 3,
      company: "TTOFL",
      designation: "Software Developer Intern",
      duration: "Oct 2023 - Oct 2024",
      image: ttofl,
      details: [
        "Developed two end-to-end cross-platform mobile apps using Flutter for a car cleaning subscription service—one for customers to manage subscriptions and another for vendors to schedule and manage cleaning services.",
        "Integrated Razorpay payment gateway, background services, and Firebase, ensuring secure transactions and seamless real-time updates across both apps.",
        "Implemented state management using Riverpod, optimizing performance and achieving 99.9% crash-free sessions, enhancing user experience and app reliability.",
        "Tech Stack: Flutter, Python.",
      ],
    },
    {
      id: 4,
      company: "Ridobiko",
      designation: "Flutter Developer Intern",
      duration: "Jun 2023 - Dec 2023",
      image: ridobiko,
      details: [
        "Developed and launched 4 Flutter apps, successfully publishing them on the Play Store.",
        "Resolved bugs and optimized performance in legacy applications, reducing crash rates by 40% and improving load times by 30%.",
      ],
    },
  ];

  return (
    <div className="about-container" ref={aboutRef}>
      <div className="about-section">
        <img src={rocket} alt="Rocket" className="rocketImg" />
        <div
          className="about-description-section"
          onMouseEnter={() => {
            isPaused ? setShowProfileImage(false) : setShowProfileImage(true);
          }}
          onMouseLeave={() => setShowProfileImage(false)}
        >
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
            <h1 className={`name ${isPaused ? "paused" : ""}`}>
              Kanish Chhabra
            </h1>
          </div>
          <p className="description">
            I am a Software Engineer specializing in full-stack development,
            with expertise in Flutter (Dart), Java, Node.js, and Python. I build
            scalable, end-to-end applications across mobile and backend systems.
            With around two years of experience, I have worked with React,
            Flutter, .NET, and Azure. Passionate about problem-solving, I am
            currently exploring AI and Machine Learning. Originally from
            Amritsar, Punjab, I am currently based in Mumbai, India.{" "}
          </p>
        </div>
        <button
          className={`about-button ${isPaused ? "paused" : ""}`}
          onClick={() =>
            window.open(
              "https://drive.google.com/file/d/1fZJJWoA-q1HkVoUoMMK_3VhF4R2fMgNz/view",
              "_blank"
            )
          }
        >
          Peek at my resume ?
        </button>
        {/* <img src={sateliteImg} alt="Satelite" className="sateliteImg" /> */}

        {/* <div className="line-checks">
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
        <div className="section-title-about">(ABOUT)</div> */}

        {/* <div className="left-content">
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
            <img src={rocket} alt="Rocket" className="rocketImg" />
            <h1
              className={`name ${isPaused ? "paused" : ""}`}
              onMouseEnter={() =>
                isPaused
                  ? setShowProfileImage(false)
                  : setShowProfileImage(true)
              }
              onMouseLeave={() => setShowProfileImage(false)}
            >
              Kanish Chhabra
            </h1>
          </div>

          <p className="description">
            I am a Software Engineer specializing in full-stack development,
            with expertise in Flutter (Dart), Java, Node.js, and Python. I build
            scalable, end-to-end applications across mobile and backend systems.
            With around two years of experience, I have worked with React,
            Flutter, .NET, and Azure. Passionate about problem-solving, I am
            currently exploring AI and Machine Learning. Originally from
            Amritsar, Punjab, I am currently based in Mumbai, India.{" "}
          </p>

          <button
            className={`about-button ${isPaused ? "paused" : ""}`}
            onClick={() =>
              window.open(
                "https://drive.google.com/file/d/1fZJJWoA-q1HkVoUoMMK_3VhF4R2fMgNz/view",
                "_blank"
              )
            }
          >
            Peek at my resume ?
          </button>
        </div> */}

        <div className="vertical-lines">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="vertical-line">
              {/* Apply a CSS class to control animation */}
              <div className={`pulse ${isPaused ? "paused" : ""}`}></div>
            </div>
          ))}
        </div>
        {/* Grey Square Container */}
        {/* <div
          className="image-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img src={currentImage} alt="Random" className="image" />
        </div> */}
        <div className={`scroll-down ${isPaused ? "paused" : ""}`}>
          <span>scroll down</span>
          <div className="arrow-icon-about">
            <RiArrowDownWideLine />
          </div>
        </div>
      </div>
      <div className="section-divider">
        <div className="binary-digits">
          {Array.from({ length: 130 }).map((_, i) => (
            <span
              key={i}
              className="binary-digit"
              style={{
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              {Math.random() > 0.5 ? "0" : "1"}
            </span>
          ))}
        </div>
      </div>

      <div className={`experience-section  visible`}>
        <div className="experience-title-container">
          <div className="section-title-experience">EXPERIENCE</div>
          <div className="lottie-container" ref={experienceTitleRef}></div>
        </div>

        {/* <div className="section-title-experience">(EXPERIENCE)</div> */}

        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="experience-row-container"
              onMouseEnter={() =>
                isPaused
                  ? setHoveredExperience(null)
                  : setHoveredExperience(exp.id)
              }
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
                    <img
                      src={exp.image}
                      alt={exp.company}
                      className="company-image"
                    />
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
      <div className={`skills-section ${isPaused ? "paused" : ""}`}>
        <div className="skills-container">
          {[
            "Flutter",
            "Dart",
            "Java",
            "Python",
            "JavaScript",
            "React",
            "Node.js",
            "Express",
            "MongoDB",
            "Firebase",
            "Git",
            "CI/CD",
            "Docker",
            "Azure",
            "AWS",
            "REST APIs",
            "GraphQL",
            "Redux",
            "TypeScript",
            "HTML/CSS",
            "UI/UX",
            "Flutter",
            "Dart",
            "Java",
            "Python",
            "JavaScript",
            "React",
            "Node.js",
            "NextJS",
            "Express",
            "MongoDB",
            "Firebase",
            "Git",
            "CI/CD",
            "Docker",
            "Azure",
            "AWS",
            "REST APIs",
            "GraphQL",
            "Redux",
            "TypeScript",
            "HTML/CSS",
            "UI/UX",
          ].map((skill, index) => (
            <div key={index} className="skill-item">
              {skill}
            </div>
          ))}
        </div>
      </div>

      <div className="contact-section">
        <h2 className="contact-title">GET IN TOUCH</h2>

        <div className="contact-content">
          <div className="contact-methods">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`contact-method ${isPaused ? "paused" : ""}`}
              >
                <method.icon className="contact-icon" />
                <span className="contact-text">{method.text}</span>
              </a>
            ))}
          </div>
          <p className="contact-slang">
            Coffee’s on me if you bring the conversation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
