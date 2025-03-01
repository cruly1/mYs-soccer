import React from "react";
import Footer from "../components/Footer";
import NewsCard from "../components/NewsCard";
import "./News.scss";

const newsData = [
  { title: "News 1", date: "Jan 1, 2025", excerpt: "Details about News 1...", image: "https://images.pexels.com/photos/127513/pexels-photo-127513.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" },
  { title: "News 2", date: "Jan 2, 2025", excerpt: "Details about News 2...", image: "https://images.pexels.com/photos/631954/pexels-photo-631954.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" },
  { title: "News 3", date: "Jan 3, 2025", excerpt: "Details about News 3...", image: "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
];

const News = () => {
  return (
    <div className="news-page">
     <div
        className="background-image"
      ></div>
      <h2>All News</h2>
      <div className="news-grid">
        {newsData.map((news, index) => (
          <NewsCard key={index} {...news} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default News;
