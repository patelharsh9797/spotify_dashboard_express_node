import { useEffect, useState } from "react";
import "./App.css";
import { accessToken, logout } from "./spotify";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
  }, []);

  return (
    <>
      <h1>Vite + React + Spotify</h1>
      <div className="card">
        {!token ? (
          <a href="http://localhost:8888/login">Login</a>
        ) : (
          <>
            <h3>"Logged In successfully"</h3>
            <button onClick={logout}>Log out</button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
