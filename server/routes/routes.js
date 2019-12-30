
// ===================================
//          ROUTES
// ===================================

// requires
const express = require('express');
const app = express();

// User
app.use(require('./usuario'));

// Login
app.use(require('./login'));



module.exports = app;
