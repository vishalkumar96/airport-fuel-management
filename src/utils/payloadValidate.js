const Joi = require('@hapi/joi');

const addAirport = {
    body: Joi.object().keys({
        airport_name: Joi.string().required(),
        fuel_capacity: Joi.number().required()
    })
};

const addAircraft = {
    body: Joi.object().keys({
        aircraft_no: Joi.string().required(),
        airline: Joi.string().required(),
        source: Joi.string().required(),
        destination: Joi.string().required(),
    })
};

module.exports = {
    addAirport,
    addAircraft
}