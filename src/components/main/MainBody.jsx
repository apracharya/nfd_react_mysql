import React from 'react';
import FilmGrid from '../film/FilmGrid';
import Base from './Base';

const MainBody = () => {
  return (
    <Base>
      <div className="main-body">
        <div className="main-left"></div>
        <FilmGrid /> <br />
        
        <div className='main-right'></div>
      </div>
    </Base>
  );
};

export default MainBody;
