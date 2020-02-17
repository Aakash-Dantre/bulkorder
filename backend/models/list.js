const mongoose = require('mongoose');

let List = new mongoose.Schema({
    vname: {
        type: String
    },
    vid: {
        type: String
    },
    buyers:[{
    		bid: {type: String},
    		bname: {type: String},
    		rating: {type: Number},
    		review: {type: String},
    		qn: {type: Number},
            rated: {type:Number,default:0}
    }],
    listname:{
    	type:String
    },
    description:{
    	type:String
    },
    amount:{
    	type:Number
    },
    price:{
    	type:Number
    },
    buyed:{
    	type:Number,
    	default:0
    },
    state:{
    	type:Number,
    	default:0
    },
    
});

module.exports = mongoose.model('List', List);