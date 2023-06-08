export const home = () =>{
    return(
        <div className="min-w-full min-h-screen bg-purple-700 flex justify-center items-center">
                <div className="h-10"></div>
                <div className="w-3/4 h-content bg-white rounded-lg flex flex-col ">
                    <div className="flex flex-row h-96 w-full m-4">
                        <div className="w-96 h-full bg-green-700 flex items-center justify-center">
                            <div className="w-3/4 h-3/4 bg-red-200">
                            <img src="" alt="Profile pick"/>
                            </div>
                        </div>
                        <div className="h-full w-2/3 bg-red-300">
                            <ul className="h-3/4 flex flex-col justify-around">
                                <li className="font-semibold text-xl border-b-2 border-red-100">...NAME...</li>
                                <li>...EMAIL...</li>
                                <li>...LISTENS...</li>
                                <li>...SONGS...</li>
                                <li>...LIKES...</li>
                            </ul>
                        </div>
                        <div className="h-full w-1/4 bg-blue-300 flex flex-col justify-start">
                            <p className="font-semibold text-xl">Top SONGS:</p>
                            <p>MP3 sounds</p>
                            <p>MP3 sounds</p>
                            <p>MP3 sounds</p>
                        </div>
                    </div>
                    <div className="flex flex-row h-96 w-full">
                        <a href=""><button>...Create friend request...</button></a>
                        <a href=""><button>...Message...</button></a> 
                    </div>
                </div>
        </div>
    )
}

export default home