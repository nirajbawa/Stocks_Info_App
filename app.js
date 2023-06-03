require("dotenv").config()

// import packages
const express = require("express")
const path = require("path");
const session = require('express-session')
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser')


const app = express()
const port = process.env.PORT || 8000

// define view engine settings
app.set("view engine", "ejs")

const templatesPath = path.join(__dirname, "/templates/")
app.set("views", templatesPath);

// serve static files
const staticPath = path.join(__dirname, "/public")
app.use(express.static(staticPath));


// database connection
require("./models/DB_Config.modes");

// body parser

app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())


// import & use routes
const Home = require("./routes/home.routes")
app.use(Home)

const api = require("./routes/dataApi.routes")
app.use(api)



app.listen(port,()=>{
    console.log("http://127.0.0.1:"+port)
});