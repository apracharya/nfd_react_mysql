import React from 'react';


const FilmCard = ({ thumbnailSrc, title, year, category, director }) => {

  return (
    <div className="film-card">

      <div className="thumbnails">
        <img src={`http://localhost:8080/films/image/${thumbnailSrc}`} className="thumbnail-pic" alt={title} />
      </div>

      <div className="non-thumbnail">
        <div className="film-info">
          <div className="film-details">
            <div className="film-year font-small">{year}</div>
            <div className="film-genre font-small">{category?.categoryTitle.toUpperCase()}</div>
            <div className="film-director font-small">{director.toUpperCase()}</div>
          </div>
          <div className="film-name align-center">{title}</div>
        </div>
      </div>
    </div>
  );
};

export default FilmCard;
