import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import MyRoute from "./Links/MyRoute";
import "./styles/Login.css";
import "./styles/add-movie.css";
import "./styles/header.css";
import "./styles/movie-grid.css";
import "./styles/texts.css";

function App() {
  // const logo = 'http://localhost:8080/films/image/Asset15.png';

  return (
    <>
      <ToastContainer />
      {/* <Base> */}
      {/* <Navbar logo={logo}/> */}
      <MyRoute />
      {/* <Footer logo={logo}/> */}
      {/* </Base> */}
    </>
  );
}

export default App;
