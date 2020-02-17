const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();
var cookieParser = require('cookie-parser');
var multer = require('multer')
var upload = multer({dest:'uploads/'})
var session = require("express-session");

let User = require('./models/user');
let Vendor = require('./models/vendor')
let List = require('./models/list')
let Vrating = require('./models/vrating')
// let UList = require('./models/ulist')

app.use(cors({credentials: true, origin: true}));
app.use(cookieParser());

// app.use(cors());
app.use(bodyParser.json());
app.use(session({secret:"lkasdjflsadjf",saveUninitialized : true,resave:false}));
// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/app', { useNewUrlParser: true ,useUnifiedTopology: true });
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
	User.findOne({email:req.body.email},function(err,loser){
      	if(err){
            console.log(err);
            return res.status(500).send({success:false,message:"server error"});
        }
        if(loser){
            return res.send({success:false,message:"Already exist"});
        }
       
   		else{
	    user.save()
	        .then(user => {
	            res.status(200).json({'User': 'User added successfully'});
	        })
	        .catch(err => {
	            res.status(400).send('Error');
	        });
	    }
	})

});
// Adding a new vendor
userRoutes.route('/addvendor').post(function(req, res) {
    let user = new Vendor(req.body);
    Vendor.findOne({email:req.body.email},function(err,loser){
      	if(err){
            console.log(err);
            return res.status(500).send({success:false,message:"server error"});
        }
        if(loser){
            return res.send({success:false,message:"Already exist"});
        }
       	else{
       		user.save()
       		 .then(user => {
            res.status(200).json({'Vendor': 'Vendor added successfully'});
       		 })
        	.catch(err => {
            res.status(400).send('Error');
        	});
       	}
  
    })
    
});
// checking for user
userRoutes.post('/checkuser',function(req,res){
    var id =  req.body.email; 
    var pass =  req.body.password; 
    var nex
    User.findOne({email:id,password:pass},function(err,user){
      	if(err){
            console.log(err);
            return res.status(500).send({success:false,message:"server error"});
        }
        if(!user){
            return res.send({success:false,message:"NOT FOUND"});
        }
        nex=user._id
		var fu=user
        fu={...fu,success:true}
        return res.status(200).json(fu);
    })

    // UList.findOne({uid:nex},function(err,ulis){
    // 	if(err){
    //         console.log(err);
    //     }
    //     if(!ulis){ 
    //     	let ulo= new UList({uid:nex,lid:[]})
    //     	ulo.save()
    //     }
    // })
});

