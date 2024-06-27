const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb://localhost:27017/resturant",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log(`Connection Successfull`)).catch((e)=>{
    console.log(`Database connection unsuccessful ${e}`)
})

module.exports = connection