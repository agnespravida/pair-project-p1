const express = require('express')
const router = express.Router()

// routing untuk menunjukkan profil suatu restoran
router.get("/profile/:id", (req, res) => {
  res.send("Ini di routing restaurants")
})

// routing untuk menunjukkan daftar menu
router.get("/menus/:id", (req, res) => {
  res.send("Ini di routing restaurants")
})

// routing untuk crud
router.get("/menus/:id/add", (req, res) => {
  res.send("Ini di routing restaurants")
})
router.get("/menus/:id/edit", (req, res) => {
  res.send("Ini di routing restaurants")
})
router.get("/menus/:id/delete", (req, res) => {
  res.send("Ini di routing restaurants")
})

//menunjukkan reservasi di resoran
router.get("/reservations", (req, res) => {
  res.send("")
})


module.exports = router