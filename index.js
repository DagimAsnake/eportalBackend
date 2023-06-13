const dotenv = require('dotenv')
dotenv.config()

const { express, app } = require('./server')
const mongoose = require('mongoose')
const cors = require('cors')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
const branchRoute = require("./routes/branchRoute")

mongoose.set("strictQuery", true)

const MONGO_URL = process.env.MONGO_URL
mongoose.connect('mongodb://127.0.0.1/Eportal', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log("Database is connected successfully")
    })
    .catch((err) => {
        console.log("Error while connecting", err)
    })


const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Eportal',
            version: '1.0.0',
            description: 'A simple Eportal',
        },
        servers: [
            {
                url: 'http://localhost:8000',
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


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
app.use("/user", userRoute)
app.use("/branch", branchRoute)