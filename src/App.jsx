import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'; 
import Home from './components/home.jsx'
import Chats from './components/chats.jsx'
import Discover from './components/discover.jsx'
import './app.css'

import { useState, useEffect } from 'react';
import login from './auth';
import { logout } from './auth';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, query, collection, where } from "firebase/firestore"; 
import db from './config'



function App() {

  const auth = getAuth();
  const user = auth.currentUser
  
  const [storedUser, setStoredUser] = useState([]);
  const [userUID, setuserUID] = useState([]);
  
  useEffect(() =>{
    setStoredUser(user);
  }, []);
  
  
  onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    setuserUID(uid);
    const tempU = query(collection(db, "users"), where("UID_G", "==", uid))

    if (tempU != null){
      setUser(uid);
    }

    setStoredUser(user);
      console.log(user);
  
    } else {
      setStoredUser("");
    }
  });
    
  const setUser = async(uid) =>{
    await setDoc(doc(db, "users", uid), {
      uid: uid,
    });
  }

  return (    
 
    <BrowserRouter>
    <div className=" flex flex-row items-center w-full h-10 bg-orange-500 shadow-2xl z-50 fixed">
      <div className="w-40 h-100 bg-white-200"><img src="./components/img/Logo.png" alt="" />there is a img here</div>
      <div className="flex flex-row" >
        <Link to="/"><button className='w-20 h-full text-white font-bold hover:border-b-2 hover: border-purple-500 hover:bg-orange-400'>App</button></Link>
        <Link to="/home"><button className='w-20 h-full text-white font-bold hover:border-b-2 hover: border-purple-500 hover:bg-orange-400'>Profile</button></Link>
        <Link to="/chats"><button className='w-20 h-full text-white font-bold hover:border-b-2 hover: border-purple-500 hover:bg-orange-400'>Chats</button></Link>
        <Link to="/discover"><button className='w-20 h-full text-white font-bold hover:border-b-2 hover: border-purple-500 hover:bg-orange-400'>Discover</button></Link>
        </div>
        <div className='w-2/3 flex flex-row justify-end'>
          <p className='text-white font-bold text-lg'>
            {!storedUser ? null :
              storedUser.email ? (
                <a>
                  <button className='w-20 h-full text-white font-bold hover:border-b-2 hover:border-purple-500 hover:bg-orange-400' onClick={logout}>
                    Logout
                  </button>
                </a>
              ) : (
                <a>
                  <button className='w-20 h-full text-white font-bold hover:border-b-2 hover:border-purple-500 hover:bg-orange-400' onClick={login}>
                    Login
                  </button>
                </a>
              )
            }
          </p>
        </div>
    </div>
    <div className="h-10"></div>
      <Routes>
        <Route path="/home" element={<Home user={storedUser} userUID={userUID} />}/>
        <Route path="/chats" element={<Chats/>}/>
        <Route path="/discover" element={<Discover/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
