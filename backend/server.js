
import express from "express"
import mysql from "mysql"
import jwt from "jsonwebtoken"
import cors from "cors"

const app = express()
const PORT = 3003 // PORT express, 3306 mysql
const SECRET = "abcabc123123"

// c == connection
const c = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "banksajt",
  port: 3306
})

// middle
app.use(express.json())
app.use(cors())


// POST create new user
app.post("/users", (req, res) => {

  const user = req.body;
  const { username, password, email, amount} = user

  c.query("INSERT INTO users (username, password, email) VALUES (?,?,?)", 
    [username, password, email], (err, result) => {
      if(err) {
        console.log("error: ", err) 
        res.status(500).send()
        
      } else { 
        console.log("result: ", result.insertId) 
        const userId = result.insertId   
        
        c.query(
          "INSERT INTO accounts (user_id, amount) VALUES (?, ?)", 
          [userId, amount], 
          (err, result) => {

          if(err) {
            res.status(500).send()
          } else {
            res.send("ok")
          }
        })
      }
  })
})

// POST LOGIN SESSION
app.post("/sessions", (req, res) => {

  const userClient = req.body 

  c.query(
    "SELECT * FROM users WHERE username = ?", 
    [userClient.username], 
    (err, result) => {

    if(err) {  
      res.sendStatus(404)
    } else {
      const userDb = result[0]
      if(userDb.password === userClient.password){
        // create jwt token
        const token = jwt.sign(userDb.id, SECRET)
        res.json(token)                    
      } else {
        res.status(403).send("Not Matching!")
      }
    }
  })
})

app.get("/me/accounts", (req, res) => {
  // get the token to verify
  const authHeaders = req.headers["authorization"]
  const token = authHeaders.split(" ")[1] 
  // verify the user via jwt
  // userId is the payload of the token (info) we want back if it is OK.
  jwt.verify(token, SECRET, (err, userId) => { 
    if(err) {
      res.status(403).send("token not ok")
    } else {
      // select the account of the user id from the database now when the token is ok
      // then select the username of that id in a second query
      const dataToSend = []
      c.query("SELECT * FROM accounts WHERE user_id = ?", [userId], (err, result) => {
        if(err) {
          res.sendStatus(404)
        } else {
          console.log("RESult back from accounts:", result)
          dataToSend.push(result[0].amount)
          c.query("SELECT username FROM users WHERE id = ?", 
            [userId], 
            (err, result) => {
            if(err) {
              res.sendStatus(404)
            } else {
              dataToSend.push(result[0].username)
              res.json(dataToSend)
            }
          })
        }
      })   
    }
  })
})


// CONNECT/LISTEN
c.connect((err) => {
  if(err) {
    console.log("error: ", err)
  } else {

    console.log("DB connected")

    app.listen(PORT, () => {
      console.log("server started on port ", PORT)
    })
  }
})
