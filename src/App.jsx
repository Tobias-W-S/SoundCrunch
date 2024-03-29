import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'; 
import Home from './components/home.jsx'
import Chats from './components/chats.jsx'
import Discover from './components/discover.jsx'
import Neighbour from './components/neighbour.jsx'
import Login from './components/login.jsx'
import './app.css'

import { useState, useEffect } from 'react';
import login from './auth';
import { logout } from './auth';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, query, collection, where, getDocs } from "firebase/firestore"; 
import db from './config'



function App() {

  const auth = getAuth();
  const user = auth.currentUser
  
  const [storedUser, setStoredUser] = useState([]);
  const [userUID, setuserUID] = useState();

  useEffect(() =>{
    setStoredUser(user);
    console.log('target: ' + storedUser.uid)
    checkForExistingUser(user);
  }, [user]);
  
  
  onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    setuserUID(uid);

    setStoredUser(user);
      console.log(user);
  
    } else {
      setStoredUser("");
    }
  });

  const checkForExistingUser = async (user) => {
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("uid", "==", userUID))
    );
  
    if (querySnapshot.empty) {
      await setUser(userUID, user.displayName, user.photoURL);
    }
  };
    
  const setUser = async(uid, displayName, photoURL) =>{
    await setDoc(doc(db, "users", uid), {
      uid: uid,
      displayName: displayName,
      photoURL: photoURL,
      isPrivate: true,
      bio: "This is a user of SoundCrunch",
      likes: 0,
      
    });
  }

  return (    
 
    <BrowserRouter>
    <div className=" flex flex-row items-center w-full h-10 bg-orange-500 shadow-2xl z-50 fixed">
      <div className="w-42 h-full bg-white-200 border-r-2 flex items-center justify-center"><p className='text-white'>Gemaakt door Tobias en Daan</p></div>
      <div className="flex flex-row" >
        <Link to="/home"><button className='w-20 h-full text-white font-bold hover:border-b-2 hover: border-purple-500 hover:bg-orange-400'>Profile</button></Link>        <Link to="/discover"><button className='w-20 h-full text-white font-bold hover:border-b-2 hover: border-purple-500 hover:bg-orange-400'>Discover</button></Link>
        </div>
        <div className='w-2/3 flex flex-row justify-end'>
  <p className='text-white font-bold text-lg'>
    {storedUser && storedUser.email ? (
      <>
        <button className='w-20 h-full text-white font-bold hover:border-b-2 hover:border-purple-500 hover:bg-orange-400' onClick={logout}>
          Logout
        </button>
        <span>|| </span>
        <span>{storedUser.displayName}</span> {/* Display user's display name */}
      </>
    ) : (
      <button className='w-20 h-full text-white font-bold hover:border-b-2 hover:border-purple-500 hover:bg-orange-400' onClick={login}>
        Login
      </button>
    )}
  </p>
</div>
    </div>
    <div className="h-10"></div>
      <Routes>
        <Route path="/" element={storedUser ? <Home user={storedUser} userUID={userUID} /> : <Login/>}/>
        <Route path="/home" element={storedUser ?  <Home user={storedUser} userUID={userUID} /> : <Navigate to="/" replace />}/>
        <Route path="/chats" element={<Chats/>}/>
        <Route path="/discover" element={<Discover userUID={userUID} />}/>
        <Route path="/neighbour/:userUID" element={<Neighbour />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
