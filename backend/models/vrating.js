const mongoose = require('mongoose');

let Vrating = new mongoose.Schema({
    vid: {
        type: String
    },
    ratings: [{
        type: Number
    }]



});

module.exports = mongoose.model('Vrating', Vrating);