import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "reactstrap";
import "../../styles/user-dashboard.css"; // Import the CSS file
import "../../styles/approve.css";
import { doLogout, getCurrentUser, isLoggedIn } from "../auth/auth";
import Base from "../main/Base";
import { deleteUser, getUser } from "../services/user-service";
import axios from "axios";
import { approveFilm, deleteFilm } from "../services/film-service";

const UserDashboard = () => {
  const navigate = useNavigate();

  const username = getCurrentUser();

  const [user, setUser] = useState({});

  const [films, setFilms] = useState([]);

  if (!isLoggedIn()) {
    navigate("/signin");
  }
  useEffect(() => {
    axios.get(`http://localhost:8080/films/read/approve`).then((response) => {
      console.log(response);
      setFilms(response.data);
    });
    getUser(username).then((data) => {
      // console.log(data);
      setUser(data);
    });
  }, [username]);

  const handleDeleteUser = () => {
    if (window.confirm(`Are you sure you want to delete user?`)) {
      deleteUser(username)
        .then((data) => {
          console.log(data);
          toast.success("User deleted");
          doLogout(() => {
            // setLogin(false);
            setUser(undefined);
            toast.success("User logged out");
            navigate("/");
          });
        })
        .catch((error) => {
          toast.error("something went wrong");
          console.log(error);
        });
    }
  };

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
    <Base>
      <div style={{ backgroundColor: "#f2f2f2" }}>
        <div className="dash-body">
          <div className="dash-container">
            <h1 className="dash-h1">User Dashboard</h1>
            <div className="user-info">
              <p>
                <label>Username:</label>{" "}
                <span id="username">{user.username}</span>
              </p>
              <p>
                <label>First Name:</label>{" "}
                <span id="firstName">{user.firstName}</span>
              </p>
              <p>
                <label>Last Name:</label>{" "}
                <span id="lastName">{user.lastName}</span>
              </p>
              <p>
                <label>Last Name:</label>{" "}
                <span id="lastName">{user.lastName}</span>
              </p>
              {user.roles && (
                <p>
                  <label>User Role:</label>{" "}
                  <span id="role">
                    {user?.roles[0]?.name === "ROLE_ADMIN" ? "Admin" : "User"}
                  </span>
                </p>
              )}
              {!user.roles && (
                <p>
                  <label>User Role:</label> <span id="role">User</span>
                </p>
              )}
            </div>
            <div className="user-role">
              {user.roles && (
                <span id="userRole">
                  {user?.roles[0]?.name === "ROLE_ADMIN" ? "Admin" : "User"}
                </span>
              )}

              {!user.roles && <span id="userRole">User</span>}
            </div>
            <NavLink to="/user/movie/add">
              <button
                className="signIn-button"
                style={{
                  width: "90px",
                  fontSize: "1rem",
                  backgroundColor: "#a4a5a6",
                }}
              >
                Add Movie
              </button>
            </NavLink>
            <NavLink to="/category/add">
              <button
                className="signIn-button"
                style={{
                  width: "120px",
                  fontSize: "1rem",
                  backgroundColor: "#a4a5a6",
                  marginLeft: "7px",
                }}
              >
                Add Category
              </button>
            </NavLink>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <NavLink to="/user/update">
                <Button
                  color="primary"
                  style={{
                    width: "90px",
                    fontSize: "1rem",
                    marginLeft: "565px",
                  }}
                >
                  Update
                </Button>
              </NavLink>

              <Button
                className="ms-2"
                color="danger"
                style={{ width: "90px", fontSize: "1rem", marginRight: "10px" }}
                onClick={handleDeleteUser}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
        {user.roles && user.roles[0]?.name === "ROLE_ADMIN" && (
          <div className="container">
            <header className="approve-header">
              <h1>Movie Approval Queue</h1>
            </header>
            <div>
              <div className="admin-dashboard">
                <main>
                  {films.length === 0 && (
                    <h2 style={{ margin: "10px 40px", fontSize: "22px" }}>
                      No films to approve
                    </h2>
                  )}
                  <div className="approve-movie-list">
                    {films
                      .filter((item, i) => {
                        return item.approved === false;
                      })
                      .map((film, i) => {
                        return (
                          <div key={i} className="approve-movie">
                            <div className="image">
                              <img
                                src={`http://localhost:8080/films/image/${film.thumbnailSrc}`}
                                alt={`${film.title}.jpg`}
                              />
                            </div>
                            <div className="approve-movie-details">
                              <h2>{film.title}</h2>
                              <p>{film.year}</p>
                              <p>Director: {film.director}</p>
                              <p>Producer: {film.producer.join(", ")}</p>
                              <p>Genre: {film.genre}</p>
                              <div className="approve-button-group">
                                <Button
                                  color="success"
                                  onClick={() => {
                                    handleApproveFilm(film.id);
                                  }}
                                >
                                  Approve
                                </Button>
                                <Button
                                  color="warning"
                                  style={{ margin: "0px 10px" }}
                                  onClick={()=>`${navigate(`/user/movie/update/${film.id}`)}`}
                                >
                                  Edit
                                </Button>
                                <Button
                                  color="danger"
                                  onClick={() => {
                                    handleDeleteFilm(film.id);
                                  }}
                                >
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                          // <div key={i} style={{border: '2px solid black', margin: "5px 10px", padding: '10px'}}>
                          //   <p>Title: {film?.title}</p>
                          //   <p>Year: {film?.year}</p>
                          //   <p>id: {film?.id}</p>
                          //   <Button color='primary' style={{width: '100px', marginRight: '5px'}}
                          //     onClick={()=>{ handleApproveFilm(film?.id)}}>
                          //     Approve
                          //   </Button>
                          //   <Button color='danger' style={{width: '100px'}}
                          //     onClick={()=>{ handleDeleteFilm(film?.id)}}>
                          //     Delete
                          //   </Button>
                          // </div>
                        );
                      })}
                  </div>
                </main>
              </div>
            </div>
          </div>
        )}
      </div>
    </Base>
  );
};

export default UserDashboard;
