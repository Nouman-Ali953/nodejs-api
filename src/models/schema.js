const  mongoose  = require("mongoose")

const restaurantSchema = new mongoose.Schema({
  _id: {
    type:String
  },
  name:{
    type:String,
    required:true
  },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    productImage: { 
      type: String,
      required:[true,'No empty input']
    }  

})

const Restaurant = mongoose.model("Restaurant" , restaurantSchema);

module.exports = Restaurant;