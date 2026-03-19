import axios from "axios";

const API = "http://localhost:5000";

export default function Admin({ id }) {
  const token = localStorage.getItem("token");

  const del = () => {
    axios.delete(API + "/news/" + id, {
      headers: { Authorization: token }
    });
  };

  return <button onClick={del}>Delete</button>;
}