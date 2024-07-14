import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import NoPage from './pages/NoPage'

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path='/*' element={<NoPage/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
