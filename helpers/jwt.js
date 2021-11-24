const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = {uid};
        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                //no se pudo crear token
                reject('No se pudo generar JWT');
            }else {
                //TOKEN!!
                resolve(token);
            }
        })
    });


   


}


module.exports = {
    generarJWT
}