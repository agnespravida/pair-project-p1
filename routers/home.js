const express = require('express')
const router = express.Router()
const Controller = require("../controllers/home")

//showing login form, register form, dan list resto
router.get("/", Controller.showHome)
router.get("/loginUser", Controller.loginFormUser)
router.post("/loginUser", Controller.checkLoginUser)
router.get("/registeruser", Controller.registerFormUser)
router.post("/registerUser", Controller.addUser)

//menunjukkan profil restoran dan menu
router.get("/restaurantlist/:name", (req, res) => {
  res.send("Ini routing login")
})

//form reservasi restoran hanya bisa dibuka oleh user yang sudah login
router.get("/reserve/:name", (req, res) => {
  res.send("Ini routing login")
})


module.exports = router