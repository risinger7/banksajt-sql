import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
const PORT = 3003;
const url = `http://localhost:${PORT}/me/accounts`

export default function Accounts() {

  const login = useLocation(); // state from where? -> login. Which state? -> token
  const token = login.state

  const [username, setUsername] = useState([{}])
  const [saldo, setSaldo] = useState("")
  const [logged, setLogged] = useState(false)
 
  
  useEffect(() => {  
    fetch(url, {
      method: "GET",
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => { // data == [amount, username]
        setLogged(true)
        setSaldo(data[0])
        setUsername(data[1])
        
      })     
  }, [])

  return (
    <div>
      <Link to="/">Home</Link>
        {
          logged && 
          <div> 
              <h1>Accounts / logged in</h1>
                <div>
                  <p>name: {username}</p>
                  <p>saldo: {saldo}</p>
              </div>
          </div>
        }
        {
          !logged && 
          <div> Not logged in </div>
        }
    </div>
  )
}