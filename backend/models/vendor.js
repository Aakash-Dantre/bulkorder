const mongoose = require('mongoose');

let Vendor = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password:{
    	type: String	
    }
});

module.exports = mongoose.model('Vendor', Vendor);