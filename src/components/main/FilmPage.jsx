import React, { useEffect, useState } from 'react'
import '../../styles/film-page.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FilmPage = () => {
  let params = useParams();
  const [film, setFilm] = useState({});

  useEffect(()=>{
    axios.get(`http://localhost:8080/films/read/${params.id}`)
    .then((response)=>{
      console.log(response);
      setFilm(response.data);
    })
  })


  return (
    <div>
      <div className='film-detail-div'>
        <div className='main-flex'>
          <img className='movie-poster' src={film?.thumbnailSrc} alt={film.title} />
          <div className='movie-detail'>
            <div className='movie-name'>{film.title}</div>
            <div className="year-runtime">
              <div className='year'>{film.year}</div>
              <div className='runtime'>{film.runtime}</div>
            </div>
            <div className='movie-genre'>{film.genre?.join(", ")} and more</div>

            <div className="rating-export">
              <div className='movie-rating'>Rating {film.rating}</div>
              <button className='export-button'>
                <img src="/icons/export_icon.svg" alt="export" className='export-icon' />  
              </button>
            </div>

            <div className="movie-description">
              {film.summary}
            </div>

            <div className="movie-extra-details">
              <div style={{display: 'flex', gap: '20px'}}>
                <div>Directed by</div>
                <div>Director</div>
              </div>
              <div style={{display: 'flex', gap: '7px'}}>
                <div style={{marginRight: '5px'}}>Produced by</div>
                <div>Producer</div>
              </div>
              <div style={{display: 'flex', gap: '29px'}}>
                <div>Written by</div>
                <div>Writer</div>
              </div>
            </div>

          </div>
        </div>
        <div className='cover-div'>
          {/* <img src="/thumbnails/cover/bijulimachine_cover.jpg" alt="cover" className='movie-cover' /> */}
        </div>
      </div>
    </div>
  )
}

export default FilmPage