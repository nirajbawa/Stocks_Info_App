const express = require("express")
const Home = require("../controllers/home.controller")
const router = new express.Router()

// routes and controller

router.get("/", Home)

module.exports = router