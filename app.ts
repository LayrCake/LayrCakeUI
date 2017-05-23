import express = require('express');
import path = require('path');

import bodyParser = require('body-parser');
import fs = require('fs');

var app = express();

app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 1337);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/src')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err: any, req, res, next) => {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.all('/*', function (req, res) {
    res.sendFile(__dirname + '/src/index.html');
});
app.listen(app.get('port'), function () {
    console.info('Express server started at http://localhost:' + app.get('port'));
});
module.exports = app;
