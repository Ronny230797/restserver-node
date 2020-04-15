//Configuracion Puerto
//Recordar process es un variable global por debajo de node, aqui le decimo si detecta el ambiente de product
//use ese puerto que le definieron, sino use el 3000, para cuando es local 
process.env.PORT = process.env.PORT || 3000


//Configuracion Entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//Configuracion BD

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    //!test === cafe
    urlDB = 'mongodb+srv://ronny230797:Tortuguero2011.@cluster0-6dgif.mongodb.net/cafe'
}

//Aqui nos inventamos ese envirnment URLDB, podia llamrse de otra forma si quer[ia] es para usarlo despues
process.env.URLDB = urlDB