import React, { useEffect, useState } from "react";
import { getFirstFourNews } from "../services/api";
import NewsCard from "./NewsCard";
import Carousel from "../components/Carousel"; // Using existing carousel
import "./NewsSection.scss";

const NewsSection = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getFirstFourNews();
      setNews(data);
    };

    fetchNews();
  }, []);

  return (
    <div className="news-section">
      <h2>Latest News</h2>
      <div className="reference-container">
      {/* 🔹 Carousel Integration */}
      <Carousel>
        {news.map((newsItem, index) => (
          <NewsCard key={index} {...newsItem} />
        ))}
      </Carousel>
      </div>
    </div>
  );
};

export default NewsSection;
