import { redirectUrlToSpotifyForLogin } from "../spotifyFunctions";

const LoginPage = () => {
  // @TODO Write some working logic that redirects any pathname to /login
  // useEffect(() => {
  //   if (hash.split("=")[0] !== "#access_token" && pathname !== "/login") {
  //     console.log({ pathname, hash: hash.split("=")[0] });
  //     navigate("/login");
  //   }
  // }, [hash, pathname]);

  return (
    <div className="login-page">
      <div className="login-page__box">
        <h1>Spotify App</h1>
        <p>Login to see your most played tracks and artists on Spotify</p>
        <a href={redirectUrlToSpotifyForLogin()}>Continue with Spotify</a>
        <p className="login-page__credit">
          Designed and developed by Sam MacFarlane &#169; 2020
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
