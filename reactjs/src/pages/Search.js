import { useState } from "react";
import Button from "../components/Button";

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

  const handleClick = (event) => {
    event.preventDefault();
    console.log(
      "http://localhost:3001/spotify/search?q=" + encodeURIComponent(query)
    );
    fetch(`http://localhost:3001/spotify/search?q=${encodeURIComponent(query)}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setArtists(data.artists.items[0]);
        setAlbums(data.albums.items);
        setTracks(data.tracks.items);
      })
      .then(() => console.log("Artist: ", artists))
      .then(() => console.log("Albums: ", albums))
      .then(() => console.log("Tracks: ", tracks))
      .then(() => setLoading(false))

      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleClick}>
        <input type="text" name="query" onChange={handleChange} />
        <Button>Search</Button>
      </form>
      {loading ? (
        null
      ) : (
        <div>
          <div>
            <h2>Artist</h2>
            <h3>{artists.name}</h3>
            <img src={artists.images[0].url} alt={artists.name} />
            <p>{artists.genres[0]}</p>
          </div>

          <h2>Albums</h2>
          {albums.map((album) => (
            <div key={album.id}>
              <h3>{album.name}</h3>
              <img src={album.images[0].url} alt={album.name} />
            </div>
          ))}

          <h2>Tracks</h2>
          {tracks.map((track) => (
            <div key={track.id}>
              <h3>{track.name}</h3>
              <img src={track.album.images[0].url} alt={track.name} />
              <p>{track.artists[0].name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
