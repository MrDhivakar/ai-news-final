import axios from "axios";

// 🔥 CHANGE HERE
const API = "https://ai-news-final-1.onrender.com";

export default function Login() {

  const login = async () => {
    try {
      const res = await axios.post(API + "/login", {
        username: "admin",
        password: "admin123"
      });

      localStorage.setItem("token", res.data.token);
      alert("Login success ✅");

    } catch {
      alert("Login failed ❌");
    }
  };

  return <button onClick={login}>Login</button>;
}