const { User } = require("../models/index.js")
const comparePassword = require("../helpers/comparerPassword")
const hashPassword = require("../helpers/hashPassword")

class UserController {
  static showUserHome(req, res) {
    let id = +req.params.id
    res.render("./users/homeUser.ejs", { id })
  }
  static showProfile(req, res){
    User.findByPk(+req.params.id)
      .then(user => {
        res.render("./users/userProfile" , { user })
      })
      .catch(err => {
        res.send(err.message)
      })
  }
  static getPasswordForm(req, res) {
    let id = +req.params.id
    let failed = req.query.failed
    res.render("./users/changePassword.ejs", { id, failed })
  }
  static editPassword(req, res) {
    User.findByPk(+req.params.id)
      .then(user => {
        if (comparePassword(req.body.oldpassword, user.password)){
          let newPassword = hashPassword(req.body.newpassword)
          return User.update({password: newPassword}, {
            where: {
              id: +req.params.id
            },
            individualHooks: true
          })
        }
        else {
          res.redirect(`/user/profile/edit/password/${req.params.id}?failed=you enter the wrong password`)
        }
      })
      .then(() => {
        res.redirect(`/user/home/${+req.params.id}`)
      })
      .catch(err => {
        res.send(err.message)
      })
  }
  static getEditForm(req, res){
    User.findByPk(+req.params.id)
      .then(user => {
        res.render("./users/formEditProfile.ejs", { user })
      })
      .catch(err => {
        res.send(err.message)
      })
  }
  static editProfile(req, res){
    let updatedProfile = {
      name: req.body.name,
      username: req.body.username,
      email: req.body.email
    }
    User.update(updatedProfile, {
      where: {
        id : +req.params.id
      }
    })
    .then(() => {
      res.redirect(`/user/home/${+req.params.id}`)
    })
    .catch(err => {
      res.send(err.message)
    })
  }

  static reserveTable(req, res) {

  }
  static getReservationsList(req, res){

  }
}

module.exports = UserController