const {restaurant, menu} = require('../models')

class ControllerRestaurant { 
    static showRestaurantMenu(req, res){
        restaurant
            .findAll({
                order : [['id', 'ASC']]
            })
            .then(data => {
                res.render('menu', {data})
            })
            .catch(err =>{
                res.send(err)
            })  
    }

    static addMenu(req, res){
        res.render('addMenu')
    }

    static add(req, res){
        const newMenu = {
            name : req.body.name,
            price : req.body.price,
            amount : req.body.amount,
            description : req.body.description
        }
        menu
            .create(newMenu)
            .then(data =>{
                res.redirect('menu')
            })
            .catch(err =>{
                res.send(err)
            })
    }

    static editMenu(req, res){
        const id = +req.params.id

        menu
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

        menu
        .update(updatedMenu, {
            where : {
                id : id
            }
        })
        .then(data =>{
            res.redirect('menu')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static delete(req, res){
        const id = +req.params.id
        menu 
            .destroy({
                where : {
                    id : id
                }
            })
            .then(data =>{
                res.redirect('menu')
            })
            .catch(err =>{
                res.send(err)
            })
    }
};  

module.exports = ControllerRestaurant;