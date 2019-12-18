require('./config/config');

const express = require('express');
const app = express();
const hbs = require('hbs');
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

//Port Detect
const port = process.env.PORT || 3000;

//routes

app.get('/usuarios', (req, res) => {
    res.json('GetUser');
});

app.post('/usuarios', (req, res) => {

    let body = req.body;

    if (body.nombre === undefined || body.email === undefined) {
        res.status(400).json({
            ok: false,
            message: "El nombre y el email son necesarios"
        })        
    } else {
        res.json({
            User: body
        });
    }

});

app.put('/usuarios/:id', (req, res) => { 

    let id = req.id;

    res.json({
        id
    });
});

app.delete('/usuarios', (req, res) => {
    res.json('DeleteUser');
});


//Listen Port
app.listen(process.env.PORT, () => {
    console.log(`Listening port: ${process.env.PORT}`);
});
