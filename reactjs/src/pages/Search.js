import { useState } from "react";
import Header from "../components/HeaderSearch";
import SpotifyIconGreen from "../images/SpotifyIconGreen.png";

const Search = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);

  const handleChange = (event) => {
    setQuery(event.target.value);
    console.log(query);
  };

  const fetchSearch = async () => {
    fetch(`http://localhost:3001/spotify/search?q=${encodeURIComponent(query)}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setArtists(data.artists.items);
        setAlbums(data.albums.items);
        setTracks(data.tracks.items);
      })
      .then(() => console.log("Artist: ", artists))
      .then(() => console.log("Albums: ", albums))
      .then(() => console.log("Tracks: ", tracks))
      .then(() => setLoading(false))

      .catch((err) => console.log(err));
  };

  const handleClick = (event) => {
    event.preventDefault();
    console.log(
      "http://localhost:3001/spotify/search?q=" + encodeURIComponent(query)
    );
    fetchSearch();
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      fetchSearch();
    }
  };

  return (
    <section style={styles.main}>
      <Header
        handleChange={handleChange}
        handleClick={handleClick}
        onKeyDown={handleKeyPress}
      />
      {loading ? (
        <div style={styles.content}>
          <img
            style={styles.spotifyIcon}
            src={SpotifyIconGreen}
            alt="Spotify Icon"
          />
          <h1 style={styles.headingText}>No Results</h1>
          <p style={styles.whiteText}>
            Please type in a search query to get started...
          </p>
        </div>
      ) : (
        <article>
          <div style={styles.viewRow}>
            <h1 style={styles.headingText}>Artists:</h1>
            {artists.map((artist) => (
              <div key={artist.id}>
                <a
                  style={styles.box}
                  href={artist.external_urls.spotify}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    style={styles.image}
                    src={artist.images[0].url}
                    alt={artist.name}
                  />
                  <h3 style={styles.imageText}>{artist.name}</h3>
                </a>
              </div>
            ))}
          </div>
          <div style={styles.viewRow}>
            <h1 style={styles.headingText}>Albums:</h1>
            {albums.map((album) => (
              <div key={album.id}>
                <a
                  style={styles.box}
                  href={album.external_urls.spotify}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    style={styles.image}
                    src={album.images[0].url}
                    alt={album.name}
                  />
                  <h3 style={styles.imageText}>{album.name}</h3>
                </a>
              </div>
            ))}
          </div>
          <div style={styles.viewRow}>
            <h1 style={styles.headingText}>Songs:</h1>
            {tracks.map((track) => (
              <div key={track.id}>
                <a
                  style={styles.box}
                  href={track.external_urls.spotify}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    style={styles.image}
                    src={track.album.images[0].url}
                    alt={track.name}
                  />
                  <h3 style={styles.imageText}>{track.name}</h3>
                </a>
              </div>
            ))}
          </div>
        </article>
      )}
    </section>
  );
};

export default Search;

const styles = {
  main: {
    minHeight: "100vh",
  },

  viewRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    width: "80%",
    margin: "auto",
  },

  headingText: {
    color: "white",
    fontSize: "1.5em",
  },

  whiteText: {
    color: "white",
  },

  image: {
    width: "60%",
    height: "60%",
  },

  imageText: {
    color: "white",
  },

  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textDecoration: "none",
  },

  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },

  spotifyIcon: {
    width: "75px",
  },
};
