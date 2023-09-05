import { useEffect, useState } from "react";
import { accessToken, logout, getCurrentUserProfile } from "./spotify";
import { catchErrors } from "./utils";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import styled from "styled-components";
import { GlobalStyle } from "./styles";
import { Login } from "./pages";

const StyledLoginButton = styled.a`
  background-color: var(--green);
  color: var(--white);
  padding: 10px 20px;
  margin: 20px;
  border-radius: 30px;
  display: inline-block;
`;

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

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
      <div className="app">
        <GlobalStyle />
        {!token ? (
          <Login />
        ) : (
          <Router>
            <ScrollToTop />
            <Routes>
              <Route path="/top-artists" element={"Top artists"} />
              <Route path="/top-tracks" element={"Top tracks"} />
              <Route path="/playlists" element={"Playlist"} />
              <Route path="/playlists/:id" element={"Playlist by ID"} />
              <Route
                path="/"
                element={
                  <>
                    <h3>Logged In Successfully</h3>
                    <button onClick={logout}>Log out</button>
                    {profile && (
                      <>
                        <h1>{profile.display_name}</h1>
                        <h2>{profile.followers.total}</h2>

                        {profile.images.length && profile.images[1].url && (
                          <img
                            src={profile.images[1].url}
                            alt="profile picture"
                          />
                        )}
                      </>
                    )}
                  </>
                }
              />
            </Routes>
          </Router>
        )}
      </div>
    </>
  );
}

export default App;
