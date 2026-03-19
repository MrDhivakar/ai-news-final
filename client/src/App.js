import React, { useEffect, useState } from "react";
import axios from "axios";
import Login from "./Login";
import Admin from "./Admin";

// 🔥 CHANGE HERE
const API = "https://ai-news-final-1.onrender.com";

export default function App() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get(API + "/news").then(res => setNews(res.data));
  }, []);

  const like = (id) => {
    axios.post(API + "/like/" + id);
  };

  return (
    <div>
      <h1>🔥 AI News</h1>

      <Login />

      {news.map(n => (
        <div key={n._id}>
          <h3>{n.title}</h3>
          <p>{n.content}</p>

          <button onClick={() => like(n._id)}>
            ❤️ {n.likes}
          </button>

          <Admin id={n._id} />
        </div>
      ))}
    </div>
  );
}