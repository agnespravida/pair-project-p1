const { Restaurant, Menu, User } = require('../models')

class ControllerRestaurant { 
    static showRestaurantMenu(req, res){
        Restaurant
            .findByPk(+req.params.id, {
                include: Menu
            })
            .then(data => {
                let menu = []
                for (let i = 0; i < data.Menus.length; i++){
                    let template = {
                        id: data.Menus[i].id,
                        name: data.Menus[i].name,
                        price: data.Menus[i].formatPrice(),
                        description: data.Menus[i].description
                    }
                    menu.push(template)
                }
                res.render("menu.ejs", {menu, data})
            })
            .catch(err => {
                res.send(err.message)
            })
    }

    static addMenu(req, res){
        let id = req.params.id
        res.render('addMenu', { id })
    }

    static add(req, res){
        const newMenu = {
            name : req.body.name,
            price : req.body.price,
            amount : req.body.amount,
            description : req.body.description,
            RestaurantId: req.params.id
        }
        Menu
            .create(newMenu)
            .then(data =>{
                res.redirect(`/restaurants/menus/${req.params.id}`)
            })
            .catch(err =>{
                res.send(err)
            })
    }

    static editMenu(req, res){
        const id = +req.params.id

        Menu
            .findByPk(id)
            .then(data =>{
                res.render('editMenu', {data})
            })
            .catch(err =>{
                res.send(err)
            })
    }

    static edit(req, res){
        const id = +req.params.id
        const updatedMenu = {
            name : req.body.name,
            price : req.body.price,
            amount : req.body.amount,
            description : req.body.description
        }

        Menu
        .update(updatedMenu, {
            where : {
                id : id
            }
        })
        .then(data =>{
            return Menu.findByPk(id)
            //res.redirect(`/restaurants/profile/`)
        })
        .then(data => {
            res.redirect(`/restaurants/profile/${data.RestaurantId}`)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static delete(req, res){
        const id = +req.params.id
        let restoId = null
        Menu.findByPk(id)
            .then(data => {
                restoId = data.RestaurantId
                return  Menu.destroy({
                    where : {
                        id : id
                    }
                })
            })
            .then(data =>{
                res.redirect(`/restaurants/menus/${restoId}`)
            })
            .catch(err =>{
                res.send(err.message)
            })
    }

    static showRestaurantProfil(req, res){
        Restaurant.findByPk(+req.params.id)
        .then(data => {
            res.render("./restaurants/restaurantProfile.ejs", { data })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static showReservations(req, res){
        Restaurant.findByPk(+req.params.id, {
            include: User
          })
          .then(data => {
            res.send(data)
            //res.render("./restaurants/reservations.ejs", { reservation: data.Users })
          })
          .catch(err => {
            res.send(err.message)
          })

    }
};

module.exports = ControllerRestaurant;