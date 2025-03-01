import React from "react";
import { useNavigate } from "react-router-dom";
import "./AboutUsSection.scss";

const AboutUsSection = () => {
  const navigate = useNavigate();

  return (
    <div className="about-us-section">
      <h2>About Us</h2>
      <div className="owners">
        <img src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg" alt="Owner 1" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg" alt="Owner 2" />
      </div>

      <p className="about-description">
        Welcome to the world of <strong>ManageYself!</strong> Our football careers started at the same club, just a few years apart, and our friendship has remained unbroken ever since. <br /><br />
        Based on our experiences over the years, we both felt the need to create a player-focused, fair, and strong player management agency. With passion and dedication, our team works tirelessly every day to provide outstanding services to our players. <br /><br />
        Our goal is to make it possible for every player to achieve their dreams. This vision led to the creation of <strong>ManageYself</strong> and the philosophy behind it, which, as the name suggests, empowers talented players to take charge of their future hand in hand with us. <br /><br />
        We firmly believe that these values and our mission will be powerful enough to help every player achieve their goals with us by their side.
      </p>

      <button onClick={() => navigate("/about-us")}>Get to Know Us Better</button>
    </div>
  );
};

export default AboutUsSection;
