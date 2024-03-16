import React from 'react'
import Navbar from './Navbar';
import Footer from '../Footer';

const Base = ({title="", children}) => {
  const logo = 'http://localhost:8080/films/image/Asset15.png';
  return (
    <div>
      <Navbar logo={logo}/>
      <div>
        {children}
      </div>

      <Footer logo={logo}/>

    </div>
  )
}

export default Base