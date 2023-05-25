export const home = () =>{
    return(
        <div className="min-w-full min-h-screen backcolor_main">
            <div className="w-full h-screen flex justify-center items-center">
                <div className="w-3/4 h-content bg-white rounded-lg flex flex-col">
                    <div className="flex flex-row h-56 w-full">
                        <img src="" alt="" />
                        <label htmlFor="">...NAME...</label>
                        <p>Times won: ...WON...</p>
                    </div>
                    <div className="flex flex-row h-56 w-full">
                        <p>Current games: </p>
                        <p>...NameGame...</p><a href=""><button className="w-20 h-10 font-bold ">Join</button></a>
                        
                    </div>
                    <div className="flex flex-row h-56 w-full">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default home