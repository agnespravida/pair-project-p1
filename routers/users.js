const express = require('express')
const router = express.Router()

router.get("/home/:id", (req, res) => {
  res.send("ini dari home user")
})
// routing untuk menunjukkan dan mengedit profile user
router.get("/profile/:id", (req, res) => {
  res.send("Ini di routing restaurants")
})
router.get("/profile/edit/:id", (req, res) => {
  res.send("Ini di routing restaurants")
})

//menunjukkan reservasi di resoran 
router.get("/reservations", (req, res) => {
  res.send("")
})


module.exports = router