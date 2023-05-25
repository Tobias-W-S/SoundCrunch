export const home = () =>{
    return(
        <div className="min-w-full min-h-screen bg-purple-700 flex justify-center items-center">

                <div className="w-3/4 h-content bg-white rounded-lg flex flex-col">
                    <div className="flex flex-row h-56 w-full">
                        <img src="" alt="" />
                        <label htmlFor="">...NAME...</label>
                        <br/><label htmlFor="">...EMAIL...</label>
                        <br/><label htmlFor="">...Total songs...</label>
                        <br/><label htmlFor="">...Total friends...</label>
                        <br/><label htmlFor="">...Total time a user i guess, tobias als je dit leest verin wat...</label>
                    </div>
                    <div className="flex flex-row h-56 w-full">
                        <a href=""><button>...Create friend request...</button></a>
                        <a href=""><button>...Message...</button></a> 
                    </div>
                    <div className="flex flex-row h-56 w-full">
                        
                    </div>
                </div>
        </div>
    )
}

export default home