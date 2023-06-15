import { useState, useEffect } from 'react';
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import db from '../config';

export const discover = (data) =>{
    const [users, setUsers] = useState([]);
    const [file, setFile] = useState("");
    const [files, setFiles] = useState([]);
    const storage = getStorage();

    useEffect(() => {
      getUsers();
    }, []);

    const getUsers = async() =>{
        const tempCol = query(collection(db, "users"), where("isPrivate", "==", true));
        const colSnapshot = await getDocs(tempCol);
        const usersData = colSnapshot.docs.map((doc) => doc.data());
        setUsers(usersData);
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
        <div className="min-w-full min-h-screen h-screen bg-purple-700 flex justify-center items-center">
            <div className="w-3/4 h-content bg-white rounded-lg flex flex-row h-full">
                {users.map((user) => (
                    
                    user.uid !== data.userUID ?
                <div className="w-1/3 h-96 border-4 border-orange-400">
                    <div className="h-2/3 w-full flex flex-row border-b-2 border-purple-700">
                        <div className="w-1/2 h-full">
                            <img src={user.photoURL} alt="User image" />
                        </div>
                        <div className="w-1/2 h-full"> 
                        <ul><li>{user.displayName}</li><li>{user.uid}</li><li>{user.email}</li><li>{user.providerId}</li><li>{user.emailVerified}</li></ul></div>
                    </div>
                    <div className="w-full h-1/3">
                    {files.map((url, index) => (
                                <audio key={index} controls>
                                <source src={url} type="audio/mpeg" />  
                                   Your browser does not support the audio element.
                                </audio>
                              
                            ))}
                            <input type="file" accept="audio/mpeg" onChange={handleChange}/>
                            <button onClick={() => handleUpload()}>Upload Soundbyte</button>
                    </div>
                </div>
                    : null))}
            </div>
        </div>
    )
}

export default discover