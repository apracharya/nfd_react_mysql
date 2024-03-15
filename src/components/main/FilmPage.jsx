import React, { useEffect, useState } from 'react'
import '../../styles/film-page.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cast from '../Cast';

const FilmPage = () => {
  let params = useParams();
  const [film, setFilm] = useState({});

  useEffect(()=>{
    axios.get(`http://localhost:8080/films/read/${params.id}`)
    .then((response)=>{
      console.log(response);
      setFilm(response.data);
    })
  }, [params.id])


  return (
    <div>
      <div className='film-detail-div'>
        <div className='main-flex'>
          <img className='movie-poster' src={`http://localhost:8080/films/image/${film.thumbnailSrc}`} alt={film.title} />
          <div className='movie-detail'>
            <div className='movie-name'>{film.title}</div>
            <div className="year-runtime">
              <div className='year'>{film.year}</div>
              <div className='runtime'>{film.runtime}</div>
            </div>
            <div className='movie-genre'>{film.category?.categoryTitle} and more</div>

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
                <div>{film.director}</div>
              </div>
              <div style={{display: 'flex', gap: '7px'}}>
                <div style={{marginRight: '5px'}}>Produced by</div>
                <div>{film.producer?.join(", ")}</div>
              </div>
              <div style={{display: 'flex', gap: '10px'}}>
                <div>Cameraman</div>
                <div>{film.cameraman}</div>
              </div>
            </div>
          </div>
        </div>
        <div className='cover-div'>
          {/* <img src="/thumbnails/cover/bijulimachine_cover.jpg" alt="cover" className='movie-cover' /> */}
        </div>
      </div> <br /> <br />
      <Cast casts={film.cast}/>
    </div>
  )
}

export default FilmPage