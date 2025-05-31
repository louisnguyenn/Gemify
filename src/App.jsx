import './App.css'
import './sidebar.css'
import { useState, useEffect } from "react";
import { FormControl, InputGroup, Container, Button, Row, Card } from "react-bootstrap";
import SongAnalysisSidebar from './components/SongAnalysisSidebar';

const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    let auth = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" + clientId + "&client_secret=" + clientSecret,
    };

    fetch("https://accounts.spotify.com/api/token", auth)
      .then((result) => result.json())
      .then((data) => {
        setAccessToken(data.access_token);
      });
  }, []);

  async function search() {
    let artist = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    const artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
      artist
    )
      .then((result) => result.json())
      .then((data) => {
        return data.artists.items[0].id;
      });

    await fetch(
      "https://api.spotify.com/v1/artists/" + artistID + "/albums?include_groups=album&market=US&limit=50",
      artist
    )
      .then((result) => result.json())
      .then((data) => {
        setAlbums(data.items)
      });
  }

  async function clear() {
    setAlbums([]);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  const handleClick = () => {
    search();
  };

  const clearAlbums = () => {
    clear();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="App">
      <button className="sidebar-toggle" onClick={toggleSidebar} title="Toggle Sidebar">
        <span className="material-symbols-rounded">
          {isSidebarOpen ? 'dock_to_right' : 'dock_to_left'}
        </span>
      </button>

      <SongAnalysisSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <h1>Welcome to Gemify</h1>
      <Container>
        <InputGroup>
          <FormControl
            placeholder="Search for an artist"
            type="input"
            aria-label="Search for an artist"
            value={searchInput}
            onKeyDown={handleKeyDown}
            onChange={(event) => setSearchInput(event.target.value)}
            style={{
              width: "540px",
              height: "40px",
              borderWidth: "0px",
              borderStyle: "solid",
              borderRadius: "10px",
              marginRight: "10px",
              paddingLeft: "10px",
              fontSize: "16px",
            }}
          />
          <Button onClick={handleClick}>Search</Button>
          <Button onClick={clearAlbums} style={{ marginLeft: "10px" }}>Clear</Button>
        </InputGroup>
      </Container>

      <Container>
        <Row style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignContent: "center",
        }}>
          {albums.map((album) => {
            return (
              <Card
                key={album.id}
                className="album-card"
                onClick={() => window.open(album.external_urls.spotify, "_blank")}
                style={{
                  backgroundColor: "#1c1c1c",
                  marginTop: "100px",
                  margin: "30px",
                  borderRadius: "5px",
                  marginBottom: "30px",
                }}
              >
                <Card.Img
                  width={200}
                  src={album.images[0].url}
                  style={{
                    borderRadius: "4%",
                  }}
                />
                <Card.Body>
                  <Card.Title
                    style={{
                      whiteSpace: "wrap",
                      fontWeight: "bold",
                      maxWidth: "200px",
                      fontSize: "18px",
                      marginTop: "10px",
                      color: "white",
                    }}
                  >
                    {album.name}
                  </Card.Title>
                  <Card.Text style={{ color: "white" }}>
                    Release Date: <br />{album.release_date}
                    <br /><br />
                    Tracks: {album.total_tracks}
                  </Card.Text>
                </Card.Body>
              </Card>
            )
          })}
        </Row>
      </Container>
    </div>
  );
}

export default App;
