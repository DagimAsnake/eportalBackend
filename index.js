const dotenv = require('dotenv')
dotenv.config()

const { express, app } = require('./server')
const mongoose = require('mongoose')
const cors = require('cors')

const authRoute = require('./routes/authRoute')

mongoose.set("strictQuery", true)

const MONGO_URL = process.env.MONGO_URL
mongoose.connect('mongodb://127.0.0.1/Eportal', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log("Database is connected successfully")
    })
    .catch((err) => {
        console.log("Error while connecting", err)
    })


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});

app.use(cors());

app.use("/auth", authRoute);