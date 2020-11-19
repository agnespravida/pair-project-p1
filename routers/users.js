const express = require('express')
const router = express.Router()
const Controller = require("../controllers/users.js")

router.get("/home/:id", Controller.showUserHome)
// routing untuk menunjukkan dan mengedit profile user
router.get("/profile/:id", Controller.showProfile)
router.get("/profile/edit/password/:id", Controller.getPasswordForm)
router.post("/profile/edit/password/:id", Controller.editPassword)
router.get("/profile/edit/:id", Controller.getEditForm)
router.post("/profile/edit/:id", Controller.editProfile)
//menunjukkan reservasi di resoran 
router.get("/reservations", (req, res) => {
  res.send("")
})


module.exports = router