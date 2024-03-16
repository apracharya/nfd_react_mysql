import { myAxios, privateAxios } from "./helper";

export const createFilm = (film) => {
  return privateAxios.post(`/films/create/category/${film.categoryId}`, film).then(response => {return response.data});
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

export const searchFilm = (keyword) => {
  return myAxios.get(`/films/search/${keyword}`).then(response => {return response.data});
}
