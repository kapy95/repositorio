const app=require('../server.js');
const request = require('supertest');
const Contact=require('../contacts.js');


//con describe agrupamos los casos de prueba
describe("Hello world tests", () => {

    //con it hacemos el caso de prueba
    it("Should do a stupid test", () => {

        const a = 5;
        const b = 3;
        const sum = a+b;

        expect(sum).toBe(8);
    });

});



describe("Contacts Api", () =>{

    describe("GET /", () =>{
        it("Should return an HTML documnet", () =>{
            //return es fundamental en cualquier llamada asincrona a nuestro servidor
           return request(app).get("/").then((response) => {

                    expect(response.status).toBe(200);
                    expect(response.type).toEqual(expect.stringContaining("html"));
                    expect(response.text).toEqual(expect.stringContaining("h1"));
            });

        });


     describe("GET /contacts",() =>{

        beforeAll(() => {

            const contacts=[
               new Contact({"name":"juan", "phone":"5555"}),
               new Contact({"name":"pepe", "phone":"6666"})
            ];
            //expiamos el metodo find de la variable 
            //db que representa nuestra base de datos:
            dbFind = jest.spyOn(Contact,"find");//expiamos contact ahora
            dbFind.mockImplementation((query, callback) =>{
                callback(null,contacts);

            });
            
        });

         it("Should return all contacts", () =>{

            return request(app).get('/api/v1/contacts').then((response)=>{
                expect(response.statusCode).toBe(200);
                expect(response.body).toBeArrayOfSize(2);
                expect(dbFind).toBeCalledWith({}, expect.any(Function));

            })


         });

     });




     describe("POST /contacts",() =>{

         //Permito que las variables tengan un scope global:
         let dbInsert;
         //fase de arrange: preparamos un contacto:
         const contact = {name: "juan", phone:"6766"};
        
        beforeEach(() =>{

            //definimos el espionaje sobre db insert
            dbInsert=jest.spyOn(Contact,"create");

        });

        //Primera prueba para comprobar que se crea un contacto
        it("Should add a new contact if everything is fine",()=>{

            //definimos el mock sobre db insert
            dbInsert.mockImplementation((c, callback) =>{
                //llamamos a la funcion de callback comprobando que todo vaya bien
                callback(false); //el primer callback debe ser falso porque no hay error
            });

            return request(app).post('/api/v1/contacts').send(
            contact).then((response) =>{
                expect(response.statusCode).toBe(201);
                expect(dbInsert).toBeCalledWith(contact, expect.any(Function));

            });

    
        });

        it("Should return 500 code if there is any problem with the DB",() =>{

            dbInsert = jest.spyOn(Contact, "create");
                dbInsert.mockImplementation((c,callback)=>{
                    callback(true); //debe ser true pq hay error
                });

                return request(app).post('/api/v1/contacts').send(
                    contact).then((response) =>{
                        expect(response.statusCode).toBe(500);
                    });
        
        });


     });



    });




});

