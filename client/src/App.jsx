import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Automation from './subpages/Automation'
import Summarization from './subpages/Summarization'
import Plagiarism from './subpages/Plagiarism'


const App = () => {

  return (<>
   <BrowserRouter>
   <Routes>
    <Route index element={<Login/>}/>
    <Route path='/Register' element={<Register/>}/>
    <Route path='/Home' element={<Home/>}/>
    <Route path='/Automation' element={<Automation/>}/>
    <Route path='/Summarization' element={<Summarization/>}/>
    <Route path='/Plagiarism' element={<Plagiarism/>}/>
    </Routes>
    </BrowserRouter>
  </>
   
  )
}

export default App
