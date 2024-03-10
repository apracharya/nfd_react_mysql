import axios from 'axios'
import React, { useState } from 'react'
import '../styles/SignUp.css'
const SignUp = () => {

  const data = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: ""
  }

  const handleData = (e)=>{
    setUserData({...userData, [e.target.name]: e.target.value});
  }

  const [userData, setUserData] = useState(data);

  const handleSubmit = (e)=>{
    e.preventDefault();
    axios.post(`http://localhost:8080/users/create`, userData)
    .then((response)=>{
      console.log(response);
    });
  }

  return (
    <div className='signup-form-background'>
      <div className="signup-form-body">
        <form  className='form-signup' id="signup-form">
            <h2 >Sign Up</h2>

            <label htmlFor='firstName'>First Name:</label>
            <input value={userData.firstName} onChange={handleData}
              className='input' type="text" id="firstName" name="firstName" required />
            
            <label htmlFor='lastName'>Last Name:</label>
            <input value={userData.lastName} onChange={handleData} 
              className='input' type="text" id="lastName" name="lastName" required />

            <label htmlFor="username">Username:</label>
            <input value={userData.username} onChange={handleData}
              className='input' type="text" id="username" name="username" required />
            
            <label htmlFor="email">Email:</label>
            <input value={userData.email} onChange={handleData}
              type="email" id="email" name="email" required />
            
            <label htmlFor="password">Password:</label>
            <input value={userData.password} onChange={handleData}
              type="password" id="password" name="password" required />            

            <button onClick={handleSubmit} className='signup-button' type="submit">
              Sign Up
            </button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
