// components/Experience.js
import React from "react";
import "./css/experience.css";

const Experience = () => {

    useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
              }
            });
          },
          { threshold: 0.1 }
        );
    
        const items = experienceRef.current.querySelectorAll('.experience-item');
        items.forEach(item => observer.observe(item));
    
        return () => observer.disconnect();
      }, []);

  return (
    <div className="experience-section">
      <div className="experience-content">
        <h2 className="experience-title">EXPERIENCE</h2>
        
        <div className="experience-item">
          <h3>Software Engineer</h3>
          <p className="company">Company Name • 2022-Present</p>
          <ul className="experience-description">
            <li>Developed and maintained full-stack applications using Flutter, Node.js, and .NET</li>
            <li>Implemented CI/CD pipelines reducing deployment time by 40%</li>
            <li>Led a team of 3 developers to deliver a cross-platform mobile app</li>
          </ul>
        </div>

        <div className="experience-item">
          <h3>Junior Developer</h3>
          <p className="company">Previous Company • 2020-2022</p>
          <ul className="experience-description">
            <li>Built responsive web applications using React and Python</li>
            <li>Optimized database queries improving performance by 30%</li>
            <li>Collaborated with designers to implement UI/UX improvements</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Experience;