import { useState, useEffect } from 'react';
import { collection, getDoc, getDocs,where, doc, updateDoc, arrayUnion, query } from "firebase/firestore";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL} from "firebase/storage";
import db from '../config';

export const discover = (data) => {
  const [users, setUsers] = useState([]);
  const [file, setFile] = useState("");
  const [files, setFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [randomSongNumber, setRandomSongNumber] = useState();
  const [randomUser, setRandomUser] = useState();  
  const storage = getStorage();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const colSnapshot = await getDocs(collection(db, "users"));
    const usersData = colSnapshot.docs.map((doc) => doc.data());
  
    const filteredUsers = usersData.filter((user) => {
      const displayName = user.displayName.toLowerCase();
      const searchQueryLower = searchQuery.toLowerCase();
  
      const searchTerms = searchQueryLower.split(" ");
      return searchTerms.every((term) => displayName.includes(term));
    });
  
    setUsers(filteredUsers);
  };

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const fetchBytes = async (uid) => {
    const storageRef = ref(storage, `bytes/${uid}/`);
    const result = await listAll(storageRef);

    const urlPromises = result.items.map((soundRef) =>
      getDownloadURL(soundRef)
    );

    Promise.all(urlPromises)
      .then((urls) => {
        setFiles(urls);
      })
      .catch((error) => {
        console.error("Error fetching file URLs:", error);
      });
  };

  const handleSearch = () => {
    getUsers();
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const blockUser = (uid) =>{
    const docRef = doc(db, "users", data.userUID);

    const data2 = {
        blockedUsers : arrayUnion(uid),
    }

    updateDoc(docRef, data2)
    .then(docRef => {
        console.log("Blocked user");
    })
    .catch(error =>{
        console.log(error);
    })
  }




  const getRandomSongFromRandomUser = () => {
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    const randomUserInt = getRandomInt(users.length);
    const randomUs = users[randomUserInt];
    console.log

    const songRef = collection(db, randomUs.uid);
    console.log(songRef);
    const song = query(songRef, where("bytes", "==", randomUs.uid));
    console.log(song)

    document.getElementById(randomSong).innerHTML = randomUs;
    document.getElementById(randomSong).outerHTML = randomUs;


    getDownloadURL(ref(storage, 'GBMlAkjglZRq3pguMJ3G4XIlPKR2'))
    .then((url) => {
      // `url` is the download URL for 'images/stars.jpg'
  
      // This can be downloaded directly:
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'mp3';
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();
    })
    .catch((error) => {
      console.log(error)
    });


 // get all songs from randomUs.uid


 //pomp in state vol randomUserSongs

 //getgandomint - randomusersongs.length

  }




  const likeUser = (uid) =>{
    const docRef = doc(db, "users", uid);

    getDoc(docRef)
    .then((doc) => {
      if (doc.exists()) {
        const currentLikes = doc.data().likes || 0;
        const updatedLikes = currentLikes + 1;

        const updatedData = {
          likes: updatedLikes
        };

        return updateDoc(docRef, updatedData);
      } else {
        console.log("User document does not exist");
        return null;
      }
    })
    .then(docRef => {
      console.log("Liked user");
    })
    .catch(error =>{
        console.log(error);
    })
  }


  return (
    <div className="min-w-full min-h-screen h-screen bg-purple-700 flex justify-center items-center">
      <div className="w-3/4 h-full bg-white rounded-lg flex flex-col">
        <div className="h-42 w-full border-b-4 p-4 flex flex-col flex-wrap">
          <h1 className='text-xl'>Discover</h1>
          <p>Here you can discover new people and songs. How about a random song?</p>
          <button className="bg-gray-200 rounded-xl w-32 h-12 hover:bg-blue-100" onClick={() => getRandomSongFromRandomUser()}>Random song!</button>
          <p id='randomSong'></p>
          <div className="h-content w-content border-t-4 m-3 p-3 ">
            <input type="text" placeholder="Username" value={searchQuery} onChange={handleSearchInputChange} />
          <button className="bg-gray-200 rounded-xl w-32 h-12 hover:bg-blue-100" onClick={handleSearch}>Look for user</button>
          </div>

          

        </div>
        <div className="w-full h-content flex flex-row">
          {users.map((user) =>
            user.uid !== data.userUID && !user.isPrivate ? (
              <div className="w-1/3 h-96 border-4 border-orange-400">
                <div className="h-2/3 w-full flex flex-row border-b-2 border-purple-700">
                  <div className="w-1/2 h-full">
                    <img className="w-full" src={user.photoURL} alt="User image" />
                  </div>
                  <div className="w-1/2 h-full">
                    <ul>
                      <li>{user.displayName}</li>

                      <li>Likes: {user.likes}</li>
                    </ul>
                    <div className="h-12 w-full flex flex-row">
                      <button onClick={() => (likeUser(user.uid))} className="h-10 w-24 bg-green-300 hover:bg-blue-200 text-xl rounded-full">Like</button>
                      <button onClick={() => (window.location.href = `/neighbour/${user.uid}`)} className="h-10 w-24 bg-purple-300 hover:bg-orange-400 text-xl rounded-full">Profile</button>
                    </div>
                    <div className="h-12 w-full flex flex-row">
                        <button onClick={() => blockUser(user.uid)} className="h-10 w-24 bg-red-300 hover:bg-blue-200 text-xl rounded-full">Block</button>
                    </div>
                  </div>
                </div>
                <div className="w-full h-1/3">
                  {files.map((url, index) => (
                    <audio key={index} controls>
                      <source src={url} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  ))}

                  <p>hier hoort de audio dingen te staan. Maar dat doen ze niet.</p>
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default discover;
