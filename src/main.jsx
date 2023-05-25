import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'; 
import App from './App.jsx'
import Home from './components/home.jsx'
import Chats from './components/chats.jsx'
import Discover from './components/discover.jsx'
import './app.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <div className=" flex flex-row items-center content-center w-full h-16 bg-orange-500 ">
      <div className="w-10"><img src="./components/img/Logo.png" alt="" /></div>
      <div className="flex flex-row items-center justify-around w-full bg-black-200" >
        <Link to="/"><button className='w-40 h-10 text-white font-bold text-2xl backcolor_up rounded-xl hover:rounded-none hover:text-black  '>App</button></Link>
        <Link to="/home"><button className='w-40 h-10 text-white font-bold text-2xl backcolor_up rounded-xl hover:rounded-none hover:text-black  '>Profile</button></Link>
        <Link to="/chats"><button className='w-40 h-10 text-white font-bold text-2xl backcolor_up rounded-xl hover:rounded-none hover:text-black  '>Chats</button></Link>
        <Link to="/discover"><button className='w-40 h-10 text-white font-bold text-2xl backcolor_up rounded-xl hover:rounded-none hover:text-black  '>Discover</button></Link>
      </div>
    </div>

      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/chats" element={<Chats/>}/>
        <Route path="/discover" element={<Discover/>}/>
      </Routes>
    </BrowserRouter>
   
  </React.StrictMode>,
)

