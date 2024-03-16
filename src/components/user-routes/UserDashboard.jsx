import React, { useEffect, useState } from 'react';
import '../../styles/user-dashboard.css'; // Import the CSS file
import Base from '../main/Base';
import axios from 'axios';
import { getCurrentUser, isLoggedIn } from '../auth/auth';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {

  const navigate = useNavigate();

  const username = getCurrentUser();

  const [user, setUser] = useState({});

  if( ! isLoggedIn()){
    navigate('/signin')
  }
  useEffect(()=>{
    axios.get(`http://localhost:8080/users/read/${username}`).then((response)=>{
      console.log(response);
      setUser(response.data);
    }) 
  }, [username]);


  return (
    <Base>  
      <div className="dash-body">
        <div className="dash-container">
            <h1 className="dash-h1">User Dashboard</h1>
            <div className="user-info">
                <p><label>Username:</label> <span id="username">{user.username}</span></p>
                <p><label>First Name:</label> <span id="firstName">{user.firstName}</span></p>
                <p><label>Last Name:</label> <span id="lastName">{user.lastName}</span></p>
                <p><label>Last Name:</label> <span id="lastName">{user.lastName}</span></p>
                {
                  user.roles && (
                    
                    <p><label>User Role:</label> <span id="role">{
                      user?.roles[0]?.name === 'ROLE_ADMIN' ? 'Admin' : 'User'
                    }</span></p>
                  )
                }
                {
                  ! user.roles && (
                    <p><label>User Role:</label> <span id="role">User</span></p>
                  
                  )
                }
            </div>
            <div className="user-role">
                <span id="userRole">Admin</span>
            </div>
        </div>
      </div>
    </Base>
  );
};

export default UserDashboard;