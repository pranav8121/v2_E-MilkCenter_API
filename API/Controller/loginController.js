const clsLogin = require('../Model/clsLogin')
const obj_Login = new clsLogin();
const Joi = require('joi');
const clsLoginShema = require('../ValidateSchema/login.schema');
const objLoginSchema = new clsLoginShema();

// Dairy AUth
exports.getallDairyCred = (req, res) => {
    obj_Login.getallDairyCred()
        .then((result) => {
            res.statusCode = 200;
            res.send(result);
        }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            let responseObj = {};
            Object.assign(responseObj, { status: 'fail' }, { result: err });
            res.send(responseObj);
        })
};

exports.browserClosed = (req, res) => {
    obj_Login.browserClosed()
        .then((result) => {
            res.statusCode = 200;
            res.send(result);
        }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            let responseObj = {};
            Object.assign(responseObj, { status: 'fail' }, { result: err });
            res.send(responseObj);
        })
};

exports.AuthDairy = (req, res) => {
    Joi.validate(req.body, objLoginSchema.ActivityLogSchema(), (err, value) => {
        if (err) {
            res.statusCode = 400;
            let responseObj = {};
            Object.assign(responseObj, { status: 'fail' }, { result: err });
            res.send(responseObj);
        } else {
            obj_Login.AuthDairy(req.body)
                .then((result) => {
                    res.statusCode = 200;
                    res.send(result);
                }).catch(err => {
                    console.log(err);
                    res.statusCode = 500;
                    let responseObj = {};
                    Object.assign(responseObj, { status: 'fail' }, { result: err });
                    res.send(responseObj);
                })
        }
    });
};

exports.CreateAuthDairy = (req, res) => {
    obj_Login.CreateAuthDairy(req.body)
        .then((result) => {
            res.statusCode = 200;
            res.send(result);
        })
        .catch((err) => {
            console.log(err.message);
            res.statusCode = 500;
            let responseObj = {};
            Object.assign(responseObj, { status: 'fail' }, { result: err });
            res.send(responseObj);
        })
};

exports.logoutDairy = (req, res) => {
    obj_Login.logoutDairy(req.body)
        .then((result) => {
            res.statusCode = 200;
            res.send(result);
        }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            let responseObj = {};
            Object.assign(responseObj, { status: 'fail' }, { result: err });
            res.send(responseObj);
        })

};

// Member Auth
exports.AuthMember = (req, res) => {
    obj_Login.AuthMember(req.body)
        .then((result) => {
            res.statusCode = 200;
            res.send(result);
        }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            let responseObj = {};
            Object.assign(responseObj, { status: 'fail' }, { result: err });
            res.send(responseObj);
        })

};

exports.logoutMember = (req, res) => {
    obj_Login.logoutMember(req.body)
        .then((result) => {
            res.statusCode = 200;
            res.send(result);
        }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            let responseObj = {};
            Object.assign(responseObj, { status: 'fail' }, { result: err });
            res.send(responseObj);
        })

};