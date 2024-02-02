import SpotifyIcon from "../images/SpotifyIcon.png";
import { FaSearch } from "react-icons/fa";

const Header = (props) => {
  return (
    <header style={styles.header}>
      <img style={styles.image} src={SpotifyIcon} alt="Spotify Icon" />
      <form style={styles.form}>
        <FaSearch style={styles.button} onClick={props.handleClick} />
        <input
          style={styles.input}
          type="text"
          name="query"
          onChange={props.handleChange}
          onKeyDown={props.onKeyDown}
          placeholder="Search for an artist, album, or song..."
        />
      </form>
    </header>
  );
};

export default Header;

const styles = {
  header: {
    backgroundColor: "#1DB954",
    padding: "10px",
    display: "flex",
    alignItems: "center",
  },

  form: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    paddingRight: "10px",
    backgroundColor: "transparent",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "1.5em",
  },

  input: {
    width: "300px",
    border: "0px solid #000000",
    borderColor: "white",
    backgroundColor: "transparent",
    borderBottomWidth: "1px",
    opacity: "1",
    padding: "10px",
    fontSize: "1em",
    fontWeight: "bold",
    color: "white",
  },

  image: {
    width: "50px",
  },
};
