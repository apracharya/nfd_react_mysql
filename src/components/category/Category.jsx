import React, { useEffect, useState } from 'react'
import FilmCard from '../film/FilmCard';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Base from '../main/Base';

const Category = () => {
  let params = useParams();
  const [films, setFilms] = useState([]);

  useEffect(()=>{
    axios.get(`http://localhost:8080/films/read/category/${params.id}`)
    .then((response)=>{
      // console.log(response);
      setFilms(response.data);
    })
  }, [params.id]);

  let navigate = useNavigate();

  return (
    <Base>
      <div style={{margin: '112px', marginTop: '10px'}}>
        <div style={{color: 'black', margin: '40px 0px -30px 30px', fontSize: '25px'}}>Genre: {films[0]?.category?.categoryTitle}</div>
        <div className="film-grid">
          {films.map((film, i) => (
            <div key={i} onClick={()=>{navigate(`/films/${film.id}`)}}>
              <FilmCard {...film} />
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
}

export default Category