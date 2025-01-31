require('dotenv').config();
var express = require('express');
var app = express();
var authRouter = require('./routes/auth');
var categoryRouter = require('./routes/category');
var cardRouter = require('./routes/card');
var gameRouter = require('./routes/game');
var bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.text({ limit: '200mb' }));

app.use('/auth', authRouter);
app.use('/category', categoryRouter);
app.use('/category/card', cardRouter);
app.use('/game', gameRouter);

app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
});
app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broken!')
});

app.listen(process.env.PORT, function() {
    console.log('success!!');
});
