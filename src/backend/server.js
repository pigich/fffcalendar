
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const apiRoutes = require('./routes/routes');
const props = require('./config/properties');

mongoose.connect(props.MONGO_URL, { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true });
var mdb = mongoose.connection;

if (!mdb)
    console.log("Error connecting to db")
else
    console.log("Mongoose connected successfully")

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use('', apiRoutes)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(props.PORT, function () {
    console.log('Backend is listening to the port: ' + props.PORT)
});

