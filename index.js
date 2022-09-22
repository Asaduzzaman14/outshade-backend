const express = require('express');
const cors = require('cors');
require('dotenv').config()
const dbConnect = require('./utils/dbConnect');
const productsRoutes = require('./routes/v1/productRoutes');
const { connectToServer } = require('./utils/dbConnect');

const app = express()
const port = process.env.PORT || 5000;


app.use(cors())
app.use(express.json())


connectToServer((err) => {
    if (!err) {
        app.listen(port, () => {
            console.log(` lisining is ${port}`);
        })
    } else {
        console.log(err);
    }
})

app.use("/api/v1/products", productsRoutes)



process.on("uncaughtException", (error) => {
    console.log(error.name, error.message);;
    app.close(() => {
        process.getMaxListeners(1)
    })
})

