import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';
import '../../styles/user-dashboard.css'; // Import the CSS file
import { doLogout, getCurrentUser, isLoggedIn } from '../auth/auth';
import Base from '../main/Base';
import { deleteUser, getUser } from '../services/user-service';

const UserDashboard = () => {

  const navigate = useNavigate();

  const username = getCurrentUser();

  const [user, setUser] = useState({});

  if( ! isLoggedIn()){
    navigate('/signin')
  }
  useEffect(()=>{
    // axios.get(`http://localhost:8080/users/read/${username}`).then((response)=>{
    getUser(username).then((data)=>{
      // console.log(data);
      setUser(data);
    }) 
  }, [username]);

  const handleDeleteUser = ()=>{
    if (window.confirm(`Are you sure you want to delete user?`)) {
      deleteUser(username).then(data => {
        console.log(data);
        toast.success("User deleted");
        doLogout(()=>{
          // setLogin(false);
          setUser(undefined);
          toast.success("User logged out");
          navigate('/');
        });
      }).catch(error => {
        toast.error("something went wrong");
        console.log(error);
      })
    }
    
  }


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
              {
                user.roles && (
                  <span id="userRole">{user?.roles[0]?.name === 'ROLE_ADMIN' ? 'Admin' : 'User'}</span>
                )
              }

              {
                ! user.roles && (
                  <span id="userRole">User</span>
                )
              }
            </div>
            <NavLink to='/user/movie/add'>
              <button className='signIn-button' style={{width: "90px", fontSize: '1rem', backgroundColor: '#a4a5a6'}}>
                Add Movie
              </button>
            </NavLink>
            <NavLink to='/category/add'>
              <button 
                className='signIn-button' 
                style={{width: "120px", 
                    fontSize: '1rem', 
                    backgroundColor: '#a4a5a6',
                    marginLeft: '7px'}}>
                Add Category
              </button>
            </NavLink>
            
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <NavLink to='/user/update'>
                <Button
                  color='primary'
                  style={{width: "90px", fontSize: '1rem', marginLeft: '585px'}}
                >
                  Update
                </Button>
              </NavLink>

              <Button className='ms-2'
              color='danger'
              style={{width: "90px", fontSize: '1rem'}}
              onClick={handleDeleteUser}>
                Delete
              </Button>

            </div>
            

        </div>
      </div>
    </Base>
  );
};

export default UserDashboard;