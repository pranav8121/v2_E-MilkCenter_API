const mongoose = require('mongoose')

function checkConnection(req, res,next){
    //1=connected 0=disconnected
    const status = mongoose.connection.readyState;
    if (status != 1) {
        return next(res.status(404).send({ error: 'DataBase Err!' }))
    }
    return next();
};
module.exports.checkConnection = checkConnection;