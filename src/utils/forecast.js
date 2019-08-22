const request = require('request');

const forecast = (latit, longit, callback) => {
    const url = `https://api.darksky.net/forecast/648a2871a2335835cfd07b3cac86bc45/${latit},${longit}`;

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect', undefined)
        } else if (body.error) {
            callback('Unable to find', undefined)
        } else {
            callback(undefined, {
                resp: body
            })
        }

    });
};

module.exports = forecast;
