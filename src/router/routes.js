const express = require("express");
const router = new express.Router();
const multer = require('multer');
const mongoose = require('mongoose');


const Resturant = require('../models/schema');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, '../uploads');
    },
    filename: function(req, file, cb) {
      cb(null, Date.now()+file.originalname);
    
      
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 15
    },
    fileFilter: fileFilter
  });
  

router.post("/items" ,upload.single('productImage'),async (req,res,next)=>{
    // 
           const items = new Resturant(
         {  _id: new mongoose.Types.ObjectId(),  
            name :req.body.name,
            category: req.body.category,
            price :req.body.price,
            productImage : req.file.filename 
            }
    );
        const data = await items.save().then(result => {
            console.log(result);
            res.status(201).json({
              message: "Created product successfully",
              createdProduct: {
                _id: result._id,
                  name: result.name,
                  price: result.price,
                  category:result.category,
                  request: {
                      type: 'GET',
                      url: "http://localhost:5000/items/" + result._id
                  }
              }
            
            })
        }).catch((e)=>{console.log(e)})        
        })
    
        // router.get("/:productId", (req, res, next) => {
        //   const id = req.params._id;
        //   items.findById(id)
        //     .select('name price _id productImage')
        //     .exec()
        //     .then(doc => {
        //       console.log("From database", doc);
        //       if (doc) {
        //         res.status(200).json({
        //             product: doc,
        //             request: {
        //                 type: 'GET',
        //                 url: 'http://localhost:5000/items'
        //             }
        //         });
        //       } else {
        //         res
        //           .status(404)
        //           .json({ message: "No valid entry found for provided ID" });
        //       }
        //     })
        //     .catch(err => {
        //       console.log(err);
        //       res.status(500).json({ error: err });
        //     });
        // });


// Get all the data from the api
router.get("/items", async (req,res)=>{
    try{
        
        const data = await Resturant.find({});
        res.send(data);
        console.log(data);
    }catch(e){
        res.status(400).json({messege: `Data didnot show ${e}`})
    }
})

// Get individual data from the api
router.get("/items/:id", async (req,res)=>{
    try{
        const _id = req.params.id;
        const data = await Resturant.find({_id});
        res.send(data);
        console.log(data);
    }catch(e){
        res.status(400).json({messege: `Data didnot show ${e}`})
    }
})

// delete individual data from the api
router.delete("/items/:id", async (req,res)=>{
    try{
        const _id = req.params.id;
        const data = await Resturant.deleteOne({_id});
        res.send(data);
        console.log(data);
    }catch(e){
        res.status(400).json({messege: `Data didnot show ${e}`})
    }
})

// delete all the  data from the api
router.delete("/items", async (req,res)=>{
    try{
        const _id = req.params.id;
        const data = await Resturant.deleteMany({});
        res.status(200).send(data);
    }catch(e){
        res.status(400).json({messege: `Data didnot delete ${e}`})
    }
})


router.get("/",(req,res)=>{
    res.send(`Hello Dear! what's going on ???`);
})

module.exports = router