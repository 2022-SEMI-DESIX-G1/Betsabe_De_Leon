require('dotenv').config();
const mongoose = require('mongoose');
const  MONGO_URL  =  "mongodb://localhost:27017/admin" ;
const dbConnection = async() =>{
    try{
        await mongoose.connect(MONGO_URL);
        console.log('BD Online');
    }
    catch(error) {
        console.log(error);
        throw new Error('Error al realizar coneccion a BD');
    }
}

module.exports = {
    dbConnection
}