import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./Login";
import Register from "./Register";

const API = "https://your-render-url.onrender.com";

export default function App() {
  const [news, setNews] = useState([]);
  const [logged, setLogged] = useState(false);
  const [showReg, setShowReg] = useState(false);

  useEffect(() => {
    loadNews();

    if (localStorage.getItem("token")) {
      setLogged(true);
    }
  }, []);

  const loadNews = () => {
    axios.get(API + "/news").then(res => setNews(res.data));
  };

  const like = async (id) => {
    await axios.post(API + "/like/" + id);
    loadNews();
  };

  const comment = async (id) => {
    const text = prompt("Enter comment");
    await axios.post(API + "/comment/" + id, {
      text,
      user: "user"
    });
    loadNews();
  };

  return (
    <div>
      {!logged && !showReg && (
        <>
          <Login setLogged={setLogged} />
          <button onClick={() => setShowReg(true)}>Register</button>
        </>
      )}

      {showReg && <Register />}

      <h1>🟧 AI NEWS</h1>

      {news.map((n, i) => (
        <div key={n._id} className="news">
          <b>{i + 1}. {n.title}</b>
          <p>{n.content}</p>
          <button onClick={() => like(n._id)}>⬆ {n.likes}</button>
          <button onClick={() => comment(n._id)}>💬 {n.comments.length}</button>
        </div>
      ))}
    </div>
  );
}