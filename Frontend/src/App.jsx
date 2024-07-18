import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Games from './pages/Games/Games'
import Quiz from './pages/Quiz/Quiz'
import Capture from './pages/Capture/Capture'
import Contact from './pages/Contact/Contact'
import QNA from './pages/QNA/QNA'
import Guessing from './pages/Gamecontents/Guessing/Guessing'
import Slidepuzzle from './pages/Gamecontents/Slidepuzzle/Slidepuzzle'
import Memory from './pages/Gamecontents/Memory/Memory'
import Mole from './pages/Gamecontents/Mole/Mole'


const App = () => {
  return (
    <div className='app'>
      <Navbar/>
       {/* <Home/>  */}
       
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/games' element={<Games/>} />
        <Route path='/quiz' element={<Quiz/>} />
        <Route path='/capture' element={<Capture/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/qna' element={<QNA/>} />
        <Route path='/guessing' element={<Guessing/>} />
        <Route path='/slidepuzzle' element={<Slidepuzzle/>} />
        <Route path='/memory' element={<Memory/>} />
        <Route path='/mole' element={<Mole/>} />
      </Routes>
    </div>
  )
}

export default App
