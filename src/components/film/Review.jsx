import { Button, Input, Label } from "reactstrap";
import "../../styles/film-review.css";
import "../../styles/rating-star.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCurrentUser, isLoggedIn } from "../auth/auth";
import { createReview, deleteReview } from "../services/film-service";

const Review = (props) => {

  const [selectedRating, setSelectedRating] = useState(0);

  const [userReview, setUserReview] = useState({
    body: "",
    filmId: props.id, 
    username: getCurrentUser(),
    rating: null
  });
  

  // console.log(selectedRating);

  // const [reviews, setReviews] = useState(props.reviews); // State to hold reviews

  const navigate = useNavigate();

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
    setUserReview({...userReview, rating: rating})
  };

  const handleReviewChange = (e) => {
    setUserReview({...userReview, body: e.target.value, rating: selectedRating})
    // setUserReview({...userReview, [e.target.name]: e.target.value});
    
    console.log(userReview);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(userReview.body.trim() === '') {
      toast.error("Please fill all the fields");
      return;
    } else {
      if(isLoggedIn) {
        createReview(userReview).then((response) => {
          // console.log(response);
          navigate(`/films/${props.id}`);
          setUserReview({
            body: ''
          })
          toast.success("review created");
        }).catch((error) => {
          toast.error("Something went wrong!")
        });
      } else {
        toast.success("please login");
      }
    }
  }

  // const handleVote = (e) => {
  //   const voteButton = e.target;
  //   const currentText = voteButton.textContent;
  //   const newText = currentText === "▲ Upvote" ? "Remove Vote" : "▲ Upvote";
  //   voteButton.textContent = newText;
  // }


  return (
      <div className="review-body">
        {/* {JSON.stringify(userReview)} */}
        {/* {JSON.stringify(reviews)} */}
        <div className="review-container">
          <div style={{fontSize: '1.5rem', paddingBottom: '1rem'}}>Reviews:</div>
          {props.reviews.map((review, index) => {
            return (
              <div key={index} className="review">
                <h3>@{review.user.username}</h3>
                {/* <div onClick={handleVote} className="upvote">
                  ▲ Upvote
                </div> */}
                <div className="stars-container">
                  <span className="star">★</span>
                </div>
                <span className="rating">{review.rating}/5</span> {/* {Math.floor(Math.random() * 3) + 3}/5 */}
                <p className="review-description">
                  {review.body}
                </p>

                {
                  getCurrentUser() === review.user.username && (
                    <Button 
                      color="danger"
                      onClick={() => deleteReview(review.id)
                        .then((response) => {
                          console.log(response)
                          toast.success("Review deleted")
                          navigate(`/films/${props.id}`)
                          // setReviews(reviews.filter(review => review.id !== review.id))
                        })
                        .catch((error) => console.log(error))
                      }
                    >
                      Delete
                    </Button>
                  )
                }
              </div>
            )
          })}

          <div>
            <form onSubmit={handleSubmit}>

            <Label>Rate and review:</Label>
                
              <div className="stars-container">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <span
                  key={rating}
                  name="rating"
                  className={`star ${rating <= selectedRating ? 'active' : ''}`}
                  onClick={() => handleRatingClick(rating)}
                  >
                    ★
                  </span>
                ))}
              </div>

              <Input type="textarea"
                value={userReview.body}
                name="body"
                id="body"
                placeholder="Write your review here"
                // invalid={error.errors?.response?.data?.message === 'User already exists' || error.errors?.response?.data?.username
                  // ? true : false}
                onChange={handleReviewChange}
              />
                
              <Button type="submit" color='warning' onClick={() => console.log(userReview)}>Submit Review</Button>
            </form>
          </div>
        </div>
      </div>
    
  );
};

export default Review;


/* {[...Array(5)].map((_, index) => (
  <FormGroup check inline key={index}>
    <Label check>
      <Input
        type="radio"
        id="rating"
        name="rating"
        value={index + 1}
        checked={userReview.rating === index + 1}
        onChange={handleReviewChange}
      />{' '}
      {index + 1} star
    </Label>
  </FormGroup>
))} */
/* <input type="select" name="rating" id="rating" placeholder="Rating" /> */