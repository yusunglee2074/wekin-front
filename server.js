var express = require('express');
var path = require('path');
var serveStatic = require('serve-static')
app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));
var port = process.env.PORT || 3000;
app.listen(port);

app.get('/*', function(req, res){
    res.sendFile(__dirname + '/dist/index.html');
});

console.log('server started '+port);
