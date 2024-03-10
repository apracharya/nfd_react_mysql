import React from 'react'

const Header = () => {
  return (
    <div>
        <div className="header">
            <div className="header-left">
                <button className="left-1">
                    Menu</button>
                <button className="left-2">
                    <img className="nfd-logo" src="./logo/Asset 14.png" alt="NFD" />
                </button>
            </div>

            <div className="header-center">
                <div className="search-div">
                    <input className="search-bar" placeholder="Search | Movie"></input>
                </div>
                
                <button className="search-button">Search</button>
                <span className="voice-search"></span>
            </div>

            <div className="header-right"> 

                <a href="film-form.html">
                    <button className="button-header-right">Add Movie</button>
                </a>
                <a  href="login.html">
                    <button className="button-header-right">About us</button>
                </a>
                <a href="signin.html"> 
                    <button className="signIn-signUp-button">Sign In</button>
                </a>
                <a href="sign-up.html">
                    <button className="signIn-signUp-button">Sign Up</button>
                </a>
            </div>
        </div>
    </div>
  )
}

export default Header