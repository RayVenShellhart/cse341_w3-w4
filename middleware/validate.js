const validator = require('../helpers/validate');

const saveWish = (req, res, next) => {
    const validationRule = {
        Name: 'required|string',
        Developer: 'required|string',
        Publisher: 'required|string',
        release: 'required|string',
        Genre: 'required|string',
        POV: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    })
}

const saveGame = (req, res, next) => {
    const validationRule = {
        Name: 'required|string',
        Rating: 'required|string',
        Developer: 'required|string',
        Publisher: 'required|string',
        Genre: 'required|string',
        Hours: 'required|string',
        POV: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    })
}

module.exports = {
    saveGame,
    saveWish
}