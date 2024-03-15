import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import AddMovie from '../components/AddMovie'
import SignUp from '../components/SignUp'
import FilmPage from '../components/main/FilmPage'
import MainBody from '../components/main/MainBody'
import Category from '../components/main/Category'
import About from '../components/About'

const MyRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/page/1" />} />
        <Route path='/page/:page' element={<MainBody></MainBody>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
        <Route path='/addmovie' element={<AddMovie />}></Route>
        <Route path='/category/:id' element={<Category />}></Route>
        <Route path='/about-us' element={<About />}></Route>
        {/* <Route path='/addname' element={<CreateName />}></Route> */}
        <Route path='/films/:id' element={<FilmPage />}></Route>
      </Routes>
    </div>
  )
}

export default MyRoute;
