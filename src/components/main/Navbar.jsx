import React, { useEffect, useState } from 'react';
// import './Navbar.css'; // Import CSS for styling
import PropTypes from "prop-types";
// import LoginForm from '../LoginForm';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { doLogout, getCurrentUser, isLoggedIn } from '../auth/auth';
import { loadAllCategories } from '../services/category-service';

function Navbar(props) {
  const [isOpen, setIsOpen] = useState(false);

  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);

  const navigate = useNavigate();

  useEffect(()=>{
    setLogin(isLoggedIn());
    setUser(getCurrentUser());  
  } , [])

  const logout = ()=>{
    doLogout(()=>{
      setLogin(false);
      setUser(undefined);
      toast.success("User logged out");
    });
    navigate('/');
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [category, setCategory] = useState([]);
  const [keyword, setKeyword] = useState("");

  const handleKeywordChange= (e)=>{
    setKeyword(e.target.value);
    console.log(e.target.value);
  }

  const handleSearch = (e)=>{
    e.preventDefault();
    navigate(`/search/${keyword}`);
  }
  
  useEffect(()=>{
    
    // axios.get(`http://localhost:8080/category/read`)
    loadAllCategories().then((data)=>{
      setCategory(data);
    })
  }, [])


  return (
    <div>
      <nav className={`navbar navbar-expand-lg navbar-light bg-light`}>
        <div className="container-fluid">
          <NavLink to='/'>
            <button className="nav-link mx-2 mr-8" style={{width: "66px", padding: "none"}}>
              <img className="nfd-logo" src={props.logo} alt="NFD" />
            </button>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
            onClick={toggleDropdown}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ "--bs-scroll-height": "100px" }}>
              <li className="nav-item">
                <NavLink to='/'>
                  <button className="signIn-button" aria-current="page" herf="login.html">
                  Home
                  </button>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/addmovie'>
                  <button className="signIn-button" style={{width: "90px"}}>Add Movie</button>
                </NavLink>

                {/* <NavLink to='/addName'>
                  <button className="signIn-button" style={{width: "90px"}}>Add Name</button>
                </NavLink> */}
                
              </li>
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle mx-1"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded={isOpen}
                  onClick={toggleDropdown}
                >
                  Genre
                </span>
                <ul className="dropdown-menu">
                  {category?.map((item, i)=>{
                    return (<li key={i}><button onClick={()=>{navigate(`/category/${item.categoryId}`)}} className="dropdown-item">{item?.categoryTitle}</button></li>
                  )})}
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item">Something else here</button></li>
                </ul>
              </li>
              <li className="nav-item">
                <button className="nav-link disabled mx-1" aria-disabled="true">Link</button>
              </li>
            </ul>

            <form onSubmit={handleSearch} className="d-flex mx-2 my-2" role="search">
              <input className="form-control me-2"
                type="search"
                placeholder="Search" 
                aria-label="Search"
                name='search'
                id='search'
                onChange={handleKeywordChange} />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <div>
                {
                login && (
                  <>
                    <NavLink to='/user/dashboard'>
                      <button className='username-button'>
                        {user}
                      </button>
                    </NavLink>
                    
                    <NavLink>
                      <button 
                        className='signIn-button'
                        onClick={logout}>Logout</button>
                    </NavLink>
                  </>
                )}

                {
                  !login && (
                    <>
                    <NavLink to='/signin'>
                      <button className='signIn-button' /* onClick={handleLoginVisible} */>Sign In</button>
                    </NavLink>
                    <NavLink to='/signup'>
                      <button className='signIn-button'>Sign Up</button>
                    </NavLink>
                    </>
                  )
                }
              
            </div>
          </div>
        </div>
      </nav>
      {/* {loginVisible?<LoginForm visible="handleLoginVisible"/>:null} */}
    </div>
  );
}

export default Navbar;


Navbar.propTypes = {
  // name: PropTypes.string,
  genre: PropTypes.string,
};

Navbar.defaultProps = {
    name: "Name",
    genre: "Dropdown",
    thriller: "genre #7"
}
