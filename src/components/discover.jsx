import { useState, useEffect } from 'react';
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import db from '../config';

export const discover = (data) =>{
    const [users, setUsers] = useState([]);

    useEffect(() => {
      getUsers();
    }, []);

    const getUsers = async() =>{
        const tempCol = query(collection(db, "users"), where("isPrivate", "==", true));
        const colSnapshot = await getDocs(tempCol);
        const usersData = colSnapshot.docs.map((doc) => doc.data());
        setUsers(usersData);
    }

    return(
        <div className="min-w-full min-h-screen h-screen bg-purple-700 flex justify-center items-center">
            <div className="w-3/4 h-content bg-white rounded-lg flex flex-row h-full">
                <ul>
                    {users.map((user) => (
                    user.uid !== data.userUID ?
                        <li key={user.uid}>
                            <img src={user.photoURL} />
                            <h3>{user.displayName}</h3>
                        </li>
                    : null))}
                </ul>
            </div>
        </div>
    )
}

export default discover