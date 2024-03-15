import React, { useEffect, useState } from 'react';
import FilmCard from './FilmCard';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import PaginationComponent from '../PaginationComponent';

/* const films = [
  {
    thumbnailSrc: 'thumbnails/babari.jpg',
    filmTitle: 'Babari',
    filmYear: 2022,
    filmGenre: 'DRAMA',
    filmDirector: 'SURENDRA POUDEL',
  },
  {
    thumbnailSrc: 'thumbnails/bhasme.jpeg',
    filmTitle: 'Pashupati Prasad 2',
    filmYear: 2023,
    filmGenre: 'ACTION THRILL',
    filmDirector: 'DIPENDRA KHANAL',
  },
  // {
  //   thumbnailSrc: 'thumbnails/Nai_Nabhannu_La_5 poster.jpg',
  //   filmTitle: 'Nai Nabhannu La 5',
  //   filmYear: 2023,
  //   filmGenre: 'ROMANTIC',
  //   filmDirector: 'BIKASH ACHARYA',
  // },
  {
    thumbnailSrc: 'thumbnails/bijulimachine_poster.jpg',
    filmTitle: 'Bijuli Machine',
    filmYear: 2016,
    filmGenre: 'FANTASY',
    filmDirector: 'NAVIN AWAL',
  },

  {
    thumbnailSrc: 'thumbnails/Ritu_2014_poster.jpg',
    filmTitle: 'Ritu',
    filmYear: 2014,
    filmGenre: 'ROMANTIC',
    filmDirector: 'MANOJ ADHIKARI',
  },
  {
    thumbnailSrc: 'thumbnails/kabaddi_kabaddi_kabaddi_poster.jpg',
    filmTitle: 'Kabaddi Kabaddi Kabaddi',
    filmYear: 2015,
    filmGenre: 'DRAMA',
    filmDirector: 'RAM BABU GURUNG',
  },
  {
    thumbnailSrc: 'thumbnails/Intu-Mintu-London-Ma.jpg',
    filmYear: 2023,
    filmTitle: `Intu Mintu London Ma`,
    filmGenre: 'ROMANTIC',
    filmDirector: 'RENASHA BANTAWA',
  },
  {
    thumbnailSrc: 'thumbnails/Jhola_movie_poster.jpeg',
    filmTitle: 'Jhola',
    filmYear: 2023,
    filmGenre: 'DRAMA',
    filmDirector: 'YADAV BHATTARAI',
  },
  {
    thumbnailSrc: 'thumbnails/Pashupati_Prasad_poster.jpg',
    filmTitle: `Pashupati Prasad`,
    filmYear: 2016,
    filmGenre: 'DRAMA',
    filmDirector: 'DIPENDRA KHANAL',
  },
  {
    thumbnailSrc: 'thumbnails/chhadke_poster.jpg',
    filmTitle: 'Chhadke',
    filmYear: 2023,
    filmGenre: 'DRAMA',
    filmDirector: 'YAMARAJ',
  },
  {
    thumbnailSrc: 'thumbnails/ghampani_poster.jpg',
    filmTitle: 'Gham Pani',
    filmYear: 2023,
    filmGenre: 'DRAMA',
    filmDirector: 'YAMARAJ',
  },
  {
    thumbnailSrc: 'thumbnails/kabaddi_poster.jpg',
    filmTitle: 'Kabaddi',
    filmYear: 2023,
    filmGenre: 'DRAMA',
    filmDirector: 'YAMARAJ',
  },
  {
    thumbnailSrc: 'thumbnails/kabaddi_kabaddi_poster.jpg',
    filmTitle: 'Kabaddi Kabaddi',
    filmYear: 2023,
    filmGenre: 'DRAMA',
    filmDirector: 'YAMARAJ',
  },
  
  
  
  // Add additional film objects here...
]; */


const FilmGrid = () => {
  let params = useParams();
  const [films, setFilms] = useState([]);
  let page = parseInt(params.page) - 1;

  useEffect(()=>{
    axios.get(`http://localhost:8080/films/read?pageSize=10&pageNumber=${page}`)
    .then((response)=>{
      console.log(response);
      setFilms(response.data.content);
    })
  }, [page])

  let navigate = useNavigate();

  let pageNo = page + 1;

  return (
    <div>
      <div style={{margin: '40px 0 -30px 20px', fontSize: '20px'}}>Page {pageNo}</div>
      <div className="film-grid">
        {films.map((film, i) => (
          <div key={i} onClick={()=>{navigate(`/films/${film.id}`)}}>
            <FilmCard {...film} />
          </div>
        ))}
      </div>
      <PaginationComponent />
    </div>
  );
};

export default FilmGrid;
