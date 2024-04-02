import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../components/user-routes/Login'
import Signup from '../components/user-routes/Signup'
import About from '../components/main/About'
import Category from '../components/category/Category'
import FilmPage from '../components/film/FilmPage'
import MainBody from '../components/main/MainBody'
import Search from '../components/main/Search'
import AddFilm from '../components/film/AddFilm'
import UserDashboard from '../components/user-routes/UserDashboard'
import PrivateRoute from './PrivateRoute'
import AddCategory from '../components/category/AddCategory'
import UserUpdate from '../components/user-routes/UserUpdate'
import UpdateFilm from '../components/film/UpdateFilm'

const MyRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/page/1" />} />
        <Route path="/search/" element={<Navigate to="/page/1" />} />
        <Route path='/page/:page' element={<MainBody></MainBody>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/signin' element={<Login></Login>}></Route>
        <Route path='/signin' element={<Login></Login>}></Route>
        <Route path='/category/:id' element={<Category />}></Route>
        <Route path='/about-us' element={<About />}></Route>
        <Route path='/films/:id' element={<FilmPage />}></Route>
        <Route path='/category/add' element={<AddCategory />}></Route>
        <Route path='/search/:keyword' element={<Search />}></Route>
        <Route path='/user' element={<PrivateRoute />}>
          <Route path='movie/add' element={<AddFilm />}></Route>
          <Route path='movie/update/:id' element={<UpdateFilm />}></Route>
          <Route path='dashboard' element={<UserDashboard />}></Route>
          <Route path='update' element={<UserUpdate />}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default MyRoute;
