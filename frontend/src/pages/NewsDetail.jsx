import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNewsByTitle } from "../services/api";
import "./NewsDetail.scss";

const NewsDetail = () => {
  const { title } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getNewsByTitle(title);
      setNews(data);
    };

    fetchNews();
  }, [title]);

  if (!news) return <div>Loading...</div>;

  return (
    <div className="news-detail">
      <h1>{news.title}</h1>
      <p className="news-date">{news.postDate}</p>
      <p className="news-content">{news.content}</p>
    </div>
  );
};

export default NewsDetail;
