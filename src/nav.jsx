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
        <div className=" flex flex-row items-center w-full h-16 backcolor">
        <img src="./components/img/Logo.png" alt="" />
        <div className="flex flex-row items-center justify-around w-full" >
            <Link to="/"><button className='w-40 h-10 text-white font-bold text-2xl backcolor_up rounded-xl hover:rounded-none hover:text-black  '>App</button></Link>
            <Link to="/home"><button className='w-40 h-10 text-white font-bold text-2xl backcolor_up rounded-xl hover:rounded-none hover:text-black  '>Profile</button></Link>
            <Link to="/chats"><button className='w-40 h-10 text-white font-bold text-2xl backcolor_up rounded-xl hover:rounded-none hover:text-black  '>Chats</button></Link>
            <Link to="/discover"><button className='w-40 h-10 text-white font-bold text-2xl backcolor_up rounded-xl hover:rounded-none hover:text-black  '>Discover</button></Link>
            <button onClick={login}>Login</button>

            <button onClick={logout}>Logout</button>
            <div>{storedUser ? storedUser.email : "Not logged in"}</div>
        </div>
      </div>
    )
}

export default nav;