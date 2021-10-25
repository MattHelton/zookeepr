// imports express package
const express = require("express");
// reauires data from json file
const { animals } = require("./data/animals")
//imports html routes
// const htmlRoutes = require('./routes/htmlRoutes.js')
//imports api routes
const apiRoutes = require('./routes/apiRoutes.js')

const PORT =  process.env.PORT || 3001

// instantiates the server
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({extended: true}));
// parse incoming JSON data
app.use(express.json());
// sets htmlRoutes
// app.use('/', htmlRoutes)
// sets apiRoutes
app.use('/api/', apiRoutes)
// makes the server listen
app.listen(PORT, () =>{
  console.log("API server now running on PORT: ", PORT);
});