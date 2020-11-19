const { Restaurant, User } = require("../models/index")
const comparePassword = require("../helpers/comparerPassword")
const bcrypt = require("bcryptjs")


class ControllerHome {
  static showHome(req,res) {
    Restaurant.findAll()
    .then(restaurants => {
      res.render("homeGeneral.ejs", { restaurants })
    })
    .catch(err => {
      res.send(err.message)
    })
    //res.send("Ini menunjukkan halaman home")
  }
  static loginFormUser(req, res) {
    let failedLogin = req.query.failed
    res.render("./users/formLogin.ejs", { failedLogin })
  }
  static checkLoginUser(req, res) {
    //setelah cek loginUser, arahkan ke /users/homeUser/:id
    User.findOne({
      where: {
        username: req.body.username
      }
    })
      .then(user => {
        if(user && comparePassword(req.body.password, user.password) ){
          req.session.userId = user.id
          res.redirect(`/user/home/${user.id}`)
        }
        else {
          res.redirect("/home/loginUser?failed=wrong username or password")
        }
      })
      .catch((err) => {
        res.send(err.message)
      })
    //res.send(req.body)
  }
  static registerFormUser(req, res) {
    let failedRegister = req.query.failed
    if (!failedRegister){
      failedRegister = []
      res.render("./users/registerForm", { failedRegister })
    }
    else {
      failedRegister = failedRegister.split(",")
      res.render("./users/registerForm", { failedRegister })
      
    }
    //res.send("menampilkan form registrasi user")
  }
  static addUser(req, res){
    let newUser = {
      name: req.body.name,
      username:req.body.username,
      email:req.body.email,
      password: req.body.password,
      credit_card: req.body.credit_card

    }
    User.create(newUser)
      .then(() => {
        return User.findAll({
          where:{
            username: req.body.username
          }
        })
      })
      .then(user => {
        req.session.userId = user.id
        res.redirect(`/user/home/${user[0].id}`)
      })
      .catch(err => {
        //perbaiki pesan errornya
        res.redirect(`/home/registerUser?failed=${err.message}`)
      })
  }
  static loginFormRestaurant(req, res) {
    let failedLogin = req.query.failed
    res.render("./restaurants/formLogin.ejs", { failedLogin })
  }
  static checkLoginRestaurant(req, res){
    Restaurant.findOne({
      where: {
        username: req.body.username
      }
    })
      .then(restaurant => {
        if(restaurant && comparePassword(req.body.password, restaurant.password) ){
          req.session.restaurantId = restaurant.id
          res.redirect(`/restaurants/profile/${restaurant.id}`)
        }
        else {
          res.redirect("/home/loginRestaurant?failed=wrong username or password")
        }
      })
      .catch((err) => {
        res.send(err.message)
      })

  }
  static registerFormRestaurant(req, res) {
    let failedRegister = req.query.failed
    if (!failedRegister){
      failedRegister = []
      res.render("./restaurants/registerForm", { failedRegister })
    }
    else {
      failedRegister = failedRegister.split(",")
      res.render("./restaurants/registerForm", { failedRegister })
      
    }
  }
  static addRestaurant(req, res){
    let newRestaurant = {
      name: req.body.name,
      username:req.body.username,
      email:req.body.email,
      password: req.body.password,
      siup_num: req.body.siup_number,
      deposit: req.body.deposit,
      capacity: req.body.capacity

    }
    Restaurant.create(newRestaurant)
      .then(() => {
        return Restaurant.findAll({
          where:{
            username: req.body.username
          }
        })
      })
      .then(restaurant => {
        req.session.restaurantId = restaurant.id
        res.redirect(`/restaurants/profile/${restaurant[0].id}`)
      })
      .catch(err => {
        //perbaiki pesan errornya
        res.redirect(`/home/registerRestaurant?failed=${err.message}`)
      })

  }

  static logoutUser(req, res){
    req.session.destroy((err) => {
      if(err){
        res.send(err)
      }
      else {
        res.redirect("/home")
      }
    })
  }
  static logoutRestaurant(req, res){
    req.session.destroy((err) => {
      if(err){
        res.send(err)
      }
      else {
        res.redirect("/home")
      }
    })
  }
}

module.exports = ControllerHome