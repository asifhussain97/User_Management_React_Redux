const express = require('express')
const colors = require('colors')
const {errorHandler} = require('./middleware/errorMiddleware')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

const connectDB = require('./config/db'); // Adjust the path as necessary to where your connectDB function is stored


const app = express()

// Initialize database connection
connectDB();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('api/goals',require('./routes/goalRoutes'))
app.use('/api/users',require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port,()=>console.log(`Server running on ${port}`))