const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routes/authRouter');

require('dotenv').config();
// This code will take the PORT from .env file, or use the hard-coded one.
const PORT = process.env.PORT || 8800;

const { connectDB } = require('./connection');
const connectUrl = process.env.MONGODB_CONN;

// Main
app.get("/", (req, res)=>{
    return res.send("Hello world!");
})

// Connect
connectDB(connectUrl)
.then(()=>{
    console.log("Connection successfull!");
})
.catch((e)=>{
    console.log("Connection unsuccessfull!", e);
})

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/auth", authRouter);


app.listen(PORT, ()=>{
    console.log(`Server is runnning at PORT: ${PORT}....`);
})