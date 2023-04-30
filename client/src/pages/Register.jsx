import { useState } from 'react'
import { Link, Navigate } from "react-router-dom"
import '../App.css'
const PORT = 3003;
const url = `http://localhost:${PORT}/users`

export default function Register() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [amount, setAmount] = useState("")
  const [nav, setNav] = useState(false)

  function submitFunc(e){
    e.preventDefault()
    const user = {
      username: username,
      password: password, 
      email: email, 
      amount: amount
    }
    const userJSON = JSON.stringify(user)
    console.log("user:", user, "userJSON: ", userJSON)
    console.log("user: ", user.username, user.password)
    
    // POST
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
      .then(response => {
        if(response.ok) {
          setNav(true);
        }
      })
  }

  return (
    <div className="Reg">
      {nav ? <Navigate to="/login"></Navigate> : null}

      <Link to="/">Home</Link>
      <h1>Register user</h1>
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
          <h3>Email: {email}</h3>
          <input type="text" name="email" onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div>
          <h3>Saldo: {amount}</h3>
          <input type="text" name="amount" onChange={(e) => setAmount(e.target.value)}/>
        </div>
        <div>
          <button className="marg" onClick={(e) => submitFunc(e)}>Submit</button>
        </div>
        
      </form>
    </div>
  )
}

