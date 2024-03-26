
import React, { useEffect, useState } from 'react';
import { searchFilm } from '../services/film-service';
import { useNavigate, useParams } from 'react-router-dom';
import Base from './Base';
import FilmCard from '../film/FilmCard';

const Search = () => {
  const [films, setFilms] = useState([]);
  let params = useParams();
  useEffect(()=>{
    
    searchFilm(params.keyword).then((data)=>{
      console.log(data);
      setFilms(data);
    })

  }, [params.keyword]);

  const navigate = useNavigate();
  

  return (
    <Base>
      <div style={{margin: '112px', marginTop: '10px'}}>
        <div style={{color: 'black', margin: '40px 0px -30px 30px', fontSize: '25px'}}>Search result: {params.keyword}</div>
        <div className="film-grid">
          {films.map((film, i) => (
            <div key={i} onClick={()=>{navigate(`/films/${film.id}`)}}>
              <FilmCard {...film} />
            </div>
          ))}
        </div>
      </div>
    </Base>
  )
}

export default Search;