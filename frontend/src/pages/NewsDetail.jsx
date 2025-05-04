import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNewsByTitle } from "../services/api";
import "./NewsDetail.scss";

const NewsDetail = () => {
  const navigate = useNavigate();
  const { title } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getNewsByTitle(title);
      setNews(data);
    };
    fetchNews();
  }, [title]);

  if (!news) return <div className="loading">Loading...</div>;

  return (
    <div className="news-detail">
      <div className="background-image"></div>
      <div className="news-nav">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/news")}>Back to News</button>
      </div>

      
      <div className="news-header">
        <h1>{news.title}</h1>
        <p className="news-date">{new Date(news.postDate).toDateString()}</p>
      </div>

     
      <div className="news-content">
        <p>{news.content}</p>
      </div>
    </div>
  );
};

export default NewsDetail;
