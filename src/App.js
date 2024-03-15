import "./App.css";
import MyRoute from "./Links/MyRoute";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./styles/Login.css";
import "./styles/add-movie.css";
import "./styles/header.css";
import "./styles/movie-grid.css";
import "./styles/texts.css";

function App() {
  const logo = 'http://localhost:8080/films/image/Asset15.png';

  return (
    <>
      <Navbar logo={logo}/>
      <MyRoute />
      <Footer logo={logo}/>
    </>
  );
}

export default App;
