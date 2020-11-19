const { User, Restaurant, Reservation } = require("../models/index.js")
const comparePassword = require("../helpers/comparerPassword")
const hashPassword = require("../helpers/hashPassword")
//const restaurant = require("../models/restaurant.js")

class UserController {
  static showUserHome(req, res) {
    Restaurant.findAll()
    .then(restaurants => {
      let id = +req.params.id
      res.render("./users/homeUser.ejs", { id, restaurants })
    })
  
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

  static reserveTableForm(req, res) {
    let id = +req.params.id
    Restaurant.findByPk(id)
    .then(restaurant => {
      let name = restaurant.name
      res.render("./users/reserveform.ejs", { name, id })
    })
  }
  static reserveTable(req, res){
    let newTransaction = null
    User.findOne({
      where: {
        username: req.body.username
      }
    })
      .then(data => {
        newTransaction = {
          UserId: data.id,
          RestaurantId: req.params.id,
          date: req.body.date,
          time: req.body.time
        }
        return Reservation.create(newTransaction)
      })
      .then(() => {
        res.redirect(`/user/home/${newTransaction.UserId}`)
      })
      .catch(err => {
        res.send(err)
      }) 
  }
  static getReservationsList(req, res){
    User.findByPk(+req.params.id, {
      include: Restaurant
    })
    .then(data => {
      
      res.render("./users/reservationlist.ejs", { reservation: data.Restaurants })
    })
    .catch(err => {
      res.send(err.message)
    })

    //res.render("./users/reservations", )
  }
}

module.exports = UserController