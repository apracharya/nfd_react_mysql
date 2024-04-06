import React, { useEffect, useState } from "react";
import "../../styles/approve.css";
import axios from "axios";
import { approveFilm, deleteFilm } from "../services/film-service";
import { toast } from "react-toastify";
// import './../../html/thumbnails/bijulimachine_poster.jpg'

const Approve = () => {
  const [films, setFilms] = useState([
    // {
    //   title: "Bijuli Machine",
    //   year: 2016,
    //   director: "Yamaraj",
    //   producer: ["Yamaraj 2", "Lollita Tamrakar"],
    //   genre: "Fantasy",
    //   thumbnail: `./thumbnails/bijulimachine_poster.jpg`,
    // },
    // {
    //   title: "Babari",
    //   year: 2016,
    //   director: "Yamaraj77",
    //   producer: ["Yamaraj 3", "Apurva Acharya"],
    //   genre: "Romance",
    //   thumbnail: `./thumbnails/Babari.jpg`,
    // },
  ]);

  useEffect(() => {
    axios.get(`http://localhost:8080/films/read/approve`).then((response)=>{
      console.log(response);
      setFilms(response.data);
    })
  }, []);

  const handleApproveFilm = (id) => {
    if (window.confirm(`Are you sure you want to approve this film?`)) {
      approveFilm(id)
        .then((response) => {
          console.log(response);
          toast.success("Film approved");
          setFilms(
            films.map((film) => {
              if (film.id === id) {
                film.approved = true;
              }
              return film;
            })
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleDeleteFilm = (id) => {
    if (window.confirm(`Are you sure you want to delete this film?`)) {
      deleteFilm(id)
        .then((response) => {
          console.log(response);
          toast.success("Film deleted");
          setFilms(
            films.filter((film) => {
              return film.id !== id;
            })
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };


  return (
    <div>
      <div class="admin-dashboard">
        <header className="approve-header">
          <h1>Movie Approval Queue</h1>
        </header>
        {films === null && <h1>No films to approve</h1>}
        <main>
          <div class="approve-movie-list">
            {films.map((film, i) => {
              return (
                <div key={i} class="approve-movie">
                  <div class="image">
                    <img src={`http://localhost:8080/films/image/${film.thumbnailSrc}`} alt={`${film.title}.jpg`} />
                  </div>
                  <div class="approve-movie-details">
                    <h2>{film.title}</h2>
                    <p>{film.year}</p>
                    <p>Director: {film.director}</p>
                    <p>Producer: {film.producer.join(", ")}</p>
                    <p>Genre: {film.genre}</p>
                    <div class="approve-button-group">
                      <button onClick={()=>{handleApproveFilm(film.id)}} class="approve-button">Approve</button>
                      <button className="approve-edit-button">Edit</button>
                      <button onClick={()=>{handleDeleteFilm(film.id)}} class="approve-delete-button">Delete</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Approve;
