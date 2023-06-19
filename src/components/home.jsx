import { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { getDocs, collection, query, where } from 'firebase/firestore';
import { doc, updateDoc } from "firebase/firestore";
import db from "../config";

export const Home = (data) =>{
    const [storedUser, setStoredUser] = useState([]);
    const [fetchedUser, setFetchedUser] = useState([]);
    const [file, setFile] = useState("");
    const [files, setFiles] = useState([]);
    const storage = getStorage();

    useEffect(() =>{
        setStoredUser(data.user);
        fetchBytes();
        getUser();
    }, [data.user]);

   

    const changePrivacy = (privacySetting) =>{
        const docRef = doc(db, "users", storedUser.uid);

        const data = {
            isPrivate : privacySetting,
        }; 

        updateDoc(docRef, data)
        .then(docRef => {
            console.log("Changed preference");
        })
        .catch(error =>{
            console.log(error);
        })
    }

    const getUser = async() =>{
        const tempCol = query(collection(db, "users"), where("uid", "==", storedUser.uid));
        const colSnapshot = await getDocs(tempCol);
        const usersData = colSnapshot.docs.map((doc) => doc.data());
        setFetchedUser(usersData[0]);
    }

    const handleChange = (event) =>{
        setFile(event.target.files[0]);
    }

    const handleUpload = () =>{
        const storageRef = ref(storage, `bytes/${data.userUID}/${file.name}`);
        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded soundbyte!');
            fetchBytes();
        });
    }

    const fetchBytes = async () =>{
        const storageRef = ref(storage, `bytes/${data.userUID}/`);
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
                            <img className='w-full' src={storedUser ? storedUser.photoURL : ""} alt="Profile pick"/>
                            </div>
                        </div>
                        <div className="h-full w-2/3 border-r-4">
                            <ul className="h-3/4 flex flex-col justify-around  ">
                                <li className="font-semibold text-xl border-b-2 border-red-100">{storedUser ? storedUser.displayName : "Not logged in"}</li>
                                <li>{storedUser ? storedUser.email : "Not logged in"}</li>
                                <li>...LISTENS...</li>
                                <li>...SONGS...</li>
                                <li>Total Likes: {fetchedUser ? fetchedUser.likes : "Not logged in"}</li>
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
                            <input type="file" accept="audio/mpeg" onChange={handleChange}/>
                            <button className='bg-green-300 w-1/2 rounded-xl text-white hover:bg-green-600 h-12' onClick={() => handleUpload()}>Upload Soundbyte</button>
                        </div>
                    </div>
                    <div className="flex flex-row h-96 w-full justify-around p-4">
                        <div className="w-1/2 h-full border-r-2">
                        <h2>BIO:</h2>
                        
                        <p>{fetchedUser ? fetchedUser.bio : "Not logged in"}</p>
                        <p>{storedUser ? storedUser.displayName : "Not logged in"}</p>

                        <input type="text" name='BioChange' id='BioChange' />
                        <button onClick={() => changeBio(BioChange)}></button>
                        </div>
                        <div className="w-1/3 h-full flex flex-col justify-evenly">
                        <button className='w-42 h-10 bg-green-400 rounded-xl hover:bg-green-300' onClick={() => changePrivacy(true)}>Make account private</button>
                        <button className='w-42 h-10 bg-red-400 rounded-xl hover:bg-red-300' onClick={() => changePrivacy(false)}>Make account public</button>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Home