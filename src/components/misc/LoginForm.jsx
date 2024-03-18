// // import { isVisible } from '@testing-library/user-event/dist/utils';
// import React, { useState } from 'react';

// const LoginForm = (props) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
  

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Logic to submit login credentials, typically calling an API
//     // console.log(`Submitting login for user: ${username}, password: ${password}`);
//   };

//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   // const handleLoginVisible = ()=>{
//   //   if(loginVisible === false){
//   //     setLoginVisible(true);
//   //   } else {
//   //     setLoginVisible(false);
//   //   }
//   // }

//   return (
//     <div>
//       {/* <button onClick={handleLoginVisible}>Login</button> */}
//       <div className='login-body'>
//         <div className="login-container">
//           <div className="login-box">
//             <img src="./logo/Asset 14.png" alt="Logo" className="login-logo" />
//             <h1 className='login-welcome'>Welcome Back!</h1>
//             <form onSubmit={handleSubmit}>
//               <div className="input-box">
//                 <label htmlFor="username">Username</label>
//                 <input
//                   type="text"
//                   name="username"
//                   id="username"
//                   value={username}
//                   onChange={handleUsernameChange}
//                   required
//                 />
//               </div>
//               <div className="input-box">
//                 <label htmlFor="password">Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   id="password"
//                   value={password}
//                   onChange={handlePasswordChange}
//                   required
//                 />
//               </div>
//               <div className="checkbox-box">
//                 <input type="checkbox" id="remember-me" />
//                 <label htmlFor="remember-me">Remember me</label>
//               </div>
//               <button type="submit" className='login-button'>Login</button>
//             </form>
//             <a href='index.html' className='forgot-password'>Forgot password?</a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
  


// export default LoginForm;
