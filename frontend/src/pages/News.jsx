import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import NewsCard from "../components/NewsCard";
import { getAllNews } from "../services/api";
import "./News.scss";

const News = () => {
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
