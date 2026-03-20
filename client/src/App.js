import React, { useEffect, useState } from "react";
import axios from "axios";
import Login from "./Login";
import Admin from "./Admin";

const API = "https://ai-news-final-1.onrender.com";

export default function App() {
  const [news, setNews] = useState([]);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    axios.get(API + "/news").then(res => setNews(res.data));

    // 🔥 check token
    const token = localStorage.getItem("token");
    if (token) setIsLogged(true);
  }, []);

  const like = (id) => {
    axios.post(API + "/like/" + id);
  };

  return (
    <div>
      <h1>🔥 AI News</h1>

      {/* 🔥 login only if not logged */}
      {!isLogged && <Login setIsLogged={setIsLogged} />}

      {news.map(n => (
        <div key={n._id}>
          <h3>{n.title}</h3>
          <p>{n.content}</p>

          <button onClick={() => like(n._id)}>
            ❤️ {n.likes}
          </button>

          {/* 🔥 admin only if logged */}
          {isLogged && <Admin id={n._id} />}
        </div>
      ))}
    </div>
  );
}