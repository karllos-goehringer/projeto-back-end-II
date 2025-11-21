
var express = require('express');
var appServer = express();
const consign = require('consign');
const bodyparser = require('body-parser')
const validator = require('express-validator')
const session = require('express-session');
appServer.set('view engine', 'ejs')
appServer.set('views', './app/views')
appServer.use(express.static('./app/public'))
appServer.use(bodyparser.urlencoded({extended:true}))
var multer = require('multer');
var configMulter = multer({
  storage: multer.diskStorage({
    destination: function(req,file,callback){
      callback(null,'./app/public/uploads')
    },
    filename:function(req,file,callback){
      callback(null, Date.now()+'-'+file.originalname)
    }
  })
})
appServer.upload = configMulter;
appServer.use(session({
    secret: 'uma_chave_secreta',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 } // 1 hora
}));
appServer.use(validator())
consign()
  .then('./config/dbconnection.js')  
  .then('app/models')               
  .then('app/controllers')         
  .then('app/routes')      
  .into(appServer);
module.exports = appServer;

