const express = require("express");
const app = express();
var cors = require('cors')

const port = process.env.PORT || 5000;
app.use(cors()) // Use this after the variable declaration

app.use(express.json());
app.use('/items',express.static(__dirname+"./uploads"));
require('./connect/connect');
app.use(require('./router/routes'));
app.listen(port,()=>{console.log(`Server is listening to the port ${port}`)});