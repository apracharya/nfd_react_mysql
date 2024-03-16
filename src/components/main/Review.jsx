import { Button, Input } from "reactstrap";
import "../../styles/film-review.css";

import React, { useEffect, useState } from "react";
import { getCurrentUser, isLoggedIn } from "../auth/auth";
import { createReview } from "../services/film-service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Review = (props) => {

  const [userReview, setUserReview] = useState({
    body: "",
    filmId: props.id, 
    username: getCurrentUser()
  });

  const navigate = useNavigate();


  const handleReviewChange = (e) => {
    setUserReview({...userReview, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(userReview.body.trim() === '') {
      toast.error("Please fill all the fields");
      return;
    } else {
      if(isLoggedIn) {
        createReview(userReview).then((response) => {
          console.log(response);
          navigate(`/films/${props.id}`);
          setUserReview({
            body: ''
          })
          toast.success("review created");
        }).catch((error) => {
          console.log(error);
        });
      } else {
        toast.success("please login");
      }
    }


  }

  const handleVote = (e) => {
    const voteButton = e.target;
    const currentText = voteButton.textContent;
    const newText = currentText === "▲ Upvote" ? "Remove Vote" : "▲ Upvote";
    voteButton.textContent = newText;
  }

  return (
      <div className="review-body">
        <div className="review-container">
          <div style={{fontSize: '1.5rem', paddingBottom: '1rem'}}>Reviews:</div>
          {props.reviews.map((review, index) => {
            return (
              <div key={index} className="review">
                <h3>@{review.user.username}</h3>
                <div onClick={handleVote} className="upvote">
                  ▲ Upvote
                </div>
                <div className="stars-container">
                  <span className="star">★</span>
                </div>
                <span className="rating">{Math.floor(Math.random() * 3) + 3}/5</span>
                <p className="review-description">
                  {review.body}
                </p>
              </div>
            )
          })}

          <div>
            <form onSubmit={handleSubmit}>
              <Input type="textarea"
                value={userReview.body} 
                name="body"
                id="body"
                // invalid={error.errors?.response?.data?.message === 'User already exists' || error.errors?.response?.data?.username
                  // ? true : false}
                onChange={handleReviewChange} />
              <Button type="submit" color='warning' onClick={() => console.log(userReview)}>Submit Review</Button>
            </form>
          </div>
        </div>
      </div>
    
  );
};

export default Review;
