
import { useState, useEffect } from 'react';
import login from './auth';
import { logout } from './auth';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser



function App() {

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
  

  return (    
      <div>
        <button onClick={login}>Login</button>
        <br></br>
        <button onClick={logout}>Logout</button>
        <div>{storedUser ? storedUser.email : "Not logged in"}</div>
      </div>
  )
}

export default App
