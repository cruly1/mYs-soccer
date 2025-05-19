import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AboutUs.scss";


const owner1 = require("../assets/owner1.JPG");
const owner2 = require("../assets/owner2.jpeg");
const owner3 = require("../assets/owner3.jpg");

const owners = [
  {
    id: "marton",
    name: "Marton Attila",
    image: owner2,
    description: (
      <>
        <p>
          <strong>Football has been my passion since childhood</strong> – I started playing at the age of five and was always considered talented. Despite this, throughout my career, I experienced the challenges of progressing without the right connections or support system.
        </p>
        
        <p>
          My parents supported me in every way they could, but the system often overshadowed me, leaving me feeling powerless at times. Through perseverance and my love for the sport, I managed to reach the professional level, playing in the <strong>Hungarian NB1</strong> and later in the <strong>NB2</strong>.
        </p>
        
        <p>
          These years taught me invaluable lessons about:
          <br />- The game and life's challenges
          <br />- How much talent is lost due to lack of proper support
        </p>
        
        <p>
          <strong>This realization drove me to create an agency</strong> where I could use my experience to help others. My goal is to:
          <br />- Support talented young players
          <br />- Be involved in every aspect of their careers
          <br />- Provide professional advice
          <br />- Build valuable networks
          <br />- Help with tough decisions
        </p>
        
        <p>
          I believe that <strong>every talent deserves the opportunity</strong> to reach their full potential and achieve their dreams.
        </p>
        
        <p>
          <strong>This venture is not just a job for me; it's a lifelong mission.</strong> I am committed with all my heart and conscience to giving my very best to those who turn to me for guidance.
        </p>
        
        <p>
          <strong>My personal experiences have taught me</strong> the importance of having someone who:
          <br />- Believes in you
          <br />- Supports you on your journey
          <br /><br />
          I aspire to be that person for the next generation.
        </p>
      </>
    ),
    accentColor: "#FF8DA1", 
  },
  {
    id: "marko",
    name: "Futács Márkó",
    image: owner1,
    description: (
      <>
        <strong>Hello everyone,</strong><br /><br />
        My name is Márkó Futács, a former professional football player who spent more than a decade playing for both domestic and international teams. Throughout my career, I had the privilege of competing in prestigious <strong>European leagues such as:</strong><br />
        - The Championship (England)<br />
        - The Bundesliga (Germany)<br />
        - The Süper Lig (Turkey)<br />
        - The Croatian First Division<br /><br />
        
        These experiences allowed me to gain invaluable insights on both local and international levels, learning about <strong>diverse cultures, football philosophies, and training methodologies</strong>. Now, I am committed to sharing this knowledge with the next generation of talented players.<br /><br />
        
        <strong>My Mission</strong><br />
        My goal is <strong>to help young players embark on the right path and support them in developing their careers</strong>. I understand the challenges of building an international career and therefore place great emphasis on providing personalized guidance to each player. Whether pursuing opportunities in domestic clubs or abroad, my focus is on ensuring the best possible conditions for their success.<br /><br />
        
        <strong>Why Join Us?</strong><br />
        I know exactly how it feels to be a young player stepping into the world of football—I've been in your shoes. During my career, I traveled across various countries, encountered different styles and cultures, and <strong>learned just how crucial proper guidance and support are for an athlete's success.</strong><br /><br />
        
        The international football market is dynamic and full of opportunities, but achieving true success requires more than just talent—it takes professional backing to open the doors that lead to the pinnacle of your career.<br /><br />
        
        <strong>With us, you won't just be another name on a list. You'll receive:</strong><br />
        - Personalized attention and guidance<br />
        - Support in securing your first professional contract<br />
        - Assistance navigating transfers<br />
        - Help starting a career abroad<br /><br />
        
        Leveraging our extensive international network, we'll ensure you have access to the best opportunities and help you confidently navigate the global football stage.<br /><br />
        
        I understand how challenging it can be to adapt to a foreign country and a new language. My goal is to <strong>make your career transition as smooth and successful as possible</strong>.<br /><br />
        
        <strong>Join us, and let's work together to achieve your goals, whether that's with a domestic club or anywhere else in the world!</strong>
      </>
    ),
    accentColor: "#3498db", 
  },
  {
    id: "daniel",
    name: "Sajó Dániel",
    image: owner3,
    description: (
      <>
        <p>
          <strong>Football has defined my life since childhood.</strong> I first stepped onto the pitch at the age of six, and until I was 28, football was part of my everyday life. I developed as a youth player at <strong>Ferencváros</strong>, and from <strong>U15 to U19</strong> I was a regular member of the Hungarian national youth teams. As a senior player, I competed in the Hungarian third division (<strong>NB III</strong>), but my passion for the game never faded—it simply evolved.
        </p>

        <p>
          Over the years, I came to realize that <strong>real value in football isn’t only created on the pitch, but off it as well</strong>. For seven years I worked as a <em>club executive, scout, operational director, and sporting director</em>—dedicating myself to discovering, developing, and supporting players in finding their place in the world of football.
        </p>

        <p>
          As a manager, my clear goal has always been to provide the kind of support I often missed during my playing career: <strong>honest communication, long-term vision, and genuine care</strong>. I believe success isn’t measured in transfer fees, but in the kind of person and athlete a player becomes over time.
        </p>

        <p>
          <strong>I’m not only present during transfer windows</strong>—I aim to create <em>continuous opportunities</em> for my players to grow, both on the field and in life. A good manager doesn’t just represent a player—they <strong>mentor, guide, and stand by them</strong> when it matters most.
        </p>

      </>
    ),
    accentColor: "#2ecc71", 
  },
];

const AboutUs = () => {
  const navigate = useNavigate();
  const [currentOwnerId, setCurrentOwnerId] = useState(owners[0].id);

  
  const currentOwner = owners.find(owner => owner.id === currentOwnerId) || owners[0];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentOwnerId]);

  const changeOwner = (ownerId) => {
    if (ownerId === currentOwnerId) return; 
    setCurrentOwnerId(ownerId);
  };

  return (
    <div className="about-us-container">
      <nav className="owner-tabs">
        {owners.map(owner => (
          <button
            key={owner.id}
            onClick={() => changeOwner(owner.id)}
            className={currentOwnerId === owner.id ? "active" : ""}
            style={{
              borderBottomColor: currentOwnerId === owner.id ? owner.accentColor : "transparent",
              color: currentOwnerId === owner.id ? owner.accentColor : "#555"
            }}
          >
            {owner.name}
          </button>
        ))}
      </nav>
      
      <div className="content-section">
        <div className="image-container">
          <div className="accent-bar" style={{ backgroundColor: currentOwner.accentColor }}></div>
          <img 
            src={currentOwner.image} 
            alt={currentOwner.name} 
            className="owner-image" 
          />
        </div>

        <div className="bio-container">
          <h2 style={{ color: currentOwner.accentColor }}>{currentOwner.name}</h2>
          
          <div className="bio-content">
            {currentOwner.description}
          </div>
          
          <div className="action-buttons">
            <button 
              className="home-button"
              onClick={() => navigate("/")}
              style={{ backgroundColor: currentOwner.accentColor }}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;