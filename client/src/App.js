import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./Login";

const API = "https://ai-news-final.onrender.com";

export default function App() {
  const [news, setNews] = useState([]);
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLogged(true);
    }

    setTimeout(loadNews, 3000);
  }, []);

  const loadNews = async () => {
    try {
      const res = await axios.get(API + "/news");
      setNews(res.data || []);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      {!logged && <Login setLogged={setLogged} />}

      <h1>🟧 AI NEWS</h1>

      {news.length === 0 && <p>No news available</p>}

      {Array.isArray(news) &&
        news.map((n, i) => (
          <div key={n._id}>
            <h3>{i + 1}. {n.title}</h3>
            <p>{n.content}</p>
          </div>
        ))}
    </div>
  );
}