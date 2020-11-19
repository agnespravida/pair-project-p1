const express = require('express')
const router = express.Router()
const Controller = require('../controllers/restaurants')

// routing untuk menunjukkan profil suatu restoran
router.get("/profile/:id", Controller.showRestaurantProfil);

// routing untuk menunjukkan daftar menu
router.get("/menus/", Controller.showRestaurantMenu);

// routing untuk create
router.get("/menus/add", Controller.addMenu);
router.post("/menus/add", Controller.add);

//routing untuk update
router.get("/menus/:id/edit", Controller.editMenu);
router.post("/menus/:id/edit", Controller.edit) 

//routing untuk delete
router.get("/menus/:id/delete", Controller.delete);

//menunjukkan reservasi di restoran
router.get("/reservations", (req, res) => {
  res.send("")
})


module.exports = router