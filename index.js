//Declaracion de dependencias:
var express=require('express');
var bodyParser=require('body-parser');
var Datastore=require('nedb');
var port= 3000;
var BASE_API_PATH="/api/v1";
var DB_FILE_NAME=__dirname+"/contacts.json";


console.log("Starting API Server...");



var app= express();
app.use(bodyParser.json());

//Inicializamos la base de datos:
db = new Datastore({
    filename: DB_FILE_NAME, //nombre del fichero que hemos definido anteriormente
    autoload: true 
   });


app.get("/", (req,res)=>{

    res.send("<html><body><h1>My server</h1></body></html>")

    }
)

app.get(BASE_API_PATH+"/contacts", (req,res)=>{

    console.log(Date()+"- GET/contacts");
    
        db.find({}, (err,contacts)=>{
        if(err){
            console.log(Date()+"-"+err)
            res.sendStatus(500)
        }else{
            res.send(contacts);
        }

    });
});

app.post(BASE_API_PATH+"/contacts", (req,res)=>{

    console.log(Date()+"- POST/contacts");
    var contact=req.body;
    
    db.insert(contact,(err)=>{ //insertamos un nuevo elemento en la base
        if(err){
            console.log(Date()+"-"+ err);
            res.sendStatus(500);
        }else{
            res.sendStatus(201);
        }
     });
    
});

app.listen(port);

console.log("Server ready!");
