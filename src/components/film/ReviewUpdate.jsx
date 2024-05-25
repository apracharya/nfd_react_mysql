// import React, { useState } from 'react';
// import '../../styles/review-update.css'; // You can define your CSS for blur effect here

// function ReviewUpdate() {
//   const [formVisible, setFormVisible] = useState(false);

//   const toggleFormVisibility = () => {
//     setFormVisible(!formVisible);
//   };

//   return (
//     <div className="app">
//       <button onClick={toggleFormVisibility}>Show Form</button>
//       {formVisible && (
//         <div className="modal">
//           <div className="modal-content">
//             {/* <button onClick={toggleFormVisibility}>Close</button> */}
//             <form onSubmit={handleUpdate}>
//             <Label>Rate and review:</Label>

//             <div className="stars-container">
//               {[1, 2, 3, 4, 5].map((rating) => (
//                 <span
//                   key={rating}
//                   name="rating"
//                   className={`star ${rating <= selectedRating ? "active" : ""}`}
//                   onClick={() => handleRatingClick(rating)}
//                 >
//                   ★
//                 </span>
//               ))}
//             </div>

//             <Input
//               type="textarea"
//               value={userReview.body}
//               name="body"
//               id="body"
//               placeholder="Write your review here"
//               // invalid={error.errors?.response?.data?.message === 'User already exists' || error.errors?.response?.data?.username
//               // ? true : false}
//               onChange={handleReviewChange}
//             />

//             <Button
//               type="submit"
//               color="warning"
//               onClick={() => {
//                 // console.log(userReview)
//                 window.location.reload();
//               }}
//             >
//               Submit Review
//             </Button>
//           </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ReviewUpdate;
