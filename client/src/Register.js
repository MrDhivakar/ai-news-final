import { useState } from "react";
import axios from "axios";

const API = "https://your-render-url.onrender.com";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    await axios.post(API + "/register", { username, password });
    alert("Registered");
  };

  return (
    <div>
      <input placeholder="username" onChange={e => setUsername(e.target.value)} />
      <input type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={register}>Register</button>
    </div>
  );
}