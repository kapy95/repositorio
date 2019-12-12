//base de datos:
var Datastore=require('nedb');

var DB_FILE_NAME=__dirname+"/contacts.json";

//Inicializamos la base de datos:
var db = new Datastore({
    filename: DB_FILE_NAME, //nombre del fichero que hemos definido anteriormente
    autoload: true 
   });

   module.exports = db;

   