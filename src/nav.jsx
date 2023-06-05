import { Link } from 'react-router-dom'; 

import { useState, useEffect } from 'react';
import login from './auth';
import { logout } from './auth';

import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser


function nav(){


    const [storedUser, setStoredUser] = useState([]);

  
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
  
        setStoredUser(user);
        // ...
      } else {
        setStoredUser("");
        // User is signed out
        // ...
      }
    });
    
    useEffect(() =>{
      setStoredUser(user);
    }, []);
    return(
      <div className=" flex flex-row items-center w-full h-10 bg-orange-500 shadow-2xl z-50 fixed">
      <div className="w-40 h-100 bg-white-200"><img src="./components/img/Logo.png" alt="" />there is a img here</div>
      <div className="flex flex-row" >
        <Link to="/"><button className='w-20 h-full text-white font-bold hover:border-b-2 hover: border-purple-500 hover:bg-orange-400'>App</button></Link>
        <Link to="/home"><button className='w-20 h-full text-white font-bold hover:border-b-2 hover: border-purple-500 hover:bg-orange-400'>Profile</button></Link>
        <Link to="/chats"><button className='w-20 h-full text-white font-bold hover:border-b-2 hover: border-purple-500 hover:bg-orange-400'>Chats</button></Link>
        <Link to="/discover"><button className='w-20 h-full text-white font-bold hover:border-b-2 hover: border-purple-500 hover:bg-orange-400'>Discover</button></Link>
      </div>
      <button onClick={login}>Login</button>

      <button onClick={logout}>Logout</button>
      <div>{storedUser ? storedUser.email : "Not logged in"}</div>
    </div>
    )
}

export default nav;