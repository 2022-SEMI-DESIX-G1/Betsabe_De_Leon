require("dotenv").config();
const axios = require("axios");
const cors = require("cors");
const path = require("path");
const express = require("express");
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const rout = require('./routes/router');
const User = require('./controller/user');
const app = express();

const { PORT = 3000 } = process.env;
const MONGO_URL = "mongodb://localhost:27017/Supermercado";
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        limit: '20 mb',
        extended:true
      }));


//      console.log(__dirname);
app.use(express.static(path.join(__dirname, 'lab8-frontend')));

app.use(cors());   

app.use(rout);

app.get('/', (req, res) =>{
  
});


app.post('/register', (req, res) =>{
  const  {username, password} = req.body;

  const user = new User({username, password});
  user.save(err =>{
    if(err){
      //console.log(err);
      res.status(500).send('ERROR AL REGISTRAR AL USUARIO');
    }else{
      res.status(200).send('USUARIO REGISTRADO');
    }
  });
});

app.post('/authenticate', (req, res) =>{
  const  {username, password} = req.body;

  User.findOne({username}, (err, user)=>{
    if(err){
      res.status(500).send('ERROR AL AUTENTICAR  findOne');
    }else if(!user){
      res.status(500).send('USUARIO NO EXISTE !user');
    }else{
      user.isCorrectPassword(password, (err, result) =>{
        if(err){
          res.status(500).send('ERROR AL AUTENTICAR isCorrectPassword');
        }else if(result){
          res.status(200).send('USUARIO AUTENTICADO');
        }else{
          res.status(500).send('USUARIO Y/O CONTRASEÑA INCORRECTA isCorrectPassword');
        }
      });
    }
  })
});

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log({ PORT });
    });
  })
  .catch(({ error }) => {
    console.log({ error });
  });

  module.exports = app;