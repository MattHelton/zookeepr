// imports express package
const express = require("express");
// reauires data from json file
const { animals } = require("./data/animals")
//imports html routes
const htmlRoutes = require('./routes/htmlRoutes.js')
//imports api routes
const apiRoutes = require('./routes/apiRoutes.js')


// instantiates the server
const app = express();


// sets htmlRoutes
app.use('/', htmlRoutes)
// sets apiRoutes
app.use('/api/', apiRoutes)
// makes the server listen
app.listen(3001, () =>{
  console.log("API server now running on port 300!1");
});