
const app =require('./server.js');
const dbConnect = require('./db');

var port= (process.env.PORT || 3000);//leo la variable port y si no hay ninguna asigno la 3000


console.log("Starting API Server...");

dbConnect().then(
    ()=>{
        app.listen(port);
        console.log("Server ready!");
    },
    //si hay error en la conexion
    err =>{
        console.log("Connection error:"+err);
    }
)


