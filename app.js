const express = require('express')
const app = express()
const session = require("express-session")
const router = require("./routers/index.js")
const port = 5000

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(router)

app.listen(port, () => {
  console.log("app running on port " + port)
})