import React from "react";
import "./FinancialAdvices.scss";
import ServiceTemplate from "./ServiceTemplate";

const financialAdvicesData = {
  title: "Financial Advice",
  description:
    "Managing finances as a professional athlete can be challenging. Our team provides expert guidance on budgeting, investments, and wealth management, ensuring a secure future beyond your playing career.",
  topics: [
    "Wealth Management",
    "Investment Strategies",
    "Tax Planning for Athletes",
    "Budgeting & Expense Control",
    "Sponsorship & Earnings Management",
  ],
  trainers: [
    {
      name: "John Doe",
      image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
      bio: "John is a financial consultant with 10 years of experience helping athletes manage their wealth effectively.",
    },
    {
      name: "Jane Smith",
      image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
      bio: "Jane specializes in investment strategies and tax planning for professional athletes.",
    },
  ],
  testimonials: [
    {
      name: "David Johnson",
      feedback: "Thanks to this financial coaching, I now have a solid investment plan for my post-football career.",
    },
    {
      name: "Michael Lee",
      feedback: "They helped me make smart sponsorship decisions and save for my future.",
    },
  ],
};

const FinancialAdvices = () => {
  return <ServiceTemplate {...financialAdvicesData}/>
};

export default FinancialAdvices;
