import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';


function App() {

  return (
      <div className='min-w-full min-h-screen backcolor_main'>
        <div className="w-full h-screen flex justify-center items-center">
          <div className="w-1/4 h-2/4 bg-white rounded-lg">      
            <form action="POST" className='w-full h-full flex flex-col justify-evenly p-2.5'>
            <h1>Login</h1>
            <label htmlFor="">Username</label>
            <input type="text" placeholder='Put your name here'/>
            <label>Password</label>
            <input type="password" placeholder='passweord here'/>
            <input type='submit'/>
            </form>
          </div>

        </div>

      </div>
  )
}

export default App
