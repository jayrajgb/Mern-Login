const joi = require('joi');

async function signupValidation(req, res, next) {
    const userInfo = req.body;

    const schema = joi.object({
        fullName: joi.string().min(3).max(100).required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).max(20).required()
    })

    const valid = schema.validate(userInfo);

    if(valid.error){
        return res.status(400).json({ msg: "Bad request", error: valid.error });
    }

    next();
}

async function loginValidation(req, res, next) {
    const userInfo = req.body;

    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(8).max(20).required()
    })

    const valid = schema.validate(userInfo);

    if(valid.error){
        return res.status(400).json({ msg: "Bad request", error: valid.error });
    }

    next();
}

module.exports = {
    signupValidation,
    loginValidation
}