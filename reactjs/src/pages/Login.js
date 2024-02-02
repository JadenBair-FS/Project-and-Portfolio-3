import Button from "../components/Button";
import Header from "../components/Header";
import SpotifyIconGreen from "../images/SpotifyIconGreen.png";

const Login = () => {
  return (
    <section>
      <Header />
      <article style={styles.main}>
        <div style={styles.content}>
          <img style={styles.image} src={SpotifyIconGreen} alt="Spotify Icon" />
          <h2 style={styles.whiteText}>Please Login</h2>
          <p style={styles.whiteText}>
            In order to search for artists, tracks, or songs you must login to
            your Spotify account
          </p>
          <a
            href="http://localhost:3001/spotify/login"
            rel="noopener noreferrer"
          >
            <Button>Login</Button>
          </a>
        </div>
      </article>
    </section>
  );
};

export default Login;

const styles = {
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  image: {
    width: "75px",
  },
    content: {
        textAlign: "center",
    },
  whiteText: {
    color: "white",
  },
};
