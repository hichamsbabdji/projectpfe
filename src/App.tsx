import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { Toaster } from './components/ui/toaster'
import  User  from './pages/User'
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import Logs from './pages/Logs'
import Doors from "./pages/Doors"
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Toaster  />
    <BrowserRouter>
    <Routes>
      <Route path='/' element = {<Login/> } />
      <Route path='/dashboard' element={<Dashboard/>} >
      <Route index element={<Home/>}/>
      <Route path='users' element={<User/>} />
      <Route path='rooms'element={<Rooms/>}   />
      <Route path='rooms/:id' element={<Doors/>}  /> 
      <Route path='logs'  element={<Logs/>} />
      </Route>
      
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
