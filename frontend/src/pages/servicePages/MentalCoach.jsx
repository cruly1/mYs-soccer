import React from "react";
import ServiceTemplate from "./ServiceTemplate";

const mentalCoachData = {
  title: "Mental Coaching",
  description:
    "A strong mind is as important as a strong body in sports. Our mental coaching sessions help athletes stay focused, motivated, and confident.",
  topics: [
    "Developing Mental Strength",
    "Handling Pressure & Stress",
    "Game Preparation Techniques",
    "Boosting Focus & Concentration",
  ],
  trainers: [
    {
      name: "Mark Anderson",
      image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
      bio: "Mark is a sports psychologist with years of experience coaching professional athletes in mental resilience.",
    },
  ],
  testimonials: [
    {
      name: "Chris Evans",
      feedback: "Mental coaching helped me overcome my performance anxiety and stay focused under pressure.",
    },
  ],
};

const MentalCoach = () => {
  return <ServiceTemplate {...mentalCoachData} />;
};

export default MentalCoach;
