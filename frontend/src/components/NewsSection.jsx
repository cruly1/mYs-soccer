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
      console.log("Fetched news:", data); // Debugging line to check fetched data
      setNews(data);
    };

    fetchNews();
  }, []);

  return (
    <div className="news-section">
      <h2>Latest News</h2>
      <div className="reference-container">
      {/* 🔹 Carousel Integration */}
       {news.length > 0 ? (
          <Carousel>
            {news.map((newsItem, index) => (
              <NewsCard key={index} {...newsItem} />
            ))}
          </Carousel>
        ) : (
          <p>No news available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default NewsSection;
