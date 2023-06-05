import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'; 
import App from './App.jsx'
import Nav from './nav.jsx'
import Home from './components/home.jsx'
import Chats from './components/chats.jsx'
import Discover from './components/discover.jsx'
import './app.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  
    <BrowserRouter>
    <Nav/>
    <div className="h-10"></div>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/test" element={<App/>} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/chats" element={<Chats/>}/>
        <Route path="/discover" element={<Discover/>}/>
      </Routes>
    </BrowserRouter>
   
  </React.StrictMode>,
)

