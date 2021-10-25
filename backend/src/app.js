const express = require('express');
const router = require('./api/router');

const app = express();

app.get('/alive', (req, res) => { res.sendStatus(200); });

app.use(router);

module.exports = app;

