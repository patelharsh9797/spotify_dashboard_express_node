import { useEffect, useState } from "react";
import "./App.css";
import { accessToken, logout, getCurrentUserProfile } from "./spotify";
import { catchErrors } from "./utils";

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchProfile = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    };

    catchErrors(fetchProfile());
  }, []);

  return (
    <>
      <h1>Vite + React + Spotify</h1>
      <div className="card">
        {!token ? (
          <a href="http://localhost:8888/login">Login</a>
        ) : (
          <>
            <h3>Logged In Successfully</h3>
            <button onClick={logout}>Log out</button>

            {profile && (
              <>
                <h1>{profile.display_name}</h1>
                <h2>{profile.followers.total}</h2>

                {profile.images.length && profile.images[1].url && (
                  <img src={profile.images[1].url} alt="profile picture" />
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
