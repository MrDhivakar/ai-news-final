import { useState } from "react";
import axios from "axios";

const API = "https://your-render-url.onrender.com";

export default function Login({ setLogged }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post(API + "/login", {
        username,
        password
      });

      localStorage.setItem("token", res.data.token);
      setLogged(true);
    } catch {
      alert("Login Failed");
    }
  };

  return (
    <div>
      <input placeholder="username" onChange={e => setUsername(e.target.value)} />
      <input type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}