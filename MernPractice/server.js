// Express is used for routes and stuff
const express = require('express');
const mongoose = require('mongoose');
//Allow us to take requests and parse it
const bodyParser = require('body-parser');

const items = require('./routes/items');

const app = express();


// Bodyparser middleware
app.use(bodyParser.json());

// We need a mongoDB URI.. DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
    .connect(db, { 
                    useNewUrlParser: true,
                    useUnifiedTopology: true 
                })
    .then(() => console.log('MongoDB Connected...'))
    .catch( err => console.log(err));

// Use Routes
// Anything that routes to api/items should route to items var
app.use('/api/items', items);


//for HEROKU
const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server started on port ${port}'));
