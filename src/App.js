import "./App.css";
import MyRoute from "./Links/MyRoute";
import About from "./components/About";
import Navbar from "./components/Navbar";
import "./styles/Login.css";
import "./styles/add-movie.css";
import "./styles/movie-grid.css";
import "./styles/header.css";
import "./styles/texts.css";

function App() {
  const logo = './logo/Asset 15.png';

  return (
    <>
      <Navbar logo={logo}/>
      <MyRoute />
      <About logo={logo}/>
    </>
  );
}

export default App;
