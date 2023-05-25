import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'; 
import App from './App.jsx'
import Home from './components/home.jsx'
import './app.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <div className=" flex flex-row items-center w-full h-16 backcolor">
      <img src="./components/img/Logo.png" alt="" />
      <div className=" w-30 flex flex-row items-center justify-around w-80" >
        <Link to="/"><button className='w-20 h-10 text-white font-bold text-2xl backcolor_up rounded-xl hover:rounded-none hover:text-black  '>Home</button></Link>
        <Link to="/home"><button className='w-20 h-10 text-white font-bold text-2xl backcolor_up rounded-xl hover:rounded-none hover:text-black  '>HMR</button></Link>
      </div>
    </div>

      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
   
  </React.StrictMode>,
)

