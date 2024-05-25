import { Button, Input, Label } from "reactstrap";
import "../../styles/film-review.css";
import "../../styles/rating-star.css";
import '../../styles/review-update.css'; // You can define your CSS for blur effect here


import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCurrentUser, isLoggedIn } from "../auth/auth";
import { createReview, deleteReview, updateReview } from "../services/film-service";

const Review = (props) => {

  // const navigate = useNavigate();

  const [ selectedRating, setSelectedRating ] = useState(0);

  const [ editVisible, setEditVisible ] = useState(false);

  // const [ reviewId, setReviewId ] = useState(null);

  const [ userReview, setUserReview ] = useState({
    body: "",
    filmId: props.id,
    username: getCurrentUser(),
    rating: null,
  });

  const [ reviewU, setReviewU ] = useState({
    body: "",
    filmId: props.id,
    username: getCurrentUser(),
    rating: null,
  });

  // console.log(reviewU.rating);

  // console.log(selectedRating);

  // const [reviews, setReviews] = useState(props.reviews); // State to hold reviews


  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
    setUserReview({ ...userReview, rating: rating });
  };

  
  const handleReviewChange = (e) => {
    setUserReview({
      ...userReview,
      body: e.target.value,
      rating: reviewU.rating,
    });
    // setUserReview({...userReview, [e.target.name]: e.target.value});

    // console.log(userReview);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userReview.body.trim() === "") {
      toast.error("Please fill all the fields");
      return;
    } else {
      if (isLoggedIn) {
        createReview(userReview)
          .then((response) => {
            // console.log(response);
            // navigate(`/films/${props.id}`);
            setUserReview({
              body: "",
            });
            setSelectedRating(0);
            toast.success("review created");
          })
          .catch((error) => {
            // console.log(error);
            toast.error("Something went wrong!");
          });
      } else {
        toast.success("please login");
      }
    }
  };

  console.log(props.reviews);
  console.log(getCurrentUser());
  

  const handleRatingUpdate = (rating) => {
    setSelectedRating(rating);
    setReviewU({ ...reviewU, rating: rating });
    // console.log(rating)
  }

  const handleUpdateChange = (e) => {
    setReviewU({
      ...reviewU,
      body: e.target.value,
    });
    // console.log(reviewU);
  }

  const handleUpdate = ()=>{
    updateReview(reviewU).then((response) => {
      // console.log(response);
      // navigate(`/films/${props.id}`);
      // setUserReview({
      //   body: "",
      // });
      setSelectedRating(0);
      toast.success("review updated");
    })
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
        <div style={{ fontSize: "1.5rem", paddingBottom: "1rem" }}>
          Reviews:
        </div>

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
              <span className="rating">{review.rating}/5</span>{" "}
              {/* {Math.floor(Math.random() * 3) + 3}/5 */}
              <p className="review-description">{review.body}</p>
              {getCurrentUser() === review.user.username && (
                <>
                  <Button
                    color="danger"
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to delete this review?`
                        )
                      ) {
                        deleteReview(review.id)
                          .then((response) => {
                            // console.log(response)
                            toast.success("Review deleted");
                            // navigate(`/films/${props.id}`);
                            // setReviews(reviews.filter(review => review.id !== review.id))
                            window.location.reload();
                          })
                          .catch((error) => console.log(error));
                      }
                    }}
                  >
                    Delete
                  </Button>

                  {/* update button */}
                  <Button
                    style={{ marginLeft: "10px" }}
                    color="primary"
                    onClick={() => {
                      setEditVisible(true);
                      // setReviewId(review.id);
                      setReviewU(review);
                      console.log(review);
                      console.log(review.id);
                    }}
                  >
                    Edit
                  </Button>
                </>
              )}
            </div>
          );
        })}
        {/* for creating a review */}
        <div>
          <form onSubmit={handleSubmit}>
            <Label>Rate and review:</Label>

            <div className="stars-container">
              {[1, 2, 3, 4, 5].map((rating) => (
                <span
                  key={rating}
                  name="rating"
                  className={`star ${rating <= selectedRating ? "active" : ""}`}
                  onClick={() => handleRatingClick(rating)}
                >
                  ★
                </span>
              ))}
            </div>

            <Input
              type="textarea"
              value={userReview.body}
              name="body"
              id="body"
              placeholder="Write your review here"
              // invalid={error.errors?.response?.data?.message === 'User already exists' || error.errors?.response?.data?.username
              // ? true : false}
              onChange={handleReviewChange}
            />

            <Button
              type="submit"
              color="warning"
              onClick={() => {
                // console.log(userReview)
                window.location.reload();
              }}
            >
              Submit Review
            </Button>
          </form>
        </div>

        {/* for updating the review */}
        {editVisible && (
          <div className="app">
            <div className="modal">
              <div className="modal-content" style={{maxWidth: '750px'}}>
                {/* <button onClick={toggleFormVisibility}>Close</button> */}
                <form onSubmit={handleUpdate}>
                <Label>Update review:</Label>
    
                <div className="stars-container">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <span
                      key={rating}
                      name="rating"
                      value={reviewU.rating}
                      className={`star ${rating <= selectedRating ? "active" : ""}`}
                      onClick={() => handleRatingUpdate(rating)}
                    >
                      ★
                    </span>
                  ))}
                </div>
    
                <Input
                  type="textarea"
                  value={reviewU.body}
                  name="body"
                  id="body"
                  placeholder="Write your review here"
                  // invalid={error.errors?.response?.data?.message === 'User already exists' || error.errors?.response?.data?.username
                  // ? true : false}
                  onChange={handleUpdateChange}
                />
    
                <Button
                  type="submit"
                  color="warning"
                  onClick={() => {
                    // console.log(userReview)
                    window.location.reload();
                  }}
                >
                  Update Review
                </Button>
                <Button className="ms-2" color='danger' 
                  onClick={()=>
                    setEditVisible(false)
                  }
                >
                    Close
                </Button>
              </form>
              </div>
            </div>
        </div>
        )}
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
