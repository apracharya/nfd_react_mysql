import React from 'react';


const FilmCard = ({ thumbnailSrc, title, year, genre, crew }) => {
  
  return (
    <div className="film-card">
      {/* <NavLink to="/movies/bijuli-machine"> */}
        <div className="thumbnails">
          <img src={thumbnailSrc} className="thumbnail-pic" alt={title} />
        </div>
      {/* </NavLink> */}
      <div className="non-thumbnail">
        <div className="film-info">
          <div className="film-details">
            <div className="film-year font-small">{year}</div>
            <div className="film-genre font-small">{genre[1].toUpperCase()}</div>
            <div className="film-director font-small">{crew?.director.toUpperCase()}</div>
          </div>
          <div className="film-name align-center">{title}</div>
        </div>
      </div>
    </div>
  );
};

export default FilmCard;
