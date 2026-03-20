import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./Login";

const API = "https://ai-news-final.onrender.com"; //  YOUR BACKEND

export default function App() {
  const [news, setNews] = useState([]);
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLogged(true);
    }

    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const res = await axios.get(API + "/news");
      setNews(res.data);
    } catch (err) {
      console.log("API ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  const like = async (id) => {
    await axios.post(API + "/like/" + id);
    loadNews();
  };

  //  UI FIX
  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      {!logged && <Login setLogged={setLogged} />}

      <h1 style={{ color: "orange" }}> AI NEWS</h1>

      {news.length === 0 && <p>No news found</p>}

      {news.map((n, i) => (
        <div key={n._id} className="news">
          <b>{i + 1}. {n.title}</b>
          <p>{n.content}</p>
          <button onClick={() => like(n._id)}> {n.likes}</button>
        </div>
      ))}
    </div>
  );
}