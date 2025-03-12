import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewsCard from "./NewsCard";
import { getFirstFourNews } from "../services/api";
import "./NewsSection.scss";

const NewsSection = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getFirstFourNews();
      setNews(data);
    };

    fetchNews();
  }, []);

  return (
    <div className="content-wrapper">
      {news.map((newsItem, index) => (
        <NewsCard key={index} {...newsItem} />
      ))}
      <button className="news-section-button" onClick={() => navigate("/news")}>View All News</button>
    </div>
  );
};

export default NewsSection;
