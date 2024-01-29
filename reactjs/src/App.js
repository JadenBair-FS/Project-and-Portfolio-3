import LoginPage from "./pages/Login.js";
import SearchPage from "./pages/Search.js";
import { useEffect, useState } from "react";

function App() {
  
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    getStatus();
  }
  , []);



  const getStatus = async () => {
    const response = await fetch("http://localhost:3001/spotify/status");
    const data = await response.json();
    console.log(data.status);
    if (data.status === "connected") {
      setConnected(true);
    } else {
      setConnected(false);
    }
  };

  return (
    <div className="App">
      {connected ? <SearchPage /> : <LoginPage />}
    </div>
  );
}

export default App;
