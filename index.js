const express = require('express');
const path = require('path');
const { clearScreenDown } = require('readline');
require('dotenv').config();
// DB Config
require ('./database/config').dbConnection();



//App de express
const app = express();

// Lectura y Parseo del Body
app.use( express.json());

//Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require('./sockets/socket');


//Path publico
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));



// Mis Rutas
app.use( '/api/login', require('./routes/auth'));
app.use( '/api/users', require('./routes/users'));
app.use( '/api/mensajes', require('./routes/mensajes'));



server.listen(process.env.PORT, (err)=> {
    if (err) throw new Error(err);

    console.log('servidor corriendo en puerto', process.env.PORT);
});