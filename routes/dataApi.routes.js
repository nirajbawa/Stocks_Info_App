const express = require("express")
const api = require("../controllers/api.controllers")
const router = new express.Router()

// routes and controller

router.get("/api/", api)

module.exports = router
