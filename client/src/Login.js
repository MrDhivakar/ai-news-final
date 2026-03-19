import axios from "axios";

export default function Login() {
  const login = async () => {
    const res = await axios.post("http://localhost:5000/login", {
      username: "admin",
      password: "admin123"
    });

    localStorage.setItem("token", res.data.token);
    alert("Login success");
  };

  return <button onClick={login}>Login</button>;
}