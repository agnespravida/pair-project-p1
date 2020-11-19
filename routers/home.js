const express = require('express')
const router = express.Router()
const Controller = require("../controllers/home")
const UserController = require("../controllers/users")

const checkUser = (req, res, next) => {
  if(req.session.userId){
    next()
  }
  else {
    res.redirect("/home/loginUser")
  }
}
//showing login form, register form, dan list resto
router.get("/", Controller.showHome)
router.get("/loginUser", Controller.loginFormUser)
router.post("/loginUser", Controller.checkLoginUser)
router.get("/registeruser", Controller.registerFormUser)
router.post("/registerUser", Controller.addUser)
router.get("/loginRestaurant", Controller.loginFormRestaurant)
router.post("/loginRestaurant", Controller.checkLoginRestaurant)
router.get("/registerRestaurant", Controller.registerFormRestaurant)
router.post("/registerRestaurant", Controller.addRestaurant)
//menunjukkan profil restoran dan menu

router.use(checkUser)
//form reservasi restoran hanya bisa dibuka oleh user yang sudah login
router.get("/reserve/:id", UserController.reserveTableForm)
router.post("/reserve/:id", UserController.reserveTable)

router.get("/logoutUser", Controller.logoutUser)
router.get("/logoutRestaurant", Controller.logoutRestaurant)


module.exports = router