import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../components/Login'
import Signup from '../components/Signup'
import About from '../components/main/About'
import Category from '../components/main/Category'
import FilmPage from '../components/main/FilmPage'
import MainBody from '../components/main/MainBody'
import Search from '../components/main/Search'
import AddFilm from '../components/user-routes/AddFilm'
import UserDashboard from '../components/user-routes/UserDashboard'
import PrivateRoute from './PrivateRoute'

const MyRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/page/1" />} />
        <Route path='/page/:page' element={<MainBody></MainBody>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/signin' element={<Login></Login>}></Route>
        <Route path='/addmovie' element={<AddFilm />}></Route>
        <Route path='/category/:id' element={<Category />}></Route>
        <Route path='/about-us' element={<About />}></Route>
        <Route path='/films/:id' element={<FilmPage />}></Route>
        <Route path='/search/:keyword' element={<Search />}></Route>
        <Route path='/user' element={<PrivateRoute />}>
          <Route path='dashboard' element={<UserDashboard />}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default MyRoute;
