import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';
import '../../styles/film-page.css';
import { getCurrentUser } from '../auth/auth';
import Base from '../main/Base';
import { deleteFilm } from '../services/film-service';
import { getUser } from '../services/user-service';
import Cast from './Cast';
import FilmCard from './FilmCard';
import Review from './Review';

const FilmPage = () => {
  let params = useParams();
  const [film, setFilm] = useState({});
  const [films, setFilms] = useState([]);
  const [reviews, setReviews] = useState([]);
  // const [currentUser, setCurrentUser] = useState({});
  const [userRole, setUserRole] = useState([]);

  const [filmCategory, setFilmCategory] = useState(1);
  
  useEffect(()=>{
    
    getUser(getCurrentUser()).then((response)=>{
      // console.log(response);
      setUserRole(response?.roles);
      // console.log(userRole);
    }).catch((error)=>{
    })
    axios.get(`http://localhost:8080/films/read/${params.id}`)
    .then((response)=>{
      console.log(response);
      setFilm(response.data);
      setReviews(response.data.reviews);
      setFilmCategory(response.data.category?.categoryId);
    })
    axios.get(`http://localhost:8080/films/read/category/${filmCategory}`)
    .then((response)=>{
      // console.log(response);
      setFilms(response.data);
    }).catch((error)=>{
      console.log(error);
    })
  }, [params.id, filmCategory])

  const navigate = useNavigate();

  const handleDelete = (e)=>{
    if (window.confirm(`Are you sure you want to delete this film?`)) {
      e.preventDefault();
      deleteFilm(params.id).then((response)=>{
        // console.log(response);
        navigate('/');
        toast.success("Film deleted successfully");
      }).catch((error)=>{
        console.log(error);
      })
    }
  }


  return (
    <Base>
      {/* {JSON.stringify(currentUser)} */}
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
              <div className='movie-rating'>Rating {Math.round(film.rating * 10.0) / 10.0}</div>
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
        
        <div style={{position: 'relative'}}>
          {
            userRole.length === 1 && (
              <span style={{position: 'absolute', left: '80%', bottom: '15px', zIndex: 10}}>
                <NavLink to={`/user/movie/update/${params.id}`}>
                  <Button color="primary" style={{marginTop: '5px', marginRight: '15px', minWidth: '120px'}} >
                    Update Film
                  </Button>
                </NavLink>
                <Button color="danger" 
                  style={{marginTop: '5px', minWidth: '120px'}}
                  onClick={handleDelete}>
                  Delete Film
                </Button>
                
              </span>
            )
          }
        </div>
      </div> <br />
      {
        film.trailerLink !== (null || "") && (
          <span style={{display: 'inline-block', marginLeft: '30px'}}>
            <iframe width='700px' title='trailer'
              height='400px' 
              src={film.trailerLink}
            >
            </iframe>
          </span>
        )
      }
      <Cast title={film.title} casts={film.cast}/>
      <Review id={params.id} title={film.title} reviews={reviews}/>
      <div>
        {/* <div>You may also like</div> */}
        
        <div style={{margin: '100px', marginTop: '-10px'}}>
          <div style={{color: 'black', margin: '30px 0px -30px 30px', fontSize: '25px'}}>
          You may also like
          </div>
          <div className="film-grid">
            {films.slice(0, 5).map((film, i) => (
              String(film.id) !== String(params.id) && ( // this could cause a bug
                <div key={i} onClick={()=>{
                  navigate(`/films/${film.id}`)
                  window.scrollTo(0, 0)
                }}>
                  <FilmCard {...film} />
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </Base>
  )
}

export default FilmPage
