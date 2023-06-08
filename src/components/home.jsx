export const home = () =>{
    return(
        <div className="min-w-full min-h-screen bg-purple-700 flex justify-center items-center">
                <div className="h-10"></div>
                <div className="w-3/4 h-content bg-white rounded-lg flex flex-col ">
                    <div className="flex flex-row h-96 w-full p-4 border-b-2 border-orange-600">
                        <div className="w-56 h-56 flex items-center justify-center">
                            <div className="w-52 h-52 ">
                            <img src="" alt="Profile pick" className="w-full h-full"/>
                            </div>
                        </div>
                        <div className="h-full w-1/2">
                            <ul className="h-3/4 flex flex-col justify-around border-r-2">
                                <li className="font-semibold text-xl ">...NAME...</li>
                                <li>...EMAIL...</li>
                                <li>...LISTENS...</li>
                                <li>...SONGS...</li>
                                <li>...LIKES...</li>
                            </ul>
                        </div>
                        <div className="h-full w-1/4 flex flex-col justify-start">
                            <p className="font-semibold text-xl">All SONGS:</p>
                            <p>...MP3...</p>
                        </div>
                    </div>
                    <div className="flex flex-row h-96 w-full justify-around p-4">
                        <div className="w-1/2 h-full border-b-2">
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

export default home