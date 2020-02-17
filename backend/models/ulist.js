const mongoose = require('mongoose');

let UList = new mongoose.Schema({
    uid: {
        type: String
    },
    lid: [{
        type: String
    }]



});

module.exports = mongoose.model('UList', UList);