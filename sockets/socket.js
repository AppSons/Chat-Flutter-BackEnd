const { comprobarJWT } = require('../helpers/jwt');
const {io} = require('../index');
const {usuarioConectado, usuarioDesconectado, grabarMensaje} = require('../controllers/socket');

//Mensajes de sockets
io.on('connection', (client) => {
    console.log('Cliente conectado');

    const [ valido, uid] = comprobarJWT(client.handshake.headers['x-token']);
    
    //Verifica Autenticación
    if (!valido){ return client.disconnect();}


    //Cliente autenticado
    usuarioConectado(uid);

    //Ingresar usuario a una sala en particular
    client.join(uid);

    // Escuchar del cliente el mensaje-personal
    client.on('mensaje-personal', async(payload) => {
        //Grabar Mensaje
        await grabarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal', payload);
    })



    client.on('disconnect', () => {
        usuarioDesconectado(uid);
    });

    

    //client.on('emitir-mensaje',(payload) => {
    //    //io.emit('nuevo-mensaje', payload);  //emite a todos!!
    //   client.broadcast.emit('nuevo-mensaje', payload); //emite a todos menos al que lo emitió
    //});

});