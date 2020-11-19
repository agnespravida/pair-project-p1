const { Restaurant, User } = require("../models/index")
const comparePassword = require("../helpers/comparerPassword")
const bcrypt = require("bcryptjs")

class ControllerHome {
  static showHome(req,res) {
    res.render("homeGeneral.ejs")
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
    res.render("./users/registerForm")
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
        res.redirect(`/user/home/${user[0].id}`)
      })
      .catch(err => {
        //perbaiki pesan messagenya
        console.log(err.message)
        res.send(err.message)
      })
  }
  static loginRestaurant(req, res) {

  }
  static registerRestaurant(req, res){

  }
}

module.exports = ControllerHome