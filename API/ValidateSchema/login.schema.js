const Joi = require('joi');

class Login {

    AuthDAiry() {
        const AuthDAirySchema = Joi.object().keys({
            username: Joi.string().required().not(['', null, 'undefined']),
            password: Joi.string().required().not(['', null, 'undefined'])
        });
        return AuthDAirySchema;
    }
}
module.exports = Login;