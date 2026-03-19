import axios from "axios";

// 🔥 CHANGE HERE
const API = "https://ai-news-final-1.onrender.com";

export default function Admin({ id }) {
  const token = localStorage.getItem("token");

  const del = async () => {
    try {
      await axios.delete(API + "/news/" + id, {
        headers: {
          Authorization: token
        }
      });
      alert("Deleted ✅");
    } catch {
      alert("Not authorized ❌");
    }
  };

  return <button onClick={del}>Delete</button>;
}