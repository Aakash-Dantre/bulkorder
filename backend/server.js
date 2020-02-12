const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let User = require('./models/user');
let Vendor = require('./models/vendor')

app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/app', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

// API endpoints

// // Getting all the users
// userRoutes.route('/').get(function(req, res) {
//     User.find(function(ersr, users) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.json(users);
//         }
//     });
// });

// Adding a new user
userRoutes.route('/adduser').post(function(req, res) {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'User': 'User added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});
// Adding a new vendor
userRoutes.route('/addvendor').post(function(req, res) {
    let user = new Vendor(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'Vendor': 'Vendor added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});
// checking for user
userRoutes.route('/checkuser').post(function(req,res){
    var id =  req.body.email; 
    var pass =  req.body.password; 

    User.findOne({email:id,password:pass},function(err,user){
        if(err){
            console.log(err);
            return res.status(500).send();
        }
        if(!user){
            return res.status(404).send();
        }
        
        return res.status(200).json({'user':'founded'});
    })
});
userRoutes.route('/checkvendor').post(function(req,res){
    var id =  req.body.email; 
    var pass =  req.body.password; 

    Vendor.findOne({email:id,password:pass},function(err,user){
        if(err){
            console.log(err);
            return res.status(500).send();
        }
        if(!user){
            return res.status(404).send();
        }
        
        return res.status(200).json({'Vendor': 'found'});
    })
});

// Getting a user by id
userRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, user) {
        res.json(user);
    });
});

app.use('/', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
