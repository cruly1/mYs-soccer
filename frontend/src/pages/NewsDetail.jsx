import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNewsByTitle } from "../services/api";
import "./NewsDetail.scss";

const NewsDetail = () => {
  const { title } = useParams();
  const [news, setNews] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getNewsByTitle(title);
      setNews(data);
    };

    fetchNews();
  }, [title]);

  // Text-to-Speech Function
  const handleSpeech = () => {
    if (!news || !news.content) return;

    const speech = new SpeechSynthesisUtterance(news.content);
    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.speak(speech);
      setIsSpeaking(true);
    }

    speech.onend = () => setIsSpeaking(false);
  };

  if (!news) return <div className="loading">Loading...</div>;

  return (
    <div className="news-detail">
      <div className="news-header">
        <h1>{news.title}</h1>
        <p className="news-date">{new Date(news.postDate).toDateString()}</p>
      </div>
      <div className="news-content">
        <p>{news.content}</p>
      </div>
      <button className="speech-button" onClick={handleSpeech}>
        {isSpeaking ? "Stop Reading" : "Read Aloud"}
      </button>
    </div>
  );
};

export default NewsDetail;
