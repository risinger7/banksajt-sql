import { useState } from 'react'
import { Link } from "react-router-dom"
import '../App.css'
const PORT = 3003;
const url = `http://localhost:${PORT}/sessions`


function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [token, setToken] = useState("")

  function LoginFunc(e){
    e.preventDefault()
    const user = {
      username: username,
      password: password
    }
    const userJSON = JSON.stringify(user)
    
    // login 
    fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',   
      },
      body: userJSON,
    })
      .then(res => res.json())
      .then(data => {
        setToken(data)
      })   
  }

  return (
    <div className="Reg">
      <div>
        <Link to="/Accounts" state={token}>
          Accounts
        </Link> <br />
        <Link to="/">Home</Link>
      </div>
      
      <h3>token: {token}</h3>
      <h1>Login</h1> 
      <form action="">
        <div>
          <h3>Username: {username}</h3>
          <input type="text" name="username" onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div>
          <h3>Password: {password}</h3>
          <input type="text" name="password" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div>
          <button className="marg" onClick={(e) => LoginFunc(e)}>Submit</button>
        </div>   
      </form>
    </div>
  )
}

export default Login;