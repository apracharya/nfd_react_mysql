import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isLoggedIn } from '../components/auth/auth';

const PrivateRoute = () => {
  
  return  isLoggedIn() ? <Outlet /> : <Navigate to="/signin" />

}

export default PrivateRoute;