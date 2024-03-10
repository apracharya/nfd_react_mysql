import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
// import '../styles/add-movie.css';
import 'react-toastify/dist/ReactToastify.css';

const AddMovie = () => {

  // const [title, setTitle] = useState();
  // const [releaseDate, setReleaseDate] = useState();
  // const [year, setYear] = useState();
  // const [actor, setActor] = useState();
  // const [actress, setActress] = useState();
  // const [director, setDirector] = useState();
  // const [producers, setProducers] = useState([]);
  // const [crewMembers, setCrewMembers] = useState([]);
  
  
  const [film, setFilm] = useState({});
  const [title, setTitle] = useState();
  const [thumbnailSrc, setThumbnailSrc] = useState();
  const [year, setYear] = useState();
  const [genre, setGenre] = useState([]);
  const [runtime, setRuntime] = useState();
  const [summary, setSummary] = useState();
  const [trailerLink, setTrailerLink] = useState();
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState({});
  const [rating, setRating] = useState();
  
  const handleSumbit = async(e)=>{
    e.preventDefault();
    let data = {
      title: title,
      thumbnailSrc: thumbnailSrc,
      year: year,
      genre: genre,
      runtime: runtime,
      summary: summary,
      trailerLink: trailerLink,
      cast: cast,
      crew: crew,
      rating: rating
    };

    try {
      let result = await axios({
        url: `http://localhost:8080/films/create`,
        method: "POST",
        data: data
      });

      setFilm(result.data.result);
      setTitle("")
      setThumbnailSrc("")
      setYear("")
      setGenre([])
      setRuntime("")
      setSummary("")
      setTrailerLink("")
      setCast([])
      setCrew({})
      setRating()
      toast.success(result.data.message);
      // setTitle("");
      // setYear("");
      // setThumbnailSrc("");
      // setActress("");
      // setDirector("");
      // setProducers([]);
      // setCrewMembers([]);
    } catch(error) {
      console.log(error.message);
      toast.error("Film not created");
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className='add-film-body'>
        <form className='add-film-form' onSubmit={handleSumbit}>
          <h1>Lights, Camera, Action! Film Details</h1>

          <label className='add-film-label' htmlFor="title">Movie Title:</label>
          <input type="text" id="title" value={title} onChange={(e)=>{setTitle(e.target.value)}} name="title" required />

          <label className='add-film-label' htmlFor="year">Year:</label>
          <div className="release-date">
            <input type="number" value={year} onChange={(e)=>{setYear(e.target.value)}} className="date-input" id="year" name="year" required />
          </div>

          <label className='add-film-label' htmlFor="actor">Genre:</label>
          <input type="text" id="actor" name="actor" value={genre}  onChange={(e)=>{setGenre(e.target.value)}} />

          <label className='add-film-label' htmlFor="runtime">Runtime:(hh:h mm:m)</label>
          <input type="text" id="actress" name="runtime" value={runtime}  onChange={(e)=>{setRuntime(e.target.value)}} />

          <label className='add-film-label' htmlFor="summary">Summary:</label>
          <input type="text" id="director" name="summary" value={summary}  onChange={(e)=>{setSummary(e.target.value)}} />

          <label className='add-film-label' htmlFor="trailerLink">Trailer Link:</label>
          <textarea id="producers" name="trailerLink" rows="3" value={trailerLink} onChange={(e)=>{setTrailerLink(e.target.value)}}/>

          <label className='add-film-label' htmlFor="crew">Crew Members:</label>
          <textarea id="crewMembers" name="crew" value={crew} onChange={(e)=>{setCrew(e.target.value)}} rows="3" />
          
          <label className='add-film-label' htmlFor="cast">Cast:</label>
          <textarea id="crewMembers" name="cast" value={cast} onChange={(e)=>{setCast(e.target.value)}} rows="3" />
          
          <input type="submit" value="Submit Film Details" />
        </form>
      </div>
    </div>
  )
}

export default AddMovie
