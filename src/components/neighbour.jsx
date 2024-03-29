import { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { getDocs, collection, query, where } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import db from '../config'

export const Home = () =>{
    const { userUID } = useParams();
    const [storedUser, setStoredUser] = useState([]);
    const [files, setFiles] = useState([]);
    const storage = getStorage();

    useEffect(() =>{
        getUser();
        fetchBytes();
    }, [userUID]);

    const getUser = async() =>{
        const tempCol = query(collection(db, "users"), where("uid", "==", userUID));
        const colSnapshot = await getDocs(tempCol);
        const usersData = colSnapshot.docs.map((doc) => doc.data());
        setStoredUser(usersData[0]);
    }

    const fetchBytes = async () =>{
        const storageRef = ref(storage, `bytes/${userUID}/`);
        const result = await listAll(storageRef);

        const urlPromises = result.items.map((soundRef) =>
            getDownloadURL(soundRef));

            Promise.all(urlPromises).then((urls) => {
                setFiles(urls);
            }).catch((error) => {
                console.error("Error fetching file URLs:", error);
            });
    }

    return(
        <div className="min-w-full min-h-screen bg-purple-700 flex justify-center items-center">
                <div className="h-10"></div>
                <div className="w-3/4 h-content bg-white rounded-lg flex flex-col ">
                    <div className="flex flex-row h-96 w-full p-4">
                        <div className="w-96 h-full flex items-center justify-center">
                            <div className="w-3/4 h-3/4 ">
                            <img  className='w-full' src={storedUser ? storedUser.photoURL : ""} alt="Profile pick"/>
                            </div>
                        </div>
                        <div className="h-full w-2/3 border-r-4">
                            <ul className="h-3/4 flex flex-col justify-start  ">
                                <li className="font-semibold text-xl border-b-2 border-red-100">{storedUser ? storedUser.displayName : "Not logged in"}</li>
                                <li>{storedUser ? storedUser.email : "Not logged in"}</li>
                                <li>Total Likes: {storedUser.likes}</li>
                            </ul>
                        </div>
                        <div className="h-full w-1/4 flex flex-col justify-start">
                            <p className="font-semibold text-xl">Top SONGS:</p>
                            {files.map((url, index) => (
                                <audio key={index} controls>
                                    <source src={url} type="audio/mpeg" />  
                                   Your browser does not support the audio element.
                                </audio>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-row h-96 w-full justify-around p-4">
                        <div className="w-1/2 h-full border-r-2">
                        <h2>BIO:</h2>
                        <p>{storedUser ? storedUser.bio : "Not logged in"}</p>
                       </div>
                        <div className="w-1/3 h-full  flex flex-col">
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Home