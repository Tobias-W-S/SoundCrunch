import { useState } from 'react'

function App() {

  return (
      <div>
        <h1>Login</h1>
        <form action="POST">
          <label htmlFor="">Username</label>
          <input type="text" placeholder='Put your name here'/>
          <label>Password</label>
          <input type="password" placeholder='passweord here'/>
        </form>
      </div>
  )
}

export default App
