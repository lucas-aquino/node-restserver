require('./config/config');

const express = require('express');
const mongo = require('mongoose');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const colors = require('colors');
const app = express();
const path = require('path');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());

// Routes
app.use(require('./routes/routes'));

// Statics
app.use(express.static(path.resolve(__dirname, '../public')));

// Port Detect
const port = process.env.PORT || 3000;


// DATA BASE

mongo.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, (err, res) => {
    
    if (err) throw colors.red(err);

    console.log('Data Base: ' + 'ONLINE'.green);
    
});

//Listen Port
app.listen(process.env.PORT, () => {
    console.log(`Listening port: ${colors.yellow(process.env.PORT)}`);
});
