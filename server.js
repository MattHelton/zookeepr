// imports express package
const express = require("express");
// reauires data from json file
const { animals } = require("./data/animals")
//imports html routes
const htmlRoutes = require('./routes/htmlRoutes.js')
//imports api routes
const apiRoutes = require('./routes/apiRoutes.js')

const PORT =  process.env.PORT || 3001

// instantiates the server
const app = express();
app.use(express.static('public'));
// parse incoming string or array data
app.use(express.urlencoded({extended: true}));
// parse incoming JSON data
app.use(express.json());
// sets apiRoutes
app.use('/api/', apiRoutes)
// sets htmlRoutes
app.use('/', htmlRoutes)
// makes the server listen
app.listen(PORT, () =>{
  console.log("API server now running on PORT: ", PORT);
});