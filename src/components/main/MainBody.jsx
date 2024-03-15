import React from 'react';
import FilmGrid from './FilmGrid';

const MainBody = () => {
  return (
    <div className="main-body">
      <div className="main-left"></div>
      <FilmGrid /> <br />
      
      <div className='main-right'></div>
    </div>
  );
};

export default MainBody;
