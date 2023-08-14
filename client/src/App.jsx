import { useEffect } from "react";
import "./App.css";
import Axios from "./utils/api";

function App() {
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const refreshToken = urlParams.get("refresh_token");

    console.log("refreshToken", refreshToken);

    if (refreshToken) {
      Axios.get(`/refresh_token?refresh_token=${refreshToken}`)
        .then((res) => console.log("data", res.data))
        .catch((err) => console.log("error", err));
    }
  }, []);

  return (
    <>
      <h1>Vite + React + Spotify</h1>
      <div className="card">
        <a href="http://localhost:8888/login">Login</a>
      </div>
    </>
  );
}

export default App;
