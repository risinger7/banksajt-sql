
import { Route, Routes } from "react-router-dom"
import './App.css'

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Accounts from './pages/Accounts'

export const PORT = 3003

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>     
        <Route path="/accounts" element={<Accounts />}></Route>  
      </Routes>
    </div>
  )
}

export default App
