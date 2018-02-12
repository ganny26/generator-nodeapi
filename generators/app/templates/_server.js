const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const serverconfig = require('./configs/config');
const routes = require('./routes/route');
const cors = require('cors');

const app = new express();


app.use(cors())

mongoose.Promise = global.Promise;
mongoose.connect(serverconfig.mongourl, { useMongoClient: true }, function (err, database) {
    if (err) {
        console.log("Unable to connect", err);
    }
    console.log("Connected to database");
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api', routes);


app.listen(serverconfig.port, (error) => {
    if (!error) {
        console.log(`app is running on port: ${serverconfig.port}!`);
    }
});


