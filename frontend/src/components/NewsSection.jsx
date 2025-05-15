import React, { useEffect, useState } from "react";
import { getFirstFourNews } from "../services/api";
import { useNavigate } from "react-router-dom";
import NewsCard from "./NewsCard";
import Carousel from "../components/Carousel"; 
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
    <div className="news-section">
      <h2>Latest News</h2>
      <div className="reference-container">
       {news.length > 0 ? (
        <>
          <Carousel>
            {news.map((newsItem, index) => (
              <NewsCard key={index} {...newsItem} />
            ))}
          </Carousel>
          
            <button
              className="news-section-button"
              onClick={() => navigate("/news")}
            >
              View All News
            </button>
          </>
        ) : (
          <p>No news available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default NewsSection;
