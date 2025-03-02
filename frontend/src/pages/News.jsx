import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import NewsCard from "../components/NewsCard";
import { getAllNews } from "../services/api";
import "./News.scss";

const News = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getAllNews();
      setNews(data);
    };

    fetchNews();
  }, []);

  return (
    <div className="news-page">
      <div className="background-image"></div>
      <button className="home-btn" onClick={() => navigate("/")}>
        Home
        </button>
      <h2>All News</h2>
      <div className="news-grid">
        {news.map((newsItem, index) => (
          <NewsCard key={index} {...newsItem} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default News;
