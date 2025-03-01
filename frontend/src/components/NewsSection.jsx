import React from "react";
import { useNavigate } from "react-router-dom";
import NewsCard from "./NewsCard";
import "./NewsSection.scss";

const newsData = [
  {
    title: "Amazing First Title",
    date: "Jan 29, 2018",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat?",
    image: "https://images.pexels.com/photos/127513/pexels-photo-127513.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    link: "#",
  },
  {
    title: "Amazing Second Title that is Quite Long",
    date: "Jan 29, 2018",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam obcaecati ex natus nulla.",
    image: "https://images.pexels.com/photos/631954/pexels-photo-631954.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    link: "#",
  },
  {
    title: "Amazing Title",
    date: "Jan 29, 2018",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis beatae…",
    image: "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    link: "#",
  },
  {
    title: "Amazing Fourth Title",
    date: "Jan 29, 2018",
    excerpt: "Lorem ipsum dolor sit amet!",
    image: "https://images.pexels.com/photos/248486/pexels-photo-248486.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    link: "#",
  },
];

const NewsSection = () => {
    const navigate = useNavigate();
  return (
    <div className="content-wrapper">
      {newsData.map((news, index) => (
        <NewsCard key={index} {...news} />
      ))}
      <button onClick={() => navigate("/news")}>View All News</button>
    </div>
    
  );
};

export default NewsSection;
