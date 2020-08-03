const express = require('express')
const connectDB = require('./config/db')

const app = express()
app.use(express.json({ extended: false }))

//connect to mongoose database
connectDB()

app.use('/api/user', require('./src/routes/api/user'))
app.use('/api/auth', require('./src/routes/api/auth'))
app.use('/api/expense', require('./src/routes/api/expense'))

const PORT = process.env.PORT || 6000

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`)
})