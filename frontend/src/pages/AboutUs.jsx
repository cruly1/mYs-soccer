import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./AboutUs.scss";

const owner1 = require("../assets/owner1.JPG");
const owner2 = require("../assets/owner2.jpeg");

const owners = [
  {
    name: "Futács Márkó",
    image: owner1,
    description: (
      <>
        <strong>Hello everyone,</strong><br /><br />
        My name is Márkó Futács, a former professional football player who spent more than a decade playing for both domestic and international teams. Throughout my career, I had the privilege of competing in prestigious European leagues such as:<br />
        - The Championship (England)<br />
        - The Bundesliga (Germany)<br />
        - The Süper Lig (Turkey)<br />
        - The Croatian First Division<br /><br />
        
        These experiences allowed me to gain invaluable insights on both local and international levels, learning about diverse cultures, football philosophies, and training methodologies. Now, I am committed to sharing this knowledge with the next generation of talented players.<br /><br />
        
        <strong>My Mission</strong><br />
        My goal is to help young players embark on the right path and support them in developing their careers. I understand the challenges of building an international career and therefore place great emphasis on providing personalized guidance to each player. Whether pursuing opportunities in domestic clubs or abroad, my focus is on ensuring the best possible conditions for their success.<br /><br />
        
        <strong>Why Join Us?</strong><br />
        I know exactly how it feels to be a young player stepping into the world of football—I've been in your shoes. During my career, I traveled across various countries, encountered different styles and cultures, and learned just how crucial proper guidance and support are for an athlete's success.<br /><br />
        
        The international football market is dynamic and full of opportunities, but achieving true success requires more than just talent—it takes professional backing to open the doors that lead to the pinnacle of your career.<br /><br />
        
        With us, you won't just be another name on a list. You'll receive:<br />
        - Personalized attention and guidance<br />
        - Support in securing your first professional contract<br />
        - Assistance navigating transfers<br />
        - Help starting a career abroad<br /><br />
        
        Leveraging our extensive international network, we'll ensure you have access to the best opportunities and help you confidently navigate the global football stage.<br /><br />
        
        I understand how challenging it can be to adapt to a foreign country and a new language. My goal is to make your career transition as smooth and successful as possible.<br /><br />
        
        <strong>Join us, and let's work together to achieve your goals, whether that's with a domestic club or anywhere else in the world!</strong>
      </>
    ),
    bgColor: "#2ecc71", // Green
  },
  {
    name: "Márton Attila",
    image: owner2,
    description: (
  <>
    <p>
      <strong>Football has been my passion since childhood</strong> – I started playing at the age of five and was always considered talented. Despite this, throughout my career, I experienced the challenges of progressing without the right connections or support system.
    </p>
    
    <p>
      My parents supported me in every way they could, but the system often overshadowed me, leaving me feeling powerless at times. Through perseverance and my love for the sport, I managed to reach the professional level, playing in the <strong>Hungarian NB2</strong> and later in the <strong>NB1</strong>.
    </p>
    
    <p>
      These years taught me invaluable lessons about:
      <br />- The game and life's challenges
      <br />- How much talent is lost due to lack of proper support
    </p>
    
    <p>
      <strong>This realization drove me to create a platform</strong> where I could use my experience to help others. My goal is to:
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
    bgColor: "#3498db", // Blue
  },
];

const AboutUs = () => {
  const navigate = useNavigate();
  const [currentOwner, setCurrentOwner] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);
  const textSectionRef = useRef(null);
  const [isLandscape, setIsLandscape] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) return;

    const createOverlay = () => {
      const overlay = document.createElement('div');
      overlay.id = 'landscape-overlay';
      Object.assign(overlay.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        zIndex: '9999',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontFamily: 'sans-serif',
        textAlign: 'center',
        padding: '20px'
      });
      overlayRef.current = overlay;

      // Phone animation elements
      const phoneContainer = document.createElement('div');
      phoneContainer.style.position = 'relative';
      phoneContainer.style.width = '180px';
      phoneContainer.style.height = '180px';
      phoneContainer.style.margin = '30px';

      const phone = document.createElement('div');
      Object.assign(phone.style, {
        width: '100px',
        height: '180px',
        border: '15px solid #fff',
        borderRadius: '20px',
        position: 'absolute',
        top: '0',
        left: '40px',
        transition: 'transform 0.8s ease-in-out',
        transformOrigin: 'center center'
      });

      const screen = document.createElement('div');
      screen.style.backgroundColor = '#333';
      screen.style.position = 'absolute';
      screen.style.top = '5px';
      screen.style.left = '5px';
      screen.style.right = '5px';
      screen.style.bottom = '5px';
      screen.style.borderRadius = '5px';
      
      phone.appendChild(screen);
      phoneContainer.appendChild(phone);
      
      const message = document.createElement('h2');
      message.textContent = 'Please rotate your device to landscape mode';
      message.style.marginBottom = '20px';
      message.style.fontSize = '1.5rem';
      message.style.maxWidth = '80%';

      overlay.appendChild(message);
      overlay.appendChild(phoneContainer);
      document.body.appendChild(overlay);

      // Animation function
      const animateRotation = () => {
        phone.style.transform = 'rotate(0deg)';
        setTimeout(() => {
          phone.style.transform = 'rotate(90deg)';
          setTimeout(() => {
            phone.style.transform = 'rotate(0deg)';
            setTimeout(animateRotation, 1000);
          }, 1000);
        }, 1000);
      };

      animateRotation();
      return overlay;
    };

    const checkOrientation = () => {
      const nowLandscape = window.innerWidth > window.innerHeight;
      setIsLandscape(nowLandscape);

      if (nowLandscape) {
        // Landscape mode - remove overlay if exists
        if (overlayRef.current && document.body.contains(overlayRef.current)) {
          document.body.removeChild(overlayRef.current);
        }
      } else {
        // Portrait mode - show overlay if not already showing
        if (!overlayRef.current || !document.body.contains(overlayRef.current)) {
          createOverlay();
        }
      }
    };

    // Initial check
    checkOrientation();

    // Set up event listeners
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
      if (overlayRef.current && document.body.contains(overlayRef.current)) {
        document.body.removeChild(overlayRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 300); // Fade-in effect on page load
  }, []);

  const switchOwner = () => {
    setFadeIn(false); // Prevent flickering during transition
    setTimeout(() => {
      setCurrentOwner((prev) => (prev === 0 ? 1 : 0));
      setFadeIn(true);
    }, 500);
  };

  return (
    <motion.div
      className="about-us-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: fadeIn ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`owner-section ${currentOwner === 0 ? "left" : "right"}`} style={{ backgroundColor: owners[currentOwner].bgColor }}>
        <motion.img
          key={`image-${currentOwner}`}
          src={owners[currentOwner].image}
          alt={owners[currentOwner].name}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className={`text-section ${currentOwner === 0 ? "right" : "left"}`}>
        <motion.div
  key={`text-${currentOwner}`}
  initial={{ opacity: 0, x: currentOwner === 0 ? 100 : -100 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: currentOwner === 0 ? -100 : 100 }}
  transition={{ duration: 0.5 }}
>
  <div className="text-content">
  <h2>{owners[currentOwner].name}</h2>
  <p>{owners[currentOwner].description}</p>
  </div>
  {/* ✅ Grouping Buttons in a Flexbox */}
  <div className="button-group">
    <button className="home-btn" onClick={switchOwner}>Switch Owner</button>
    <button className="home-btn" onClick={() => navigate("/")}>Home</button>
  </div>
</motion.div>

        
      </div>
      
    </motion.div>
  );
};

export default AboutUs;
