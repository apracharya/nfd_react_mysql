import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from '../components/SignUp'
import MainBody from '../components/main/MainBody'
import AddMovie from '../components/AddMovie'
import CreateName from '../components/CreateName'
import FilmPage from '../components/main/FilmPage'

const MyRoute = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<MainBody></MainBody>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
        <Route path='/addmovie' element={<AddMovie />}></Route>
        <Route path='/addname' element={<CreateName />}></Route>
        <Route path='/films/:id' element={<FilmPage />}></Route>
      </Routes>
    </div>
  )
}

export default MyRoute
