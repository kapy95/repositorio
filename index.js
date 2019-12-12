
const app =require('./server.js');

var port= (process.env.PORT || 3000);//leo la variable port y si no hay ninguna asigno la 3000


console.log("Starting API Server...");


app.listen(port);

console.log("Server ready!");