userRoutes.post('/checkvendor',function(req,res){
    var id =  req.body.email; 
    var pass =  req.body.password; 
    var nex
    Vendor.findOne({email:id,password:pass},function(err,user){
        if(err){
            console.log(err);
            return res.status(500).send({success:false,message:"server error"});
        }
        if(!user){
            res.send({success:false,message:"NOT FOUND"});
            // res.redirect('/')
            return res
        }
        nex=user._id
        var fu=user
        fu={...fu,success:true}

        return res.status(200).json(fu);
    })

    // Vrating.findOne({vid:nex},function(err,ulis){
    //     if(err){
    //         console.log(err);
    //     }
    //         console.log(ulis)

    //     if(!ulis){ 
    //         console.log(nex)
    //      let ulo= new Vrating({vid:nex,ratings:[]})
    //      ulo.save()
    //     }
    // })
});
// show list
userRoutes.post('/listv',function(req,res){
    var vid =  req.body.id; 
    List.find({vid:vid},function(err,list){
      	if(err){
            console.log(err);
            return res.status(500).send({success:false,message:"server error"});
        }
     
        return res.status(200).json(list);
    })
});
// add list
userRoutes.post('/add',function(req,res){
	let list = new List(req.body);

    list.save()
        .then(user => {
            res.status(200).json({'success': true,listid:list._id});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});
//dispatch list
userRoutes.post('/status',function(req,res){
	var id = req.body.id
	List.findOne({_id:id},function(err,lis){
		if(err){
            console.log(err);
            return res.status(500).send({success:false,message:"server error"});
        }
        if(!lis){
            res.send({success:false,message:"NOT FOUND"});
            // res.redirect('/')
            return res
        }
        if(req.body.what=="dispatch"){
        	lis.state=1
        	console.log(lis)
        }
        else{
        	lis.state=-1
        }
        lis.save(function(err,upd){
        	if(err){
        		return res.status(500)
        	}
        })
        return res.status(200).json({success:true});
	})
    
});
// get list
userRoutes.get('/getlist',function(req,res){
	 List.find({},function(err,lis){
        if(err){
            console.log(err);
            return res.status(500).send({success:false,message:"server error"});
        }
        if(!lis){
        	console.log("ldsl")
            res.send({success:false,message:"NOT FOUND"});
            // res.redirect('/')
            return res
        }
        return res.status(200).json(lis);
    })
});

userRoutes.post('/buy',function(req,res){
	console.log(req.body)
	var uid=req.body.bid
	var lil=req.body.lid
	 List.findOne({_id:req.body.lid},function(err,lis){
        if(err){
            console.log(err);
            return res.status(500).send({success:false,message:"server error"});
        }
        if(!lis){
            res.send({success:false,message:"NOT FOUND"});
            // res.redirect('/')
            return res
        }
        lis.buyed+=parseInt(req.body.qn)
        delete req.body.lid

        console.log(req.body)
        lis.buyers.push(req.body)

        lis.save(function(err,upd){
        	if(err){
        		return res.status(500)
        	}
        })
        return res.status(200).json({success:true});
    })

	 // UList.findOne({uid:uid},function(err,ulis){
	 // 	if(err){
  //           console.log(err);
  //           // return res.status(500).send({success:false,message:"server error"});
  //       }

  //       ulis.lid.push(lil)
  //       ulis.save(function(err,upd){
  //       	if(err){
  //       		// return res.status(500)
  //       	}
  //       })
        // return res.status(200).json({success:true});

	 // })
});

userRoutes.post('/edit',function(req,res){
	console.log(req.body)
	var uid=req.body.bid
	var lil=req.body.lid
	 List.findOne({_id:req.body.lid},function(err,lis){
        if(err){
            console.log(err);
            return res.status(500).send({success:false,message:"server error"});
        }
        if(!lis){
            res.send({success:false,message:"NOT FOUND"});
            // res.redirect('/')
            return res
        }

        lis.buyed+=parseInt(req.body.qn)
        console.log(lis.buyed)
        delete req.body.lid
        console.log(req.body)
        
        for(var i in lis.buyers){
        	if(lis.buyers[i].bid==uid){
        		lis.buyers[i].qn+=parseInt(req.body.qn)
        	}
        }
        
        lis.save(function(err,upd){
        	if(err){
        		return res.status(500)
        	}
        })
        return res.status(200).json({success:true});
    })
 
});
// add rating
userRoutes.post('/addrate',function(req,res){
    console.log(req.body)
    var lid =  req.body.lid;
    var uid = req.body.bid 
    var vid
    List.findOne({_id:lid},function(err,lst){
        vid = lst.vid
        if(err){
            console.log(err);
            return res.status(500).send({success:false,message:"server error"});
        }
        if(!lst){
            console.log('List not found');
            return res.status(500).send({success:false,message:"server error"});
        }
       
        for (var i in lst.buyers){
            if(lst.buyers[i].bid==uid){
                if(lst.buyers[i].rated==0){
                    lst.buyers[i].review=req.body.review
                    lst.buyers[i].rating=parseInt(req.body.rating)
                    lst.buyers[i].rated=1
                }
            }
        }
        lst.save(function(err,upd){
            if(err){
                return res.status(500)
            }
        })

        return res.status(200).send({success:true,message:"server error"})
    })
    // var l=[]
    // l.push(parseInt(req.body.ratings))
    // Vrating.findOne({_vid:vid},function(err,vr){
    //     if(!vr){
    //         let ulo= new Vrating({vid:vid,ratings:l})
    //     }
    //     else{
    //         vr.ratings.push(parseInt(req.body.rating))
    //     }
    //     vr.save()
    // })

});

// userRoutes.post('/image',upload.single('upl'),function(req,res){
//     console.log(req.file)   
//     return res.send('lol')
// });

userRoutes.get('/logout', function(req, res){
   req.session.destroy(function(){
      console.log("user logged out.")
   });
   res.redirect('/login');
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
