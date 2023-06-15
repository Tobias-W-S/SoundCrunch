import { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

export const Home = (data) =>{
    const [storedUser, setStoredUser] = useState([]);
    const [file, setFile] = useState("");
    const [files, setFiles] = useState([]);
    const storage = getStorage();

    useEffect(() =>{
        setStoredUser(data.user);
        fetchBytes();
    }, [data.user]);
    
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
                            <img src={storedUser ? storedUser.photoURL : ""} alt="Profile pick"/>
                            </div>
                        </div>
                        <div className="h-full w-2/3 border-r-4">
                            <ul className="h-3/4 flex flex-col justify-around  ">
                                <li className="font-semibold text-xl border-b-2 border-red-100">{storedUser ? storedUser.displayName : "Not logged in"}</li>
                                <li>{storedUser ? storedUser.email : "Not logged in"}</li>
                                <li>...LISTENS...</li>
                                <li>...SONGS...</li>
                                <li>...LIKES...</li>
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
                        <p>Grunt: [Addressing the Master Chief in IWHBYD easter-egg] Hey, Demon! The Jerk-Store called, and they're all out of you! Poor you; stolen at the age of six and conscripted into the military. Boo-hoo! [looking scared] Okay look, if you let me live, I got the fist of Rukh! [startled yelp] I'll be on the bottom! I'll polish your boots, I'll polish your helmet! [delirous giggle] It's the gas! When I'm on the gas I don't know what I'm doing half the time.</p>
                        </div>
                        <div className="w-1/3 h-full  flex flex-col">
                        <a href=""><button>...Create friend request...</button></a>
                        <a href=""><button>...Message...</button></a>
                        <a href=""><button>...vieuw track...</button></a>
                        <a href=""><button>...Message...</button></a>

                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Home