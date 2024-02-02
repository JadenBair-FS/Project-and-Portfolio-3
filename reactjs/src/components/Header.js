import SpotifyIcon from "../images/SpotifyIcon.png";


const Header = () => {
  return (
    <header style={styles.header}>
      <img style={styles.image} src={SpotifyIcon} alt="Spotify Icon" />
    </header>
  );
};

export default Header;

const styles = {
  header: {
    backgroundColor: "#1DB954",
    padding: "10px",
  },
  image: {
    width: "50px",
  },
};
