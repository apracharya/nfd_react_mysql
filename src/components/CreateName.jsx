// import axios from 'axios';
// import React, { useState } from 'react'
// import { ToastContainer, toast } from 'react-toastify'

// const CreateName = () => {

//   const [film, setFilm] = useState({});
//   // const [releaseDate, setReleaseDate] = useState();
//   const [title, setTitle] = useState("");
//   const [year, setYear] = useState("");
//   const [actor, setActor] = useState("");
//   const [actress, setActress] = useState("");
//   const [director, setDirector] = useState("");

//   const handleSubmit = async(e)=>{
//     e.preventDefault();
//     let data = {
//       title: title,
//       year: year,
//       actor: actor,
//       actress: actress,
//       director: director
//     };

//     try {
//       let result = await axios({
//         url: `http://localhost:8000/names`,
//         method: "POST",
//         data: data
//       });
//       setFilm(result.data.result);
//       setTitle("");
//       setYear("");
//       setActor("");
//       setActress("");
//       setDirector("");
//       toast.success("Name Created");
//     } catch (error) {
//       toast.error("Name not created");
//     }
//   }

//   return (
//     <div>
//       <ToastContainer />
//       <div className='add-film-body'>
//         <form className='add-film-form' onSubmit={handleSubmit} >
//           <h1>Lights, Camera, Action! Film Details</h1>

//           <label className='add-film-label' htmlFor="title">Movie Title:</label>
//           <input type="text" id="title" value={title} onChange={(e)=>{setTitle(e.target.value)}} name="title" required />

//           <label className='add-film-label' htmlFor="year">Release Date:</label>
//           <div className="release-date">
//             <input type="number" value={year} onChange={(e)=>{setYear(e.target.value)}} className="date-input" id="year" name="year" required />

//           </div>

//           <label className='add-film-label' htmlFor="actor">Leading Actor:</label>
//           <input type="text" id="actor" name="actor" value={actor}  onChange={(e)=>{setActor(e.target.value)}} />

//           <label className='add-film-label' htmlFor="actress">Leading Actress:</label>
//           <input type="text" id="actress" name="actress" value={actress}  onChange={(e)=>{setActress(e.target.value)}} />

//           <label className='add-film-label' htmlFor="director">Director:</label>
//           <input type="text" id="director" name="director" value={director}  onChange={(e)=>{setDirector(e.target.value)}} />

        
//           <input type="submit" value="Submit Film Details" />
//         </form>
//       </div>
//     </div>
//   )
// }

// export default CreateName