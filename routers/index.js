const express = require('express')
const router = express.Router()
const restaurantRouter = require("./restaurants")
const homeRouter = require("./home")
const userRouter = require("./users")


router.use("/restaurants", restaurantRouter)
router.use("/home", homeRouter)
router.use("/user", userRouter)


module.exports = router