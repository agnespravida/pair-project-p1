const express = require('express')
const router = express.Router()
const Controller = require("../controllers/users.js")

const checkUser = (req, res, next) => {
  if(req.session.userId){
    next()
  }
  else {
    res.redirect("/home/loginUser")
  }
}

router.use(checkUser)

router.get("/home/:id", Controller.showUserHome)
// routing untuk menunjukkan dan mengedit profile user
router.get("/profile/:id", Controller.showProfile)
router.get("/profile/edit/password/:id", Controller.getPasswordForm)
router.post("/profile/edit/password/:id", Controller.editPassword)
router.get("/profile/edit/:id", Controller.getEditForm)
router.post("/profile/edit/:id", Controller.editProfile)
//menunjukkan reservasi di resoran 
router.get("/reservations/:id", Controller.getReservationsList)



module.exports = router