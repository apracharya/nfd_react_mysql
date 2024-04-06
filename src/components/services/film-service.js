import { myAxios, privateAxios } from "./helper";

export const createFilm = (film) => {
  return privateAxios.post(`/films/create/category/${film.categoryId}`, film).then(response => {return response.data});
}

export const updateFilm = (film) => {
  return privateAxios.put(`/films/update/${film.id}`, film).then(response => {return response.data});
}

// const user = getCurrentUser();
// const [userDetails, setUserDetails] = useState({});
// useEffect(()=>{
//   myAxios.get(`/users/read/${user}`).then(response => {
//     setUserDetails(response.data);
//   });
// }, []);


export const createReview = (userReview) => {
  return privateAxios
    .post(`/reviews/film/${userReview.filmId}/user/${userReview.username}`, userReview)
    .then(response => {return response.data});
}

export const deleteReview = (reviewId) => {
  return privateAxios.delete(`/reviews/delete/${reviewId}`).then(response => {return response.data});
}

export const updateReview = (review) => {
  return privateAxios.put(`/reviews/update/${review.id}`, review).then(response => {return response.data});
}

export const searchFilm = (keyword) => {
  return myAxios.get(`/films/search/${keyword}`).then(response => {return response.data});
}

export const uploadFilmImage = (image, filmId)=>{
  let formData = new FormData();
  formData.append("image", image);

  return privateAxios.post(`/films/image/upload/${filmId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then((response)=>response.data)
}

export const deleteFilm = (filmId) => {
  return privateAxios.delete(`/films/delete/${filmId}`).then(response => {return response.data});
}

export const approveFilm = (filmId) => {
  return privateAxios.put(`/films/approve/${filmId}`).then(response => {return response.data});
}
