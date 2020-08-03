const mongoose = require('mongoose')
const config = require('config')

const connectDB = () => {
   try {
    mongoose.connect(config.get('MongoURI'),{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    console.log('Connected to mongoose database')
   } catch (error) {
    console.log(`Error in connecting to db : ${error}`)
   }
}

module.exports = connectDB