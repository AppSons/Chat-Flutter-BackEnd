const {io} = require('../index');

//Mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    

    //client.on('emitir-mensaje',(payload) => {
    //    //io.emit('nuevo-mensaje', payload);  //emite a todos!!
    //   client.broadcast.emit('nuevo-mensaje', payload); //emite a todos menos al que lo emitió
    //});

});