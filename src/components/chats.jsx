export const chats = () =>{
    return(
        <div className="min-w-full min-h-screen h-screen bg-purple-700 flex justify-center items-center">
                <div className="w-3/4 h-3/4 bg-white rounded-lg flex flex-row">
                    <div className="w-1/3 h-full border-r-4 border-indigo-500 flex flex-col">
                        <div className="w-full h-20 border-b-2 flex flex-row">
                            <div className="border-r-4 w-20">img hier</div>
                            <div className="h-full flex flex-row items-center p-6"><p>name</p></div>
                        </div>
                        <div className="w-full h-20 border-b-2 flex flex-row">
                            <div className="border-r-4 w-20">img hier</div>
                            <div className="h-full flex flex-row items-center p-6"><p>name</p></div>
                        </div>
                        <div className="w-full h-20 border-b-2 flex flex-row">
                            <div className="border-r-4 w-20">img hier</div>
                            <div className="h-full flex flex-row items-center p-6"><p>name</p></div>
                        </div>
                        <div className="w-full h-20 border-b-2 flex flex-row">
                            <div className="border-r-4 w-20">img hier</div>
                            <div className="h-full flex flex-row items-center p-6"><p>name</p></div>
                        </div>
                        <div className="w-full h-20 border-b-2 flex flex-row">
                            <div className="border-r-4 w-20">img hier</div>
                            <div className="h-full flex flex-row items-center p-6"><p>name</p></div>
                        </div>
                        <div className="w-full h-20 border-b-2 flex flex-row">
                            <div className="border-r-4 w-20">img hier</div>
                            <div className="h-full flex flex-row items-center p-6"><p>name</p></div>
                        </div>
                    </div>
                    <div className="w-2/3 h-full flex flex-col">
                        <div className="h-2/3 border-b-2 flex flex-col">
                            <div className="h-10 w-content bg-green-100 flex items-center border-b-2 border-black-200 mb-3">
                                <p>
                                    Wow such cool, much doge
                                </p>
                            </div>
                            <div className="h-10 w-content bg-green-100 flex items-center border-b-2 border-black-200 mb-3">
                                <p>
                                    Wow such cool, much doge
                                </p>
                            </div>
                            <div className="h-10 w-content bg-green-100 flex items-center border-b-2 border-black-200 mb-3">
                                <p>
                                    Wow such cool, much doge
                                </p>
                            </div>
                            <div className="h-10 w-content bg-green-100 flex items-center border-b-2 border-black-200 mb-3">
                                <p>
                                    Wow such cool, much doge
                                </p>
                            </div>
                        </div>
                        <div className="">
                            <input className="w-96 h-10 bg-red-400" type="text" name="message" id="message"/>
                            <input type="submit" value=">"  className="w-10 h-10 bg-green-100 hover:bg-red-200 hover:cursor-pointer"/>
                        </div>        
                    </div>
                </div>
        </div>
    )
}

export default chats