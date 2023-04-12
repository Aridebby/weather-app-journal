// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
 var express = require('express')
 var bodyParser = require('body-parser')
 var cors = require('cors')

// Start up an instance of app
const app = express()

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors())

//get route
app.get('/getweather', function (req, res) {
    res.json(projectData);
})

//post route
app.post('/postData', function(req, res){
    projectData ={
        temp: req.body.temperature,
        date: req.body.date,
        feel: req.body.feel,
    }
})

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
let port = 8081
app.listen(port, function(){
    console.log('App listening on port 8081')
})
