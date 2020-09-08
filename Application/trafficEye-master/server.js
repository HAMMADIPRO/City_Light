//Import all modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require("mongoose");
const config = require('./config/config');
// const route = require("./routes/router");
const path = require('path');

const port = process.env.PORT || 5331;

//Initiating express and socket app
app = express();
let server = app.listen(port, ()=>{
    console.log("server up & running on port "+port+"...");
});



//====* Database and DB Connection Error Handling====*//
// Connect To Database
mongoose.Promise = global.Promise;
mongoose.connect(config.database);
// On Connection
mongoose.connection.on('connected',() => {
    console.log('Connected to database '+config.database);
});
// On Error
mongoose.connection.on('error',(err)=> {
    console.log('Database error: '+err);
});


//====*Middleware====*//
// Passport
// app.use(passport.initialize());
// app.use(passport.session());
// require('./config/passport')(passport);

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true ,strict:false}));
// app.use(bodyParser({strict:false}));

// CORS
app.use(cors());




//====*Routing====*//
const track=require('./routes/track');
app.use('/track', track);

const rtTrack=require('./routes/rtTrack');
app.use('/rtTrack', rtTrack);


app.get('/', function(req, res){
    res.send('Welcome to Clean Urban')
});


